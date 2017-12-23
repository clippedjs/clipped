import fs from 'fs-extra'
import {isString, isFunction, castArray} from 'lodash'
import {dockerImageFactory} from '../utils/docker'

const stockPresets = {}

// NOTE: Need to be synchronous
export const basePreset = (clipped: Object) => {
  // Filesystem manipulations
  function fileOperations (callback: Function) {
    return async function (operations: Object | Object[]) {
      await Promise.all(castArray(operations).map(
        operation => callback(operation)
      ))
      return this
    }
  }

  clipped.fs = {
    copy: fileOperations(({src, dest}) => fs.copy(src, dest)),
    remove: fileOperations(({path}) => fs.remove(path)),
    move: fileOperations(({src, dest, opt = {}}) => fs.move(src, dest, opt)),
    mkdir: fileOperations(({path}) => fs.ensureDir(path)),
    emptydir: fileOperations(({path}) => fs.emptyDir(path))
  }

  Object.assign(clipped, clipped.fs)
}

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
