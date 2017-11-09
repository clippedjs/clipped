// 
'user strict'

const path = require('path')
const docker = require('dockerode')

const target = process.cwd()
const resolve = dir => path.join(__dirname, dir)

let settings = {}
try {
  settings = require(path.join(target, 'thing.config.js'))
} catch (e) {}
