const path = require('path')
const minimist = require('minimist')

const argv = minimist(process.argv, {default: {env: {clippedTarget: process.cwd()}}})
const CLIPPED_TARGET = '' + argv['env'] && argv['env']['clippedTarget']
// Prevent custom target argument from entering node itself
process.argv = process.argv.filter(arg => arg.includes('clippedTarget'))

function resolve (dir) {
  return path.join(CLIPPED_TARGET, dir)
}

module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config

    // changes the name of the entry point from index -> main.js
    config.entry = {
      clipped: resolve('./src/index.js')
    }

    config.resolve.modules.push(resolve('node_modules'))
    config.resolveLoader.modules.push(resolve('node_modules'))

    config.output.path = resolve('./dist')

    return config
  }
}
