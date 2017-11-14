// @flow
const {resolvePath} = require('../utils')
const {getConfig} = require('./config')
const build = require('./build')

function startThing (config: thingConfig = getConfig()) {
  console.log('> Starting Thing')
  build.docker(config)
}

if (!module.parent) startThing()

module.exports = {
  startThing
}
