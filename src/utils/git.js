const git = __non_webpack_require__('nodegit')
const {cwd} = require('../utils')

/**
 * getGitUsername - get username from git config
 *
 * @returns {Promise<string>} username
 */
async function getGitUsername (): Promise<string> {
  const gitConfig = await git.Config.openDefault()
  return gitConfig.getString('user.name')
}

/**
 * getRepoOwner - get owner from git repo url
 *
 * @async
 * @param {string} url
 *
 * @returns {Promise<string>} org
 */
async function getRepoOwner (url: string = cwd): Promise<string> {
  const repo = await git.Repository.open(url)
  const repoConfig = await repo.config()
  return repoConfig.getString('user.name')
}

/**
 * cloneRepo - clone repo into dest path
 *
 * @param {string} repo
 * @param {string} dest
 * @param {Object} opt
 *
 */
async function cloneRepo (repo: string, dest: string = __dirname, opt: Object = {}): Promise<void> {
  return git.Clone(repo, dest, opt)
}

export {
  getGitUsername,
  getRepoOwner,
  cloneRepo
}
