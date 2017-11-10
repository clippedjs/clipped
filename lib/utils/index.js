// 
const path = require('path')

const cwd = process.cwd()

function resolve (dir = '', parent = path.join(__dirname, '../')) {
  return path.join(parent, dir)
}

module.exports = {
  cwd,
  resolve
}
