// @flow
const {cwd, resolvePath} = require('../utils')

function getConfig (): clippedConfig {
  let config: clippedConfig = {}
  try {
    config = require(resolvePath('clipped.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
