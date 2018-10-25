import {promisify} from 'util'
import * as dargs from 'dargs'

export const toArgs = dargs

export const cwd: string = process.cwd()

/**
 * exec - run shell command as promise
 *
 * @param {string} command
 * @param {any[]} opts
 * @param {Function} callback
 * @returns
 */
export const exec = promisify(
  (command: string, opts: Object, callback: Function) =>
    require('child_process').exec(command, opts, callback)
)

// /**
//  * insertIf - Return element if condition satisfied
//  *
//  * @param {boolean}  condition
//  * @param {any[]} elements
//  *
//  * @returns {any[]} Description
//  */
// export function insertIf (condition: boolean, ...elements: any) {
//   return condition ? elements : []
// }
