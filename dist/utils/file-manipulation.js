const ncp = require('ncp')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

/**
* ncp - Copy file recursively
*
* @async
* @param {string}   src
* @param {string}   dest
* @param {object} [opts={}]
*
*/
module.exports.ncp = (src, dest, opts = {}) =>
  new Promise((resolve, reject) => {
    ncp(src, dest, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

/**
 * rimraf - Remove file recursively
 *
 * @async
 * @param {string}   f         file / folder name
 * @param {object} [opts={}]
 *
 */
module.exports.rimraf = (f, opts = {}) =>
  new Promise((resolve, reject) => {
    rimraf(f, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

/**
 * mkdirp - Create directory
 *
 * @async
 * @param {string}   path
 * @param {object} [opts={}]
 *
 */
module.exports.mkdirp = (path, opts = {}) =>
  new Promise((resolve, reject) => {
    mkdirp(path, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
