const Docker = require('dockerode')

module.exports.dockerImageFactory = (pack, opts = {}) =>
  new Promise((resolve, reject) => {
    const docker = new Docker()
    docker.buildImage(
      pack,
      opts,
      (err, output) => {
        if (err) reject(err)
        if (output) {
          output.pipe(process.stdout, {end: true})
          output.on('end', () => resolve())
        }
      }
    )
  })
