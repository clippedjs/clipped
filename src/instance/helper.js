import path from 'path'

/**
 * resolvePath - Resolve path from cwd
 *
 * @param {string} dir
 * @param {string} parent
 * @memberof Clipped
 */
export function resolvePath (dir: string, parent: string = process.cwd()) {
  return path.join(parent, dir)
}

export function initHelper (Clipped: Object) {
  Clipped.prototype.resolve = resolvePath
}
