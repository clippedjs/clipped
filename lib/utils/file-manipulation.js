const {ncp} = require('graceful-ncp')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

module.exports.ncp = (src, dest, opts = {}) =>
  new Promise((resolve, reject) => {
    ncp(src, dest, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

module.exports.rimraf = (f, opts = {}) =>
  new Promise((resolve, reject) => {
    rimraf(f, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

module.exports.mkdirp = (path, opts = {}) =>
  new Promise((resolve, reject) => {
    mkdirp(path, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
