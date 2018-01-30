const path = require('path')
const fs = require('fs')
const nodemon = require('nodemon')

module.exports = async clipped => {
  await clipped.use(require('@clipped/preset-webpack-nodejs'))

  let mainFile = path.join(clipped.config.context, clipped.config.packageJson.main)
  try {
    require(mainFile)
  } catch (e) {
    mainFile = null
  }

  clipped.hook('dev')
    .add('watch and nodemon', [
      clipped => clipped.execHook('watch'),
      clipped => new Promise((resolve, reject) => {
        nodemon({
          // Main field in package.json or dist/index.js
          script: mainFile || clipped.config.main || path.join(clipped.config.dist, 'index.js'),
          ext: 'js json',
          ignore: ["test/*", "docs/*"]
        })

        nodemon.on('start', function () {
          console.log('> App has started')
        }).on('quit', function () {
          console.log('> App has quit')
          process.exit();
        }).on('restart', function (files) {
          console.log('> App restarted due to: ', files)
        })
      })
    ])
}
