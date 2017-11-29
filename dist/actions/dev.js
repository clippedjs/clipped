const yarnInstall = require('yarn-install')
const {cwd, resolvePath} = require('../utils')
const {rimraf, mkdirp} = require('../utils/file-manipulation')
const {spawnFactory} = require('../utils/process-spawn')
const {getConfig, getClipPath} = require('./config')

/**
 * dev - Handle dev action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
async function dev (config = getConfig()) {
  // Make sure dist folder is clear
  await rimraf(resolvePath('./dist', cwd))
  await mkdirp(resolvePath('./dist', cwd))

  const wrapperPath = await getClipPath(config.type, 'wrapper')
  await yarnInstall({cwd: wrapperPath})

  await spawnFactory('npm', ['run', `dev`, '--prefix', wrapperPath, '--', `--env.clippedTarget=${cwd}`])
}

module.exports = dev
