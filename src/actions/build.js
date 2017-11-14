// @flow
const fs = require('fs')
const {ncp} = require('graceful-ncp')
const tar = require('tar-fs')
const minimist = require('minimist')
const spawn = require('cross-spawn')
const Docker = require('dockerode')
const {cwd, resolvePath} = require('../utils')
const {getConfig} = require(resolvePath('actions/config'))

/**
 * docker - Builds docker image from dist folder
 *
 * @param {thingConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
const docker = (config: thingConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    const srcDockerfile: string = resolvePath(`../templates/docker-images/${config.type || 'nodejs'}/`)
    const destDockerfile: string = resolvePath('./dist/', cwd)
    try {
      // Copy template dockerfile to dist folder
      ncp(srcDockerfile, destDockerfile, err => { console.error(err); reject(err) })
    } catch (err) {
      console.error(err)
      console.log('> Failed to use template Dockerfile')
    }

    console.log('> Start building image')
    const docker = new Docker()
    docker.buildImage(
      tar.pack(resolvePath('./dist', cwd)),
      {
        // NOTE: dockerode does not seem to support custom dockerfile in options?
        // f: srcDockerfile,
        t: config.name
      },
      (err, output:stream$Readable) => {
        if (err) {
          reject(err)
        }
        if (output) {
          output.pipe(process.stdout, {end: true})
          output.on('end', () => {
            resolve()
          })
        }
      }
    )
  })

/**
 * native - Builds dist folder from src folder
 *
 * @param {thingConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
const native = (config: thingConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    switch (config.type) {
      case 'frontend':
        const proc = spawn(`node`, [
          resolvePath('../templates/wrappers/frontend/node_modules/.bin/webpack'),
          '--progress',
          `--config`,
          resolvePath('../templates/wrappers/frontend/webpack.config.js')
        ], {stdio: 'inherit', 'NODE_ENV': 'production'})
        proc.on('close', (code) => resolve())
        proc.on('error', (err) => {
          console.error(err)
          reject()
        })
        break
      default:
    }
  })

async function build (config: thingConfig = getConfig()) {
  const argv: Object = minimist(process.argv, {default: {platform: 'native'}})
  const platforms: Array<string> = [...new Set([].concat(argv['platform']))]
  await Promise.all(
    platforms.map(async (platform: string) => {
      console.log(platform)
      switch (platform) {
        case 'docker':
          await native(config)
          await docker(config)
          break
        case 'native':
          await native(config)
          break
        default:
      }
    })
  )
}
if (!module.parent) build()

module.exports = build
