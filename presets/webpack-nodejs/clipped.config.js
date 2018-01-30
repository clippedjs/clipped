const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = async clipped => {
  try {
    await clipped.use(require('clip-webpack'))

    // Add resolves
    clipped.config.webpack
      .mark()
        .resolve
          .modules
            .add(path.join(__dirname, 'node_modules'))
      .back()
        .resolveLoader
          .modules
            .add(path.join(__dirname, 'node_modules'))
    
    // Target at node
    clipped.config.webpack
      .set('target', 'node')
      .set('node', {
        __filename: false,
        __dirname: false
      })
      .set('externals', nodeExternals({
        whitelist: [
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|less|styl)$/
        ]
      }))
      .output
        .set('libraryTarget', 'commonjs2')

    // Sourcemap banner
    clipped.config.webpack
      .plugins
        .use('banner', webpack.BannerPlugin, [{
          raw: true,
          entryOnly: false,
          banner: `require('${
            // Is source-map-support installed as project dependency, or linked?
            (require.resolve('source-map-support').indexOf(process.cwd()) === 0)
              // If it's resolvable from the project root, it's a project dependency.
              ? 'source-map-support/register'
              // It's not under the project, it's linked via lerna.
              : require.resolve('source-map-support/register')
          }')`
        }])

  //  Support flowtype and backpack
  clipped.config.webpack
  .module
    .rules
      .babel
        .use
          .babel
            .options
              .set('presets', [
                [require.resolve('babel-preset-backpack')],
                [require.resolve('babel-preset-flow')]
              ])
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
}
