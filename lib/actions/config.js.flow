// @flow
const path = require('path')
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
 * @async
 * @param {string} type
 * @returns {Promise<sting>} Promise to return  path to clip
 */
async function getClipPath (type: string = 'nodejs', target: string = ''): Promise<string> {
  return resolvePath(path.join(`../clips/${type}`, target))
}

module.exports = {
  getConfig,
  getClipPath
}
