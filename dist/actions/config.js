// 
const path = require('path')
const merge = require('webpack-merge')
const {cwd, resolvePath} = require('../utils')

/**
 * getConfig - Get clipped.config.js of prject
 *
 * @returns {thingConfig}
 */
function getConfig () {
  let config = {}
  let packageJSON = {}
  try {
    packageJSON = require(resolvePath('package.json', cwd))
    config = require(resolvePath('clipped.config.js', cwd))
  } catch (err) {}
  return merge(packageJSON, config)
}

/**
 * getClipPath - setup clip and return its path
 *
 * @async
 * @param {string} type
 * @returns {Promise<sting>} Promise to return  path to clip
 */
async function getClipPath (type = 'nodejs', target = '') {
  return resolvePath(path.join(`../clips/${type}`, target))
}

module.exports = {
  getConfig,
  getClipPath
}
