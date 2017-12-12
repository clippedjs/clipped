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

  this[hook] = () => this.execHook(hook)

  return this
}

/**
 * exec - Execute hook, including pre and post hooks
 *
 * @export
 * @param {string} hook
 */
export async function execHook (hook: string, ...args: any) {
  await this.init()

  await promiseSerial(
    [
      ...(this.hooks['pre'] || []),
      ...(this.hooks[`pre:${hook}`] || []),
      ...(this.hooks[hook] || []),
      ...(this.hooks[`post:${hook}`] || []),
      ...(this.hooks['post'] || [])
    ],
    (result, curr) => curr(this, ...args)
  )

  return this
}

/**
 * initHooks - Initialize Clipped hooks properties
 *
 * @param {Object} Clipped
 *
 */
export function initHook (Clipped: Object) {
  /**
   * @private
   **/
  Clipped.prototype._hooks = {}

  Object.defineProperty(Clipped.prototype, 'hooks', ({
    get: function () { return {...this._hooks} }
  }: Object))

  Clipped.prototype.execHook = execHook

  Clipped.prototype.on = addHook

  Clipped.prototype.on('version', clipped => clipped.print(process.env.__VERSION__ || 'Not provided'))

  return Clipped
}
