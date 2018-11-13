import * as util from 'util'
import * as os from 'os'
import * as fs from 'fs'
import * as path from 'path'
import * as minimist from 'minimist'
import * as updateNotifier from 'update-notifier'
import * as cosmic from 'cosmiconfig'
import * as yarnInstall from 'yarn-install'

import Clipped from '.'
import {searchNpm} from './utils/npm'

/**
 * ParseArgs - Parse cli arguments
 *
 * @returns {Object} action and options
 */
function parseArgs(): {action: string, opt?: any} {
  const action: string = process.argv[2]
  const opt: Object = minimist(process.argv, {default: {platform: 'native'}})

  return {action, opt}
}

async function loadConfig(opt: any): Promise<Clipped> {
  // Execute project preset
  const clipped = new Clipped(opt)
  
  // Notify update
  try {
    const pkg = require('../package.json') // eslint-disable-line typescript/no-var-requires
    updateNotifier({pkg}).notify()
  } catch (error) {}

  const config = await cosmic('clipped').load('')

  // Execute custom preset
  if (config && config.config) {
    try {
      // eslint-disable-next-line no-undef
      await clipped.use(config.config)
    } catch (error) {
      clipped.print(error)
    }
  }
  return clipped
}

/**
 * Cli - Entry function
 *
 * @async
 * @param {Object} [args={}] Arguments to command
 *
 */
export async function cli(args: {action: string, opt?: any} = parseArgs()): Promise<boolean> {
  const {action = '', opt} = args

  if (action.includes('build') || action.includes('deploy')) {
    process.env.NODE_ENV = 'production'
  } else if (action.includes('dev') || action.includes('watch')) {
    process.env.NODE_ENV = 'development'
  } else if (action.includes('test')) {
    process.env.NODE_ENV = 'test'
  }

  const clipped = await loadConfig(opt)

  clipped.hook('create')
    .add('create-folder', async (api: Clipped) => {
      if (process.argv[3]) {
          await api.fs.mkdir({path: api.resolve(process.argv[3])})
          process.chdir(api.resolve(process.argv[3]))
          api.config.context = api.resolve(process.argv[3])
        }
    })
    .add('init-package.json', async (api: Clipped) => api.spawn(os.platform().includes('win') ? 'npm.cmd' : 'npm', ['init'], {stdio: 'inherit', shell: true}))
    .add('install-presets', async (api: Clipped) => {
      const [templates, plugins]: any[] = await Promise.all(
        ['template', 'plugin'].map(type => 
          searchNpm(`${type} keywords:clipped+${type}`)
            .then((data: any) =>
              data.map((item: any) => ({title: item.name, value: item.name}))
            )
      ))

      let {packages} = await api.prompt({
        type: 'multiselect',
        name: 'packages',
        message: 'Pick your packages',
        choices: [...templates, ...plugins]
      }, {
        onCancel: () => {
          throw new Error('Aborted')
        }
      })
      packages = packages.sort((a: string, b: string) => !/(webpack|rollup)/.test(a) && /(webpack|rollup)/.test(b))

      await api.fs.copyTpl({src: path.resolve(__dirname, '../../template/_clipped.config.js'), dest: api.resolve('clipped.config.js'), context: {packages}})
      await yarnInstall([...packages, 'clipped'], {cwd: api.config.context})
    })
    .add('start-init-hook', () =>
      loadConfig(opt)
        .then(async (api1: Clipped) => {
          await api1.editPkg((pkg: any) => {
            const scripts = Object.keys(clipped.hooks)
              .filter(h => !(/^(pre|post|version|create)$/.test(h) || /^(pre|post)-/.test(h)))
              .reduce((acc, hook) => ({...acc, [hook]: `clipped ${hook}`}), {})
            Object.assign(pkg.scripts, scripts)
          })
          return api1.execHook('init')
        })
    )

  clipped.hook('config:watch')
    .add('write-to-json', async (api: Clipped) => {
      const writeConfigJSON = async () => {
        fs.writeFileSync('clipped-result.json', await loadConfig(opt).then((api: Clipped) => {
          api.execDefer()

          return JSON.stringify(api.config.toJSON(), null, 2)
        }), {encoding: 'utf8'})
        api.print('🔃  Reloaded Config at', new Date().toLocaleString())
      }
      fs.watchFile(api.resolve('clipped.config.js'), writeConfigJSON)
      await writeConfigJSON()
    })

  if (clipped.hooks[action]) {
    try {
      await clipped.execHook(action)
    } catch (error) {
      console.error(error)
    }
  } else {
    clipped.print(`
Usage:    clipped ACTION

Actions:
${Object.keys(clipped.hooks).filter(hook => !hook.includes('pre') && !hook.includes('post')).join(', ')}
`)
  }

  return true
}
