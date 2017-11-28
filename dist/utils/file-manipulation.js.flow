// const {ncp} = require('graceful-ncp')
const ncp = require('ncp')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

module.exports.ncp = (src: string, dest: string, opts: Object = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    ncp(src, dest, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

module.exports.rimraf = (f: string, opts: Object = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    rimraf(f, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })

module.exports.mkdirp = (path: string, opts: Object = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    mkdirp(path, opts, err => {
      if (err) reject(err)
      resolve()
    })
  })
