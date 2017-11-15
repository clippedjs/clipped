const nodemon = require('nodemon')
const spawn = require('cross-spawn')
const {cwd, resolvePath} = require('../utils')
const {getConfig} = require('./config')

const nodejs = (config: clippedConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    nodemon({
      script: resolvePath(`../templates/wrappers/${'nodejs'}/clipped.js`),
      watch: [resolvePath('./src', cwd)]
    })

    nodemon.on('start', function () {
      console.log('> Backend has started')
    }).on('quit', function () {
      console.log('App has quit')
      resolve()
    }).on('restart', function (files) {
      console.log('App restarted due to: ', files)
    }).on('crash', function (err) {
      console.error(err)
      reject(err)
    })
  })

const frontend = (config: clippedConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    const proc = spawn(`node`, [
      resolvePath('../templates/wrappers/frontend/node_modules/.bin/webpack-dev-server'),
      // resolvePath('../templates/wrappers/frontend/node_modules/.bin/webpack'),
      // '--no-inline',
      '--inline',
      '--progress',
      `--config`,
      // resolvePath('../templates/wrappers/frontend/build/webpack.dev.conf.js')
      resolvePath('../templates/wrappers/frontend/webpack.config.js')
    ], {stdio: 'inherit'})
    proc.on('close', (code) => process.exit(code))
    proc.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
  })

const dev: Object = {
  nodejs,
  frontend
}

if (!module.parent) dev[getConfig().type]()

module.exports = dev
