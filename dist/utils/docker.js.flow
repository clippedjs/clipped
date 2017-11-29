const Docker = require('dockerode')

/**
 * dockerImageFactory - Docker image generator
 *
 * @async
 * @param {type} pack
 * @param {Object} [opts={}]
 *
 */
module.exports.dockerImageFactory = (pack: any, opts: Object = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    const docker = new Docker()
    docker.buildImage(
      pack,
      opts,
      (err, output:stream$Readable) => {
        if (err) reject(err)
        if (output) {
          output.pipe(process.stdout, {end: true})
          output.on('end', () => resolve())
        }
      }
    )
  })
