const nodemon = require('nodemon')
const {cwd, resolvePath} = require('../utils')
const {getConfig} = require('./config')

const nodejs = (config: thingConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    nodemon({
      script: resolvePath(`../templates/wrappers/${'nodejs'}/thing.js`),
      watch: [resolvePath('./src', cwd)]
    })

    nodemon.on('start', function () {
      console.log('> Backend has started')
    }).on('quit', function () {
      console.log('App has quit');
      resolve()
    }).on('restart', function (files) {
      console.log('App restarted due to: ', files)
    }).on('crash', function (err) {
      console.error(err)
      reject(err)
    })
  })

const dev: Object = {
  nodejs
}

if (!module.parent) dev[getConfig().type]()

module.exports = dev
