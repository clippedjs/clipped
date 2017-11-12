const rimraf = require('rimraf')
const ncp = require('graceful-ncp').ncp
const {cwd, resolvePath} = require('../utils')

ncp.limit = 16

function dotThing (srcPath) {
  const thingPath = resolvePath('.thing', cwd)
  rimraf(thingPath, () => {
    console.log("> Existing '.thing' directory deleted')}")
    return new Promise((resolve, reject) => {
      ncp(srcPath, thingPath, err => { console.error(err); reject(err) })
      resolvePath()
    })
  })
}

module.exports = {
  dotThing
}
