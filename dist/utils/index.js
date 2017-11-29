const path = require('path')

const cwd = process.cwd()

/**
 * resolvePath - Resolve paths
 *
 * @param {string}  [dir=''] Target
 * @param {string} [parent='../'] Parent path
 *
 * @returns {string} Resolved path
 */
function resolvePath (dir = '', parent = path.join(__dirname, '../')) {
  return path.join(parent, dir)
}

module.exports = {
  cwd,
  resolvePath
}
