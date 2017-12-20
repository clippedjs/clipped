import Docker from 'dockerode'

/**
 * dockerImageFactory - Docker image generator
 *
 * @async
 * @param {type} pack
 * @param {Object} [opts={}]
 *
 */
function dockerImageFactory (pack: any, opts: Object = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const docker = new Docker()
    docker.buildImage(
      pack,
      opts,
      (err, output:stream$Readable) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        if (output) {
          output.pipe(process.stdout, {end: true})
          output.on('end', () => resolve())
        }
      }
    )
  })
}

export {
  dockerImageFactory
}
