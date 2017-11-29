const fs = require('fs')
const yarnInstall = require('yarn-install')
const {cwd, resolvePath} = require('../utils')
const {ncp, rimraf, mkdirp} = require('../utils/file-manipulation')
const {spawnFactory} = require('../utils/process-spawn')
const {dockerImageFactory} = require('../utils/docker')
const {getConfig, getClipPath} = require('./config')

/**
 * docker - Builds docker image from dist folder
 *
 * @async
 * @param {clippedConfig} [config={}]
 * @returns {Promise<void>}
 */
async function docker (config = getConfig()) {
  const srcDockerImage = await getClipPath(config.type, 'docker-image')
  const dockerImageDest = resolvePath('dist', cwd)

  console.log('> Preparing Dockerfile')
  await ncp(srcDockerImage, dockerImageDest)

  console.log('> Start building image')
  const files = fs.readdirSync(dockerImageDest)
  // const tarStream = tar.pack(resolvePath('dist', cwd))
  await dockerImageFactory(
    // tarStream,
    {
      context: resolvePath('dist', cwd),
      src: files
    },
    {
      // NOTE: dockerode does not seem to support custom dockerfile in options?
      // f: srcDockerfile,
      t: config.name
    }
  )
}

/**
 * native - Builds dist folder from src folder
 *
 * @async
 * @param {clippedConfig} [config={}]
 * @returns {Promise<void>}
 */
async function native (config = getConfig()) {
  await rimraf(resolvePath('./dist', cwd))
  await mkdirp(resolvePath('./dist', cwd))

  const wrapperPath = await getClipPath(config.type, 'wrapper')
  await yarnInstall({cwd: wrapperPath})
  await spawnFactory(
    'npm',
    ['run', 'build', '--prefix', wrapperPath, '--', `--env.clippedTarget=${cwd}`],
    {stdio: 'inherit', 'NODE_ENV': 'production'}
  )
}

/**
 * build - Build action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 */
async function build (config = getConfig()) {
  // Make sure each platform only build once
  const platforms = [...new Set([].concat(config.platform || 'native'))]
  await Promise.all(
    platforms.map(async (platform) => {
      switch (platform) {
        case 'docker':
          await native(config)
          await docker(config)
          break
        case 'native':
          await native(config)
          break
        default:
      }
    })
  )
}

module.exports = build
