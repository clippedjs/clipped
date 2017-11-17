const nodemon = require('nodemon')
const spawn = require('cross-spawn')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const {cwd, resolvePath} = require('../utils')
const {getConfig, getClipPath} = require('./config')

/**
 * dev - Handle dev action
 *
 * @param {clippedConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
function dev (config = getConfig()) {
  return new Promise((resolve, reject) => {
    rimraf(resolvePath('./dist', cwd), err => {
      if (err) reject(err)
      mkdirp(resolvePath('./dist', cwd), err => {
        if (err) reject(err)
        const wrapperPath = getClipPath(config.type, 'wrapper')

        const installProc = spawn('npm', ['install', '--prefix', wrapperPath], {stdio: 'inherit'})
        installProc.on('close', (code) => {
          const proc = spawn('npm', [
            'run',
            `dev`,
            '--prefix', wrapperPath,
            '--',
            `--env.clippedTarget=${cwd}`
          ], {stdio: 'inherit'})
          proc.on('close', (code) => process.exit(code))
          proc.on('error', (err) => {
            console.error(err)
            process.exit(1)
          })
        })
      })
    })
  })
}

if (!module.parent) dev()

module.exports = dev
