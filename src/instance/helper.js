import path from 'path'
import {castArray} from 'lodash'
import {ncp} from '../utils'
import fs from 'fs-extra'

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
    operation => fs.copy(operation.src, operation.dest)
  ))
  return this
}

export function initHelper (Clipped: Object) {
  Clipped.prototype.resolve = resolvePath

  Clipped.prototype.copy = copyFiles.bind(Clipped.prototype)

  return Clipped
}
