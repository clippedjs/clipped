import path from 'path'
import {castArray} from 'lodash'
import {ncp} from '../utils'

/**
 * resolvePath - Resolve path from cwd
 *
 * @param {string | string[]} dirs
 * @memberof Clipped
 */
export function resolvePath (...dirs: string[]) {
  return path.join((this.config && this.config.context) || process.cwd(), ...dirs)
}

/**
 * copyFiles - Multiple file operations
 *
 * @param {(Object | Object[])} operations
 *
 */
export async function copyFiles (operations: Object | Object[]) {
  await Promise.all(castArray(operations).map(
    operation => ncp(operation.src, operation.dest, operation.opt)
  ))
}

export function initHelper (Clipped: Object) {
  Clipped.prototype.resolve = resolvePath

  Clipped.prototype.copy = copyFiles

  return Clipped
}
