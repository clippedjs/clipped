const tar = require('tar-fs')
const Docker = require('dockerode')

module.exports = ({name, dockerTemplate, dist} = {}) => [
  ({config}) => ({
    docker: {
      name: name || config.name,
      dist: dist || config.dist
    }
  }),
  api => {
    // Build project before docker image
    api.hook('pre-build:docker')
      .add('build', api => api.execHook('build'))

    api.hook('build:docker')
      .prepend('build-docker-image', async api => {
        await api.fs.copy({src: dockerTemplate, dest: api.config.docker.dist})

        const stream = await tar.pack(api.config.docker.dist)
        await new Promise((resolve, reject) => {
          const docker = new Docker()
          docker.buildImage(
            stream,
            {t: api.config.docker.name},
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
      })
  }
]
