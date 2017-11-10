// 
'user strict'

const spawn = require('cross-spawn')
const {resolve} = require('./utils')

const actions = new Set([
  'start',
  'build',
  'deploy'
])

function parseArgs () {
  const action = process.argv[2]

  if (actions.has(action)) {
    const bin = resolve(`actions/${action}`)
    const args = process.argv.slice(3)

    const proc = spawn(`node`, [bin, ...args], {stdio: 'inherit'})
    proc.on('close', (code) => process.exit(code))
    proc.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
  } else {
    console.log(`
      Usage:
      $ thing <action>

      Available actions:
      ${Array.from(actions).join(', ')}
    `)
    process.exit(0)
  }
}

if (!module.parent) parseArgs()

module.exports = {
  parseArgs
}
