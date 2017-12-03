const path = require('path')
const merge = require('webpack-merge')
const {cwd, resolvePath, promiseSerial} = require('../utils')
const {getRepoOwner, cloneRepo, fetchRepo} = require('../utils/git')

const CLIP_POSTFIX = '-clip'
const CLIP_CACHE_PATH = `./.clips`

/**
 * getConfig - Get clipped.config.js of project
 *
 * @async
 * @returns {thingConfig}
 */
async function getConfig (): clippedConfig {
  let config: clippedConfig = {}
  let packageJSON: Object = {}

  // Since it is fully dynamic, need to use nodejs's rather than webpack's require
  // eslint-disable-next-line no-undef
  try { packageJSON = __non_webpack_require__(resolvePath('package.json', cwd)) } catch (err) { console.error(err) }
  // eslint-disable-next-line no-undef
  try { config = __non_webpack_require__(resolvePath('clipped.config.js', cwd)) } catch (err) { console.error(err) }
  return merge(packageJSON, config)
}

/**
 * getClipPath - setup clip and return its path
 *
 * @async
 * @param {string} type clip
 * @param {string} target subfolder of clip
 * @returns {Promise<sting>} Promise to return  path to clip
 */
async function getClipPath (type: string = 'nodejs', target: string = ''): Promise<string> {
  let clipRepos: Object[] = []

  if (!type.includes(CLIP_POSTFIX)) type += CLIP_POSTFIX

  // Override sequence: clipped.config.js -> repo owner -> base
  // Is full url
  if (type.split('/').length >= 3) {
    clipRepos.push({name: type, url: type})
  }
  // Use clipped config
  if (type.includes('/') && type.split('/')[0]) {
    clipRepos.push({name: type, url: `https://github.com/${type}`})
    clipRepos.push({name: type, url: `git@github.com:${type}`})
  }
  // Use repo owner
  if (!type.includes('/')) {
    try {
      const repoOwner = await getRepoOwner()
      const clipPath = `${repoOwner}/${type}`
      clipRepos.push({name: clipPath, url: `https://github.com/${clipPath}`})
      clipRepos.push({name: clipPath, url: `git@github.com:${clipPath}`})
  } catch (e) {}
  }
  // Base clip
  const clipName = 'clippedjs/' + type.substr(type.includes('/') ? type.lastIndexOf('/') + 1 : 0)
  clipRepos.push({name: clipName, url: `https://github.com/${clipName}`})

  // Start making clone attempts, stop on first success
  let result: ?string = null  
  const cloneAttempts = clipRepos.map(repo => async () => {
    if (result) return
    let clipPath = ''
    try {
      clipPath = resolvePath(path.join(CLIP_CACHE_PATH, repo.name))
      await cloneRepo(repo.url, clipPath)
      result = clipPath
    } catch (e) {
      // If already cached
      if (e.message.includes('exists and is not an empty directory')) {
        console.log('Clip exists in cache')        
        await fetchRepo(clipPath)
        result = clipPath
      } else if (e.message.includes('credentials callback returned an invalid cred type errno')) {
        // Wrong credentials (hope is due to private https)
      } else {
        console.error(e)
      }
    }
  })
  await promiseSerial(cloneAttempts)

  if (!result) throw new Error('Cannot find clip requested')
  return path.join(result, target)
}

export {
  getConfig,
  getClipPath
}
