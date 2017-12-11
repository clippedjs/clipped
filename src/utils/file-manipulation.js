const nncp = require('ncp')
const rrimraf = require('rimraf')
const mmkdirp = require('mkdirp')

/**
* ncp - Copy file recursively
*
* @async
* @param {string}   src
* @param {string}   dest
* @param {object} [opts={}]
*
*/
function ncp (src: string, dest: string, opts: Object = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    nncp(src, dest, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

/**
 * rimraf - Remove file recursively
 *
 * @async
 * @param {string}   f         file / folder name
 * @param {object} [opts={}]
 *
 */
function rimraf (f: string, opts: Object = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    rrimraf(f, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

/**
 * mkdirp - Create directory
 *
 * @async
 * @param {string}   path
 * @param {object} [opts={}]
 *
 */
function mkdirp (path: string, opts: Object = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    mmkdirp(path, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

export {
  ncp,
  rimraf,
  mkdirp
}
