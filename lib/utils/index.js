// 
const path = require('path')

const cwd = process.cwd()

const resolve = (dir = '', parent = path.join(__dirname, '../')) =>
  path.join(parent, dir)

module.exports = {
  cwd,
  resolve
}
