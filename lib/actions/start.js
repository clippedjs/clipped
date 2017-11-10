// 
const {resolve} = require('../utils')
const {getConfig} = require(resolve('actions/config'))
const {buildImage} = require(resolve('actions/build'))

function startThing (config = getConfig()) {
  console.log('> Starting Thing')
  buildImage(config)
}

if (!module.parent) startThing()

module.exports = {
  startThing
}
