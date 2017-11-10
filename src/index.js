// @flow
'user strict'

const fs = require('fs')
const tar = require('tar-fs')
const Docker = require('dockerode')
const {cwd, resolve} = require('./utils')

type settingsType = {
  name?: string,
  type?: 'nodejs'
}

function getSettings (): settingsType {
  let settings: settingsType = {}
  try {
    settings = require(resolve('thing.config.js', cwd))
  } catch (err) {}
  return settings
}

function buildImage (settings: settingsType) {
  const srcDockerfile: string = resolve(`../docker-images/${settings.type || 'nodejs'}/Dockerfile`)
  const destDockerfile: string = resolve('./Dockerfile', cwd)
  let useDefaultDockerfile: boolean = false

  // Use template dockerfile if not exist
  if (!fs.existsSync(destDockerfile)) {
    useDefaultDockerfile = true
    try {
      // $FlowFixMe
      fs.copyFileSync(srcDockerfile, destDockerfile)
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
      // f: resolve(srcDockerfile),
      t: settings.name
    },
    (err, output) => {
      if (err) {
        return console.error(err)
      }
      output.pipe(process.stdout, {end: true})
      output.on('end', () => {
        // Delete tempalte dockerfile
        if (useDefaultDockerfile) {
          fs.unlinkSync(destDockerfile)
        }
        imageDidBuild()
      })
    }
  )
}

function imageDidBuild () {
  console.log('> Finished building image')
  // TODO: Push to docker registry
}

// Main
const settings: settingsType = getSettings()
buildImage(settings)
