// @flow
const {cwd, resolvePath} = require('../utils')

function getConfig (): thingConfig {
  let config: thingConfig = {}
  try {
    config = require(resolvePath('thing.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
