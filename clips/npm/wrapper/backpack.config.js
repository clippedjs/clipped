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

module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config
    fs.writeFileSync(resolve('./dist/clipping.js'), fs.readFileSync('./clipping.js'))

    // changes the name of the entry point from index -> main.js
    config.entry = {
      index: resolve('./src/index.js')
    }

    config.resolve.modules.push(resolve('node_modules'))
    config.resolveLoader.modules.push(resolve('node_modules'))

    config.output.path = resolve('./dist')

    config.module.rules.find(rule => rule.loader.includes('babel')).exclude.push(resolve('node_modules'))

    return config
  }
}
