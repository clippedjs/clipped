import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
import * as minimist from 'minimist'
import * as updateNotifier from 'update-notifier'
import * as cosmic from 'cosmiconfig'
import * as yarnInstall from 'yarn-install'
import * as axios from 'axios'
import Clipped from '.'

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
  const {action, opt} = args

  const clipped = await loadConfig(opt)

  clipped.hook('create')
    .add('init-package.json', async (api: Clipped) => api.spawn('npm', ['init'], {stdio: 'inherit'}))
    .add('install-presets', async (api: Clipped) => {
      const presetListUrl = 'https://api.github.com/repos/clippedjs/clipped/contents/presets/?ref=master'
      const presetChoices = await (
        axios.get(presetListUrl)
          .then(({data}: {data: any}) =>
            data.map((preset: any) => ({title: `@clipped/preset-${preset.name}`, value: `@clipped/preset-${preset.name}`}))
          )
      )

      const {packages} = await api.prompt({
        type: 'multiselect',
        name: 'packages',
        message: 'Pick your packages',
        choices: [...presetChoices]
      }, {
        onCancel: () => {
          throw new Error('Aborted')
        }
      })
      await api.fs.copyTpl({src: path.resolve(__dirname, '../../template/_clipped.config.js'), dest: api.resolve('clipped.config.js'), context: {packages}})
      await yarnInstall(packages, {cwd: api.config.context})
    })
    .add('install-deps', (api: Clipped) => yarnInstall({cwd: api.config.context}))
    .add('start-init-hook', () => loadConfig(opt).then((api1: Clipped) => api1.execHook('init')))

  clipped.hook('config:watch')
    .add('write-to-json', async (api: Clipped) => {
      const writeConfigJSON = async () => fs.writeFileSync('clipped-result.json', await loadConfig(opt).then(({config}) => JSON.stringify(config.toJSON(), null, 2)), {encoding: 'utf8'})
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
