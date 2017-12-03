import yarnInstall from 'yarn-install'
const git = __non_webpack_require__('nodegit')
const {cwd} = require('../utils')

const fetchOpts = {
  callbacks: {
    certificateCheck: function() { return 1 },
    credentials: async function (url, username = '') {
      let name = username
      if (!name) {
        const gitConfig = await git.Config.openDefault()
        name = await gitConfig.getString('user.name')
      }
      return git.Cred.sshKeyFromAgent(name)
    }
  }
}

/**
 * getGitUsername - get username from git config
 *
 * @async
 * @export
 * @returns {Promise<string>} username
 */
export async function getGitUsername (): Promise<string> {
  const gitConfig = await git.Config.openDefault()
  return gitConfig.getString('user.name')
}

/**
 * getRepoOwner - get owner from git repo url
 *
 * @async
 * @export
 * @param {string} url
 *
 * @returns {Promise<string>} org
 */
export async function getRepoOwner (url: string = cwd): Promise<string> {
  const repo = await git.Repository.open(url)
  const repoConfig = await repo.config()
  return repoConfig.getString('user.name')
}

/**
 * cloneRepo - clone repo into dest path
 *
 * @export
 * @param {string} repo
 * @param {string} dest
 * @param {Object} opt
 *
 */
export async function cloneRepo (repo: string, dest: string = __dirname, opt: Object = {}): Promise<void> {
  await git.Clone(repo, dest, { ...opt, fetchOpts })
  await yarnInstall({cwd: dest})
  await cloneSubmodules(dest)
}

/**
 * fetchRepo - fetch repo at origin
 * 
 * @export
 * @param {string} path 
 * @returns {Promise<void>} 
 */
export async function fetchRepo (path: string, remote: string ='origin'): Promise<void> {
  const repo = await git.Repository.open(path)
  await repo.fetch(remote, { callbacks: fetchOpts.callbacks })
  await yarnInstall({cwd: path})  
  await cloneSubmodules(path)
}

/**
 * cloneSubmodules - clone all submodules of current folder
 * 
 * @export
 * @param {string} path 
 * @returns {Promise<void>} 
 */
export async function cloneSubmodules (path: string, opt: Object = {}): Promise<void> {
  const localRepo = await git.Repository.open(path)
  
  let cloneAttempts: Function[] = []
  await git.Submodule.foreach(localRepo, async submodule => {
    // cloneAttempts.push(
      // async submodule => {
        var sub_name = submodule.name()
        var sub_url = submodule.url()
        var sub_path = path + "/" + submodule.path()

        console.log("found submodule: %s at %s", sub_name, sub_url)
        try {
          await cloneRepo(sub_url, sub_path, opt)
        } catch (e) {}
        console.log("successfully cloned %s into %s", sub_name, sub_path)
      // }
    // )
  })

  // await Promise.all(cloneAttempts)
}
