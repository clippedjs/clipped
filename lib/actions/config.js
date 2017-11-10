// 
const {cwd, resolve} = require('../utils')

function getConfig () {
  let config = {}
  try {
    config = require(resolve('thing.config.js', cwd))
  } catch (err) {}
  return config
}

module.exports = {
  getConfig
}
