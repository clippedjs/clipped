import fs from 'fs'
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

  // Execute project preset
  const clipped = new Clipped(opt)
  if (fs.existsSync(clipped.resolve('clipped.config.js'))) {
    try {
      // eslint-disable-next-line no-undef
      await clipped.use(__non_webpack_require__(clipped.resolve('clipped.config.js')))
    } catch (e) {
      clipped.print(e)
      process.exit(1)
    }
  } else {
    clipped.print('No clipped.config.js found, using default settings...')
  }

  if (Object.keys(clipped.hooks).includes(action)) {
    try { await clipped.execHook(action) } catch (e) { console.error(e) }
  } else {
    console.log(`
      Usage:
      $ clipped <action>

      Available actions:
      ${
        Object.keys(clipped.hooks)
          .filter(hook =>
            !hook.includes('pre') && !hook.includes('post')
          )
          .join(', ')
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
