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
    const installProc = spawn('npm', ['install', '--prefix', resolvePath('../templates/wrappers/frontend')], {stdio: 'inherit'})
    installProc.on('close', (code) => {
      const proc = spawn('npm', [
        'run',
        `dev`,
        '--prefix', resolvePath('../templates/wrappers/frontend'),
        '--',
        '--env.clippedTarget',
        cwd
      ], {stdio: 'inherit'})
      proc.on('close', (code) => process.exit(code))
      proc.on('error', (err) => {
        console.error(err)
        process.exit(1)
      })
    })
  })

const dev: Object = {
  nodejs,
  frontend
}

if (!module.parent) dev[getConfig().type]()

module.exports = dev
