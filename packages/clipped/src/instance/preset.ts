import  * as path from 'path'
import {spawn, spawnSync} from 'child_process'
import {isString, isFunction, isPlainObject, intersection} from 'lodash'
import {createChainable} from 'jointed'

import {Clipped} from '.'

declare module '.' {
  interface Clipped {
    prototype: any; // eslint-disable-line no-undef, typescript/no-use-before-define
    __initialized__: boolean; // eslint-disable-line no-undef, typescript/no-use-before-define
    _presets: {info: presetInfo, plugin: any}[],
    presets: {info: presetInfo, plugin: any}[],

    opt: {[index: string]: any}; // eslint-disable-line no-undef, typescript/no-use-before-define
    config: {[index: string]: any}; // eslint-disable-line no-undef, typescript/no-use-before-define

    use(ware: any): Promise<Clipped>; // eslint-disable-line no-undef, typescript/no-use-before-define
    describe(info: presetInfo): void;

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
  Object.assign(this, opt)
  this.config = createChainable({
    context: this.opt.context || process.cwd()
  })

  let packageJson: any = {}
  try {
    packageJson = require(this.resolve('package.json'))
  } catch (error) {}

  Object.assign(this.config, ({
    target: 'web',
    name: packageJson.name,
    src: this.resolve('src'),
    dist: this.resolve('dist'),
    dockerTemplate: this.resolve('docker-template'),
    packageJson
  }))

  this.hook('version')
    .add('clipped', async (clipped: Clipped) => {
      clipped.print(await clipped.exec('npm view clipped version'))
    })

  this.hook('gui')
    .add('carlo', async (api: Clipped) => {
      const carlo = require('carlo')
      const app = await carlo.launch()

      const root = path.resolve(__dirname, '../../../www')
      app.serveFolder(root)
      await app.exposeFunction('clipped', () => api)

      await app.load('index.html')
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
function normalizePreset(this: Clipped, ware: any): any {
  const preset = ware.default || ware
  if (isString(preset)) { // Stock preset
    return stockPresets[preset]
  }

  return preset
}

export async function execPreset(this: Clipped, ware?: any): Promise<Clipped> {
  this.describe = (info: presetInfo) => {
    if (this.presets.findIndex(p => p.info.id === info.id) > -1) {
      throw new Error(`Duplicate presets found for ${info.id}`)
    }
    if (
      (info.before && intersection(info.before, this.presets.map(p => p.info.id))) || // is after presets that it should be before
      (this.presets.reduce((acc: string[], p) => [...acc, ...(p.info.after || [])], []).indexOf(info.id) > -1) // is before presets that it should be after
    ) {
      throw new Error(`Incorrect order for ${info.id}, please re-arrange it`)
    }
    this._presets.push({info, plugin: ware})
  }
  
  for (let w of [].concat(ware).map(normalizePreset.bind(this)).filter(Boolean)) {
    let res: any = w
    while (res !== null && res !== undefined && res !== this) {
      if (isFunction(res)) {
        res = await res.call(this, this)
      } else if (isPlainObject(res)) {    // Config mutation
        this.defer(res)
        res = null
      } else {
        await execPreset.call(this, res)
        res = null
      }
    }
  }

  return this
}

export function initPreset(clipped: typeof Clipped): void {
  clipped.prototype.use = execPreset

  Object.defineProperty(clipped.prototype, 'presets', ({
    get() {
      return this._presets
    }
  }))
}
