// @flow
const path = require('path')

const cwd: string = process.cwd()

const resolve = (dir: string = '', parent: string = path.join(__dirname, '../')): string =>
  path.join(parent, dir)

module.exports = {
  cwd,
  resolve
}
