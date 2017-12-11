const path = require('path')
const {
  resolvePath,
  promiseSerial,
  getRepoOwner,
  cloneRepo,
  fetchRepo,
  insertIf
} = require('../utils')

const CLIP_POSTFIX = '-clip'
const CLIP_CACHE_PATH = resolvePath('./.clips', __dirname)

/**
 * cloneClip - clone clip, yarn, and return its path
 *
 * @export
 * @async
 * @param {string} clip
 * @returns {Promise<sting>} Promise to return  path to clip
 */
export async function cloneClip (clip: string = 'nodejs', target: string = ''): Promise<string> {
  let clipRepos: Object[] = []

  // Add postfix
  if (!clip.includes(CLIP_POSTFIX)) clip += CLIP_POSTFIX

  const repoOwner = await getRepoOwner()
  const baseClip = 'Clippedjs/' + clip.substr(clip.includes('/') ? clip.lastIndexOf('/') + 1 : 0)

  // Override sequence: Clipped.config.js -> repo owner -> base
  clipRepos = [
    // 1. Given Full url
    ...insertIf(
      clip.split('/').length >= 3,
      {name: clip, url: clip}
    ),
    // 2. Given owner of clip
    ...insertIf(
      clip.includes('/') && clip.split('/')[0].length > 0,
      {name: clip, url: `https://github.com/${clip}`},
      {name: clip, url: `git@github.com:${clip}`}
    ),
    // 3. Use project owner
    ...insertIf(
      !clip.includes('/'),
      {name: `${repoOwner}/${clip}`, url: `https://github.com/${repoOwner}/${clip}`},
      {name: `${repoOwner}/${clip}`, url: `git@github.com:${repoOwner}/${clip}`}
    ),
    // 4. Use base clip
    {name: baseClip, url: `https://github.com/${baseClip}`}
  ]

  console.log('Clip repos: ', clipRepos)

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
  await promiseSerial(cloneAttempts, (result, curr) => curr(result))

  if (!result) throw new Error('Cannot find clip requested')
  console.log('Using ', result)
  return path.join(result, target)
}

export function initClip (Clipped: Object) {
  Clipped.prototype.clone = cloneClip
}
