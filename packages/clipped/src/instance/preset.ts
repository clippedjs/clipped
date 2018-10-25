import {isString, isFunction, castArray} from 'lodash'
import yeoman from 'yeoman-environment'
import {createChainable} from 'jointed'
const baseGenerator = require('generator-clipped-base')

declare module '.' {
  interface Clipped {
    prototype: any
    __initialized__: boolean

    opt: {[index: string]: any}
    config: {[index: string]: any}

    use(ware: any): Promise<Clipped>

    resolve(...paths: string[]): string
  }
}

import {Clipped} from '.'

const stockPresets: {[index:string] : {ware: any}} = {}

// NOTE: Need to be synchronous
/**
 * basePreset - Initializes default value
 *
 * @param {Object} this
 * @param {Object={}} opt
 */
export function basePreset (this: Clipped, opt: Object = {}) {
  // Initialize config
  this.opt = opt
  this.config = createChainable({
    context: this.opt.context || process.cwd()
  })

  let packageJson: any = {}
  try {
    packageJson = require(this.resolve('package.json'))
  } catch (e) {}

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

      await new Promise((resolve, reject) => {
        env.run('clipped:app', resolve)
      })
    })

  this.__initialized__ = true
}

/**
 * normalizePreset - Normalize normalize to same format
 *
 * @param {any} ware
 *
 * @returns {Function}
 */
function normalizePreset (ware: any): any {
  const preset = ware.default || ware
  if (isString(preset)) { // String i.e. stock
    return stockPresets[preset]
  } else if (isFunction(preset)) { // Function
    return preset
  } else {
    return (clipped: Clipped) => { clipped.config = {...clipped.config, ...preset} }
  }
}

export async function execPreset (this: Clipped, ware: any = () => {}, ...args: any[]): Promise<Clipped> {
  await normalizePreset(ware)(this, ...args)
  return this
}

export function initPreset (clipped: typeof Clipped) {
  clipped.prototype.use = execPreset
  return clipped
}
