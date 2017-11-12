// 
const {resolvePath} = require('../utils')
const {getConfig} = require(resolvePath('actions/config'))
const build = require('./build')

function startThing (config = getConfig()) {
  console.log('> Starting Thing')
  build.docker(config)
}

if (!module.parent) startThing()

module.exports = {
  startThing
}
