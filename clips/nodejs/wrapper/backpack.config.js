const fs = require('fs')
const path = require('path')
const minimist = require('minimist')

const argv = minimist(process.argv, {default: {env: {clippedTarget: process.cwd()}}})
const CLIPPED_TARGET = '' + argv['env'] && argv['env']['clippedTarget']
// Prevent custom target argument from entering node itself
process.argv = process.argv.filter(arg => arg.includes('clippedTarget'))

function resolve (dir) {
  return path.join(CLIPPED_TARGET, dir)
}

const indexAtRoot = fs.existsSync(resolve('./index.js'))
const index = indexAtRoot ? resolve('./index.js') : resolve('./src/index.js')

module.exports = {
  webpack: (config, options, webpack) => {
    // Runtime dependencies
    fs.writeFileSync(resolve('./dist/package.json'), fs.readFileSync(resolve('./package.json')))
    fs.writeFileSync(resolve('./dist/clipping.js'), fs.readFileSync('./clipping.js'))

    // Perform customizations to config
    // Important: return the modified config

    config.entry = {
      clipped: resolve('./dist/clipping.js'),
      // index: resolve('./src/index.js')
      index
    }
    config.output.path = resolve('./dist')

    // Make webpack look into node_modules both in wrapper and cwd
    config.resolve.modules.push(resolve('node_modules'))
    config.resolveLoader.modules.push(resolve('node_modules'))
    config.module.rules.find(rule => rule.loader.includes('babel')).exclude.push(resolve('node_modules'))

    // No sourcemap to remove runtime dependency
    // NOTE: might add back later
    config.devtool = false
    config.plugins.splice(1, 1)

    // react-native and nodejs socket excluded to make skygear work
    Object.assign(config.externals, {
      'react-native': 'undefined',
      'websocket': 'undefined'
    })

    return config
  }
}
