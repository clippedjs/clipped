import * as minimist from 'minimist'
import * as updateNotifier from 'update-notifier'
import * as cosmic from 'cosmiconfig'
import Clipped from '.'

/**
 * cli - Entry function
 *
 * @async
 * @param {Object} [args={}] Arguments to command
 *
 */
export async function cli (args: {action: string, opt: any} = parseArgs()) {
  const {action, opt} = args

  // Execute project preset
  const clipped = new Clipped(opt)

  const pkg = require('../package.json')

  // Notify update
  try {
    updateNotifier({pkg}).notify()
  } catch (e) {}

  const config = await cosmic('clipped').load('')

  // Execute custom preset
  if (config && config.config) {
    try {
      // eslint-disable-next-line no-undef
      await clipped.use(config.config)
    } catch (e) {
      clipped.print(e)
    }
  }

  if (clipped.hooks[action]) {
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

  return true
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
