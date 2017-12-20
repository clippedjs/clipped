const tar = require('tar-fs')
const {Docker} = require('node-docker-api')

module.exports = async clipped => {
  if (!clipped.config.name) throw new Error('Need to provide image name')

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
        await clipped.docker.build(
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
