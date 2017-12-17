const fs = require('fs')

module.exports = async clipped => {
  clipped.hook('pre-build:docker')
    .add('build', clipped.execHook('version'))
  clipped.hook('build:docker')
    .add('default', async clipped => {
      await clipped.copy([
        {src: clipped.config.dockerTemplate, dest: clipped.config.dist}
      ])

      await clipped.docker.build(
        {
          context: clipped.config.context,
          src: fs.readdirSync(clipped.config.dist)
        },
        {
          t: clipped.config.name
        }
      )
    })
    console.log(Object.keys(clipped.hooks).map(hook => clipped.hooks[hook].tasks.map(task => task.callback.toString())))
}
