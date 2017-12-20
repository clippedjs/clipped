const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const presetWebpack = require('clipped-preset-webpack')

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = async (clipped, opt = {babel: {options: {}}}) => {
  try {
    await clipped.use(presetWebpack)

    clipped.config.webpack.resolve.modules
      .add(path.join(__dirname, 'node_modules'))
    clipped.config.webpack.resolveLoader.modules
      .add(path.join(__dirname, 'node_modules'))

    clipped.config.webpack
      .target('node')
      .node
        .set('__filename', false)
        .set('__dirname', false)
        .end()
        .externals(nodeModules)

    clipped.config.webpack
      .output
        .libraryTarget('commonjs2')

    clipped.config.webpack
      .plugin('banner')
        .use(webpack.BannerPlugin, [{
          raw: true,
          entryOnly: false,
          banner: `require('${
            // Is source-map-support installed as project dependency, or linked?
            ( require.resolve('source-map-support').indexOf(process.cwd()) === 0 )
              // If it's resolvable from the project root, it's a project dependency.
              ? 'source-map-support/register'
              // It's not under the project, it's linked via lerna.
              : require.resolve('source-map-support/register')
          }')`
        }])

    clipped.config.webpack.module
      .rule('babel')
        .test(/\.js$/)
        .use('babel')
        .loader(require.resolve('babel-loader'))
        .options(Object.assign({
          presets: [
            [require.resolve('babel-preset-backpack')]
          ]
        }, opt.babel.options))

    clipped.config.webpack.merge({
      externals: nodeExternals({
        whitelist: [
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|less|styl)$/,
        ]
      })
    })
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
}
