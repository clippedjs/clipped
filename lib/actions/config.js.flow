// @flow
const {cwd, resolve} = require('../utils')

function getConfig (): thingConfig {
  let config: thingConfig = {}
  try {
    config = require(resolve('thing.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
