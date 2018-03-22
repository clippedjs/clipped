const nodeExternals = require('webpack-node-externals')

module.exports = async clipped => {
  await clipped.use(require('@clipped/preset-webpack4'))

  // Target nodejs
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
        /\.(css|scss|sass|less|styl)$/,
        /^webpack/
      ]
    }))
    .set('output.libraryTarget', 'commonjs2')

  // Sourcemap banner
  clipped.config.webpack
    .plugins
      .use('banner', clipped.webpack.BannerPlugin, [{
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

  clipped.config.webpack
    .set('module.rules.js.use.babel.options.presets', [
      [require.resolve('babel-preset-backpack')],
      [require.resolve('babel-preset-flow')]
    ])
}
