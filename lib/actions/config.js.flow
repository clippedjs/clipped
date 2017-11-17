// @flow
const {cwd, resolvePath} = require('../utils')


/**
 * getConfig - Get clipped.config.js of prject
 *
 * @returns {thingConfig}
 */
function getConfig (): clippedConfig {
  let config: clippedConfig = {}
  try {
    config = require(resolvePath('clipped.config.js', cwd))
  } catch (err) {}
  return config
}


/**
 * getClipPath - setup clip and return its path
 *
 * @param {string} type
 * @returns {string} path to clip
 */
// NOTE: use sync til promisify file manipulations
function getClipPath (type: string = 'nodejs'): string {
  return resolvePath(`../templates/wrappers/${type}`)
}

module.exports = {
  getConfig,
  getClipPath
}
