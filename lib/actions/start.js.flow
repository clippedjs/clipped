// @flow
const {resolvePath} = require('../utils')
const {getConfig} = require(resolvePath('actions/config'))
const {buildImage} = require(resolvePath('actions/build'))

function startThing (config: thingConfig = getConfig()) {
  console.log('> Starting Thing')
  buildImage(config)
}

if (!module.parent) startThing()

module.exports = {
  startThing
}
