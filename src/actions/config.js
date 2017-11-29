const path = require('path')
const merge = require('webpack-merge')
const {cwd, resolvePath} = require('../utils')

/**
 * getConfig - Get clipped.config.js of project
 *
 * @async
 * @returns {thingConfig}
 */
async function getConfig (): clippedConfig {
  let config: clippedConfig = {}
  let packageJSON: Object = {}

  // Since it is fully dynamic, need to use nodejs's rather than webpack's require
  // eslint-disable-next-line no-undef
  try { packageJSON = __non_webpack_require__(resolvePath('package.json', cwd)) } catch (err) { console.error(err) }
  // eslint-disable-next-line no-undef
  try { config = __non_webpack_require__(resolvePath('clipped.config.js', cwd)) } catch (err) { console.error(err) }
  return merge(packageJSON, config)
}

/**
 * getClipPath - setup clip and return its path
 *
 * @async
 * @param {string} type
 * @returns {Promise<sting>} Promise to return  path to clip
 */
async function getClipPath (type: string = 'nodejs', target: string = ''): Promise<string> {
  return resolvePath(path.join(`./clips/${type}`, target))
}

export {
  getConfig,
  getClipPath
}
