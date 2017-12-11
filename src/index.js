import minimist from 'minimist'
import Clipped from './instance'

/**
 * cli - Entry function
 *
 * @async
 * @param {Object} [args={}] Arguments to command
 *
 */
export async function cli (args: Object = parseArgs()) {
  const {action, opt} = args

  const clipped: Clipped = new Clipped()

  if (Object.keys(clipped.hooks).includes(action)) {
    try { await clipped.execHook(action, opt) } catch (e) { console.error(e) }
  } else {
    console.log(`
      Usage:
      $ clipped <action>

      Available actions:
      ${
        Object.keys(clipped.hooks).filter(hook =>
          !hook.includes('pre') && !hook.includes('post')
        ).join(', ')
      }
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

export default Clipped
