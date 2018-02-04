import fs from 'fs'
import minimist from 'minimist'
import updateNotifier from 'update-notifier'
import cosmic from 'cosmiconfig'
import Clipped from '.'

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

  // Notify update
  try {
    const pkg = __non_webpack_require__('../package.json')
    updateNotifier({pkg}).notify()
  } catch (e) {}

  const config = await cosmic(pkg.name).load()

  // Execute custom preset
  if (config.config) {
    try {
      // eslint-disable-next-line no-undef
      await clipped.use(config.config)
    } catch (e) {
      clipped.print(e)
    }
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
