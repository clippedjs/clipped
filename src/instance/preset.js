import {isString, isFunction} from 'lodash'

const stockPresets = {}

/**
 * normalizePreset - Normalize normalize to same format
 *
 * @async
 * @param {any} ware
 *
 * @returns {Function}
 */
async function normalizePreset (ware: any) {
  const preset = ware.default || ware
  if (isString(preset)) { // String i.e. stock
    return stockPresets[preset]
  } else if (isFunction(preset)) { // Function
    return preset
  } else {
    return clipped => { clipped.config = {...clipped.config, ...preset} }
  }
}

export async function execPreset (ware: any = () => {}, ...args: any) {
  const preset = await normalizePreset(ware)
  await preset(this, ...args)
  return this
}

export function initPreset (Clipped: Object) {
  Clipped.prototype.use = execPreset
  return Clipped
}
