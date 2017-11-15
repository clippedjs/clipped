// @flow
'user strict'

const spawn = require('cross-spawn')
const {resolvePath} = require('./utils')

const actions = new Set([
  'dev',
  'build'
  // 'deploy'
])

function parseArgs () {
  const action = process.argv[2]

  if (actions.has(action)) {
    const bin: string = resolvePath(`actions/${action}`)
    const args = process.argv.slice(2)

    const proc = spawn(`node`, [bin, ...args], {stdio: 'inherit'})
    proc.on('close', (code) => process.exit(code))
    proc.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
  } else {
    console.log(`
      Usage:
      $ clipped <action>

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
