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

    // To use custom babelrc
    delete (config.module.rules.find(rule => rule.loader.includes('babel')).options)
    config.module.rules.push({
      test: /node_modules\/JSONStream\/index\.js$/,
      loader: 'shebang-loader'
    })
    config.module.rules.find(rule => rule.loader.includes('babel')).loader = `babel-loader?babelrc=false&extends=${path.join(__dirname, '/.babelrc')}`

    return config
  }
}
