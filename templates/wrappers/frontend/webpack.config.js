const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  // Directory that called the wrapper
  function resolve (dir) {
    return path.join(env.clippedTarget, dir)
  }

  const baseConfig = {
    context: resolve('.'),
    entry: resolve('src/index.js'),
    output: {
      pathinfo: true,
      path: resolve('dist'),
      // publicPath: '/dist/',
      filename: 'build.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            require.resolve('vue-style-loader'),
            require.resolve('css-loader')
          ]
        }, {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      })
    ],
    resolveLoader: {
      modules: [
        resolve('src'),
        resolve('node_modules'),
        path.resolve(__dirname, 'node_modules'),
        'node_modules'
      ],
      extensions: [ '.js', '.json' ],
      mainFields: [ 'loader', 'main' ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      },
      extensions: ['*', '.js', '.vue', '.json'],
      modules: [
        resolve('src'),
        resolve('node_modules'),
        path.resolve(__dirname, 'node_modules')
      ]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }

  if (process.env.NODE_ENV === 'production') {
    baseConfig.output.publicPath = '/'
    baseConfig.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    baseConfig.plugins = (baseConfig.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }

  return baseConfig
}
