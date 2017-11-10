// @flow
const fs = require('fs')
const tar = require('tar-fs')
const Docker = require('dockerode')
const {cwd, resolve} = require('../utils')
const {getConfig} = require(resolve('actions/config'))

function buildImage (
  config: thingConfig = getConfig(),
  imageDidBuild: any => void = () => { console.log('> Finished building image') }
) {
  const srcDockerfile: string =
    resolve(config.build && config.build.docker && config.build.docker.path, cwd) ||
    resolve(`../docker-images/${config.type || 'nodejs'}/Dockerfile`)
  const destDockerfile: string = resolve('./Dockerfile', cwd)
  let usingTemplateDockerfile: boolean = false

  // Use template dockerfile if no existing one
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
    tar.pack(resolve('./', cwd)),
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
        return console.error(err)
      }
      output.pipe(process.stdout, {end: true})
      output.on('end', () => {
        // Delete tempalte dockerfile
        if (usingTemplateDockerfile) {
          deleteDefaultDockerfileSync(destDockerfile)
        }
        imageDidBuild()
      })
    }
  )
}

function deleteDefaultDockerfileSync (destDockerfile: string = '') {
  if (fs.existsSync(destDockerfile)) {
    fs.unlinkSync(destDockerfile)
  }
}

if (!module.parent) buildImage()

module.exports = {
  buildImage
}
