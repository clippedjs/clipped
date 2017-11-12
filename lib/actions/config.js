// 
const {cwd, resolvePath} = require('../utils')

function getConfig () {
  let config = {}
  try {
    config = require(resolvePath('thing.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
