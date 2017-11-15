// 
const {cwd, resolvePath} = require('../utils')

function getConfig () {
  let config = {}
  try {
    config = require(resolvePath('clipped.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
