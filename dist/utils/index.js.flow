const path = require('path')

const cwd: string = process.cwd()

/**
 * resolvePath - Resolve paths
 *
 * @param {string}  [dir=''] Target
 * @param {string} [parent='../'] Parent path
 *
 * @returns {string} Resolved path
 */
function resolvePath (dir: string = '', parent: string = path.join(__dirname, '../')): string {
  return path.join(parent, dir)
}

module.exports = {
  cwd,
  resolvePath
}
