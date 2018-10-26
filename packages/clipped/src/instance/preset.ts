import {isString, isFunction, isPlainObject} from 'lodash'
import yeoman from 'yeoman-environment'
import {createChainable} from 'jointed'
import baseGenerator from 'generator-clipped-base'

import {Clipped} from '.'

declare module '.' {
  interface Clipped {
    prototype: any; // eslint-disable-line no-undef, typescript/no-use-before-define
    __initialized__: boolean; // eslint-disable-line no-undef, typescript/no-use-before-define

    opt: {[index: string]: any}; // eslint-disable-line no-undef, typescript/no-use-before-define
    config: {[index: string]: any}; // eslint-disable-line no-undef, typescript/no-use-before-define

    use(ware: any): Promise<Clipped>; // eslint-disable-line no-undef, typescript/no-use-before-define

    resolve(...paths: string[]): string; // eslint-disable-line no-undef, typescript/no-use-before-define
  }
}

const stockPresets: {[index:string] : {ware: any}} = {}

/**
 * basePreset - Initializes default value
 *
 * @export
 * @param {Clipped} this
 * @param {Object} [opt={}]
 */
export function basePreset(this: Clipped, opt: Object = {}): void {
  // Initialize config
  this.opt = opt
  this.config = createChainable({
    context: this.opt.context || process.cwd()
  })

  let packageJson: any = {}
  try {
    packageJson = require(this.resolve('package.json'))
  } catch (error) {}

  Object.assign(this.config, ({
    name: packageJson.name,
    src: this.resolve('src'),
    dist: this.resolve('dist'),
    dockerTemplate: this.resolve('docker-template'),
    packageJson,
    generator: this.opt.generator || baseGenerator,
    eslintPath: this.resolve('.eslintrc.js')
  }))

  this.hook('version')
    .add('clipped', async (clipped: Clipped) => {
      const version = await clipped.exec('npm view clipped version')
      clipped.print(version)
    })

  this.hook('init')
    .add('yeoman', async () => {
      const env = yeoman.createEnv()
      env.registerStub(baseGenerator, 'clipped:app')

      env.lookup()

      await new Promise(resolve => {
        env.run('clipped:app', resolve)
      })
    })

  this.__initialized__ = true
}

/**
 * NormalizePreset - Normalize normalize to same format
 *
 * @param {any} ware
 *
 * @returns {Function}
 */
function normalizePreset(ware: any): any {
  const preset = ware.default || ware
  if (isString(preset)) { // String i.e. stock
    return stockPresets[preset]
  }
  if (isFunction(preset)) { // Function
    return preset
  }
  
  return (clipped: Clipped) => {
    Object.keys(preset).map(key => {
      if (isFunction(preset[key])) {
        preset[key](clipped.config[key])
      } else if (isPlainObject(preset[key])) {
        clipped.config[key] = preset[key]
      } else {
        clipped.config[key] = preset[key]
      }
    })
  }
}

export async function execPreset(this: Clipped, ware: any = () => {}): Promise<Clipped> {
  for (let w of [].concat(ware).map(normalizePreset)) {
    const res = await w.call(this, this)
    if (res !== null && res !== undefined) {
      await execPreset.call(this, res)
    }
  }

  return this
}

export function initPreset(clipped: typeof Clipped): void {
  clipped.prototype.use = execPreset
}
