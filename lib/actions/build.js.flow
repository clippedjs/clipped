// @flow
const fs = require('fs')
const tar = require('tar-fs')
const Docker = require('dockerode')
const {cwd, resolvePath} = require('../utils')
const {getConfig} = require(resolvePath('actions/config'))

const docker = (config: thingConfig = getConfig()) =>
  new Promise((resolve, reject) => {
    // Use template dockerfile if no existing one
    const srcDockerfile: string = resolvePath(`../docker-images/${config.type || 'nodejs'}/Dockerfile`)
    const destDockerfile: string = resolvePath('./Dockerfile', cwd)
    let usingTemplateDockerfile: boolean = false

    if (!fs.existsSync(destDockerfile)) {
      usingTemplateDockerfile = true
      try {
        // $FlowFixMe
        fs.copyFileSync(srcDockerfile, destDockerfile)
        // BUG: does not run on Ctrl+C
        process.on('SIGINT', () => {
          deleteDefaultDockerfileSync(destDockerfile)
          process.exit()
        })
      } catch (err) {
        console.error(err)
        console.log('> Failed to use template Dockerfile')
      }
    }

    console.log('> Start building image')
    const docker = new Docker()

    docker.buildImage(
      tar.pack(resolvePath('./', cwd)),
      {
        // NOTE: dockerode does not seem to support custom dockerfile in options?
        // f: srcDockerfile,
        t: config.name
      },
      (err, output:stream$Readable) => {
        if (err) {
          if (usingTemplateDockerfile) {
            deleteDefaultDockerfileSync(destDockerfile)
          }
          reject(err)
        }
        output.pipe(process.stdout, {end: true})
        output.on('end', () => {
          // Delete tempalte dockerfile
          if (usingTemplateDockerfile) {
            deleteDefaultDockerfileSync(destDockerfile)
          }
          resolve()
        })
      }
    )
  })

function deleteDefaultDockerfileSync (destDockerfile: string = '') {
  if (fs.existsSync(destDockerfile)) {
    fs.unlinkSync(destDockerfile)
  }
}

const build: Object = {
  docker
}

if (!module.parent) build.docker()

module.exports = build
