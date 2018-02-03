import path from 'path'
import fs from 'fs-extra'
import {castArray} from 'lodash'
import {cloneRepo, exec, toArgs} from '../utils'

/**
 * resolvePath - Resolve path from cwd
 *
 * @param {string | string[]} dirs
 * @memberof Clipped
 */
export function resolvePath (...dirs: string[]) {
  return path.join((this && this.config && this.config.context) || process.cwd(), ...dirs)
}

// Filesystem manipulations
function operations (callback: Function) {
  return async function (operations: Object | Object[]) {
    await Promise.all(castArray(operations).map(
      operation => callback(operation)
    ))
    return this
  }
}

const fsOperations = {
  copy: operations(({src, dest}) => fs.copy(src, dest)),
  remove: operations(({path}) => fs.remove(path)),
  move: operations(({src, dest, opt = {}}) => fs.move(src, dest, opt)),
  mkdir: operations(({path}) => fs.ensureDir(path)),
  emptydir: operations(({path}) => fs.emptyDir(path)),
  copyTpl: operations(
    ({src, dest, context = clipped, tplOptions = {}, options = {}}) =>
      new Promise((resolve, reject) => {
        const editor = fsEditor.create(memFs.create())
        editor.copyTpl(src, dest, context, tplOptions, options)
        editor.commit(resolve)
      })
  )
}

export function initHelper (Clipped: Object) {
  Clipped.prototype.resolve = resolvePath

  Clipped.prototype.clone = cloneRepo

  Clipped.prototype.exec = exec

  Clipped.prototype.toArgs = toArgs

  Clipped.prototype.fs = fsOperations

  Clipped.prototype.log = console.log

  Clipped.prototype.print = Clipped.prototype.log

  return Clipped
}
