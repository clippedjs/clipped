import {promiseSerial} from '../utils'

/**
 * addHook - Add hook into clipped instance
 *
 * @export
 * @param {string} hook
 * @param {Function} callback
 *
 */
export function addHook (hook: string, callback: Function) {
  if (!this._hooks[hook]) this._hooks[hook] = []
  this._hooks[hook].push(callback)

  return this
}

/**
 * exec - Execute hook, including pre and post hooks
 *
 * @export
 * @param {string} hook
 */
export async function execHook (hook: string) {
  await promiseSerial(
    [
      ...(this.hooks['pre'] || []),
      ...(this.hooks[`pre${hook}`] || []),
      ...(this.hooks[hook] || []),
      ...(this.hooks[`post${hook}`] || []),
      ...(this.hooks['post'] || [])
    ],
    (result, curr) => curr(this)
  )

  return this
}

/**
 * getReservedHooks - reserved hooks template
 *
 * @returns {Object} Reserved hooks
 */
function getReservedHooks () {
  return {
    // eslint-disable-next-line no-undef
    version: [clipped => clipped.print(__VERSION__ || 'not provided')]
  }
}

/**
 * initHooks - Initialize Clipped hooks properties
 *
 * @param {Object} Clipped Description
 *
 */
export function initHook (Clipped: Object) {
  /**
   * @private
   **/
  Clipped.prototype._hooks = getReservedHooks()

  Object.defineProperty(Clipped.prototype, 'hooks', ({
    get: function () { return {...this._hooks} }
  }: Object))

  Clipped.prototype.execHook = execHook

  Clipped.prototype.on = addHook

  return Clipped
}
