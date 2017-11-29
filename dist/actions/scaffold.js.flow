const yarnInstall = require('yarn-install')
const {cwd} = require('../utils')
const {ncp} = require('../utils/file-manipulation')
const {getConfig, getClipPath} = require('./config')

/**
 * scaffold - Scaffold action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 */
async function scaffold (config: clippedConfig = getConfig()) {
  const {type} = config

  // Copy scaffold into folder and install dependencies
  const scaffoldPath = await getClipPath(type, 'scaffold')
  await ncp(scaffoldPath, cwd)
  await yarnInstall({cwd})

  console.log(`
    Scaffolding is done!
    npm run dev # or npm run build
  `)
}

module.exports = scaffold
