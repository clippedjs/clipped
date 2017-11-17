// @flow
const fs = require('fs')
const {ncp} = require('graceful-ncp')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const tar = require('tar-fs')
const minimist = require('minimist')
const spawn = require('cross-spawn')
const Docker = require('dockerode')
const {cwd, resolvePath} = require('../utils')
const {getConfig} = require(resolvePath('actions/config'))

/**
 * docker - Builds docker image from dist folder
 *
 * @param {clippedConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
const docker = (config: clippedConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    const srcDockerfile: string = resolvePath(`../templates/docker-images/${config.type || 'nodejs'}/`)
    const destDockerfile: string = resolvePath('dist', cwd)

    // Copy template dockerfile to dist folder
    // rimraf(destDockerfile, err => {
      // if (err) reject(err)
      ncp(srcDockerfile, destDockerfile, err => {
        if (err) reject(err)

        console.log('> Start building image')
        const docker = new Docker()

        // const tarStream = tar.pack(resolvePath('dist', cwd))
        const files = fs.readdirSync(resolvePath('dist', cwd))

        docker.buildImage(
          // tarStream,
          {
            context: resolvePath('dist', cwd),
            src: files
          },
          {
            // NOTE: dockerode does not seem to support custom dockerfile in options?
            // f: srcDockerfile,
            t: config.name
          },
          (err, output:stream$Readable) => {
            if (err) {
              console.error(err)
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
    // })
  })

/**
 * native - Builds dist folder from src folder
 *
 * @param {clippedConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
const native = (config: clippedConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    let proc, installProc
    rimraf(resolvePath('./dist', cwd), err => {
      if (err) reject(err)
    //   mkdirp(resolvePath('./dist', cwd), err => {
    //     if (err) reject(err)
    switch (config.type) {
        case 'frontend':
          installProc = spawn('npm', ['install', '--prefix', resolvePath('../templates/wrappers/frontend')], {stdio: 'inherit'})
          installProc.on('close', (code) => {
            const proc = spawn('npm', [
              'run',
              `build`,
              '--prefix', resolvePath('../templates/wrappers/frontend'),
              '--',
              '--env.clippedTarget',
              cwd
            ], {stdio: 'inherit', 'NODE_ENV': 'production'})
            proc.on('close', (code) => resolve())
            proc.on('error', (err) => {
                console.error(err)
                reject(err)
              })
          })
          installProc.on('error', (err) => {
              console.error(err)
              reject(err)
            })
          break
        case 'nodejs':
          mkdirp(resolvePath('./dist', cwd), err => {
            if (err) reject(err)
            installProc = spawn('npm', ['install', '--prefix', resolvePath('../templates/wrappers/nodejs')], {stdio: 'inherit'})
            installProc.on('close', (code) => {
              const proc = spawn('npm', [
                'run',
                `build`,
                '--prefix', resolvePath('../templates/wrappers/nodejs'),
                '--',
                '--env.clippedTarget',
                cwd
              ], {stdio: 'inherit', 'NODE_ENV': 'production'})
              proc.on('close', (code) => resolve())
              proc.on('error', (err) => {
                  console.error(err)
                  reject(err)
                })
            })
            installProc.on('error', (err) => {
              console.error(err)
              reject(err)
            })
          })
          break
        default:
        }
    //   })
    })
  })

async function build (config: clippedConfig = getConfig()) {
  const argv: Object = minimist(process.argv, {default: {platform: 'native'}})
  const platforms: Array<string> = [...new Set([].concat(argv['platform']))]
  await Promise.all(
    platforms.map(async (platform: string) => {
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
if (!module.parent)
  try {
    build()
  } catch(e) {
    console.error(e)
    process.exit(e)
  }

module.exports = build
