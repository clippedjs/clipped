import path from 'path'
import {cloneRepo, exec} from '../utils'

/**
 * resolvePath - Resolve path from cwd
 *
 * @param {string | string[]} dirs
 * @memberof Clipped
 */
export function resolvePath (...dirs: string[]) {
  return path.join((this.config && this.config.context) || process.cwd(), ...dirs)
}

export function initHelper (Clipped: Object) {
  Clipped.prototype.resolve = resolvePath

  Clipped.prototype.clone = cloneRepo

  Clipped.prototype.exec = exec

  return Clipped
}
