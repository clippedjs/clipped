const tar = require('tar-fs')
const Docker = require('dockerode')

module.exports = async clipped => {
  if (!clipped.config.name) throw new Error('Need to provide image name')

  clipped.docker = {
    buildImage: (pack, opts) =>
      new Promise((resolve, reject) => {
        const docker = new Docker()
        docker.buildImage(
          pack,
          opts,
          (err, output) => {
            if (err) {
              console.error(err)
              reject(err)
            }
            if (output) {
              output.pipe(process.stdout, {end: true})
              output.on('end', resolve)
            }
          }
        )
      })
  }

  clipped.hook('pre-build:docker')
    .add('build-native', async clipped => clipped.execHook('build'))
  clipped.hook('build:docker')
    .prepend('build-docker', async clipped => {
      try {
        await clipped.copy([
          {src: clipped.config.dockerTemplate, dest: clipped.config.dist}
        ])

        // let docker = new Docker({ socketPath: '/var/run/docker.sock' })

        const stream = await tar.pack(clipped.config.dist)
        // const files = fs.readdirSync(clipped.config.dist)
        // console.log(`name is ${clipped.config.name}, ${files}`)
        await clipped.docker.buildImage(
          stream,
          {
            t: clipped.config.name
            // dockerfile: path.join(clipped.config.dist, 'Dockerfile')
          }
        )
      } catch (e) {
        console.error(e)
      }
    })
    // console.log(Object.keys(clipped.hooks).map(hook => clipped.hooks[hook].tasks.map(task => task.callback.toString())))
}
