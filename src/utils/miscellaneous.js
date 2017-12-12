import path from 'path'
import {isFunction} from 'lodash'
import {promisify} from 'util'

export const cwd: string = process.cwd()

/**
 * resolvePath - Resolve paths
 *
 * @param {string}  [dir=''] Target
 * @param {string} [parent='../'] Parent path
 *
 * @returns {string} Resolved path
 */
export function resolvePath (dir: string = '', parent: string = path.join(__dirname, '../')): string {
  return path.join(parent, dir)
}

/**
 * promiseSerial - Resolve promises sequentially
 *
 * @param {Function} funcs
 * @param {Function} callback
 * @param {any} initial
 * @returns
 */
export function promiseSerial (
  funcs: Function[],
  callback: Function = (result, curr) => curr(result),
  initial: any = () => null
) {
  return funcs.reduce(
    async (acc: any, current, index) => {
      const result = await acc()
      return callback(result, current, index)
    },
    isFunction(initial) ? initial : () => initial
  )
}

/**
 * exec - run shell command as promise
 *
 * @param {string} command
 * @param {any[]} opts
 * @param {Function} callback
 * @returns
 */
export const exec = promisify(
  (command: string, opts, callback) =>
    require('child_process').exec(command, opts, callback)
)

/**
 * insertIf - Return element if condition satisfied
 *
 * @param {boolean}  condition
 * @param {any[]} elements
 *
 * @returns {any[]} Description
 */
export function insertIf (condition: boolean, ...elements: any) {
  return condition ? elements : []
}
