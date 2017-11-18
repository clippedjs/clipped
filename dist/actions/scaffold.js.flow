const minimist = require('minimist')
const {cwd} = require('../utils')
const {ncp} = require('../utils/file-manipulation')
const {spawnFactory} = require('../utils/process-spawn')
const {getClipPath} = require('./config')

async function scaffold (): Promise<void> {
  const argv: Object = minimist(process.argv, {default: {name: '', type: 'nodejs'}})
  const {type} = argv

  const scaffoldPath = await getClipPath(type, 'scaffold')
  await ncp(scaffoldPath, cwd)
  await spawnFactory('npm', ['install', '--prefix', cwd])

  console.log(`
    Scaffolding is done!
    npm run dev # or npm run build
  `)
}

if (!module.parent) scaffold()

module.exports = scaffold
