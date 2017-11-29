const minimist = require('minimist')
const {getConfig} = require('./actions/config')

const actions = new Set([
  // 'help',
  // 'version',
  'dev',
  'build',
  'scaffold'
  // 'deploy'
])

const bins = {}
actions.forEach((action: string) => {
  bins[action] = require(`./actions/${action}`)
})

/**
 * main - Entry function
 *
 * @async
 * @param {Object} [args={}] Arguments to command
 *
 */
async function main (args: Object = parseArgs()) {
  const {action, opt} = args

  if (actions.has(action)) {
    await bins[action]({...getConfig(), ...opt})
  } else {
    console.log(`
      Usage:
      $ clipped <action>

      Available actions:
      ${Array.from(actions).join(', ')}
    `)
  }
}

/**
 * parseArgs - Parse cli arguments
 *
 * @returns {Object} action and options
 */
function parseArgs () {
  const action: string = process.argv[2]
  const opt: Object = minimist(process.argv, {default: {platform: 'native'}})

  return {action, opt}
}

module.exports = main
