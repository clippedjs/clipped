import minimist from 'minimist'
import dev from './actions/dev'
import build from './actions/build'
import scaffold from './actions/scaffold'

const {getConfig} = require('./actions/config')

const actions = {dev, build, scaffold}

/**
 * main - Entry function
 *
 * @async
 * @param {Object} [args={}] Arguments to command
 *
 */
async function main (args: Object = parseArgs()) {
  const {action, opt} = args

  if (Object.keys(actions).includes(action)) {
    try {
      await actions[action]({...getConfig(), ...opt})
    } catch (e) {
      console.error(e)
    }
  } else {
    console.log(`
      Usage:
      $ clipped <action>

      Available actions:
      ${Object.keys(actions).join(', ')}
    `)
  }

  process.exit(0)
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

export default main
