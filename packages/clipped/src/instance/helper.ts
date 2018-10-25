import * as path from 'path'
import fs from 'fs-extra'
import {castArray} from 'lodash'
import * as fsEditor from 'mem-fs-editor'
import * as memFs from 'mem-fs'
import {cloneRepo, exec, toArgs} from '../utils'

declare module '.' {
  interface Clipped {
    fs: {[index: string]: Function}

    exec(cmd: string, args?: object): Promise<{}>
    print(msg: any): void
  }
}

import {Clipped} from '.'

/**
 * resolvePath - Resolve path from cwd
 *
 * @param {string | string[]} dirs
 * @memberof Clipped
 */
export function resolvePath (this: Clipped, ...dirs: string[]) {
  return path.join((this && this.config && this.config.context) || process.cwd(), ...dirs)
}

// Filesystem manipulations
function operations (callback: Function) {
  return async function (operations: Object | Object[]) {
    await Promise.all(castArray(operations).map(
      operation => callback(operation)
    ))
  }
}

const fsOperations = {
  copy: operations(({src, dest}: {src: string, dest: string}) => fs.copy(src, dest)),
  remove: operations(({path}: {path: string}) => fs.remove(path)),
  move: operations(({src, dest, opt = {}}: {src: string, dest: string, opt: any}) => fs.move(src, dest, opt)),
  mkdir: operations(({path}: {path: string}) => fs.ensureDir(path)),
  emptydir: operations(({path}: {path: string}) => fs.emptyDir(path)),
  copyTpl: operations(
    ({src, dest, context, tplOptions = {}, options = {}, opt = {}}: {src: string, dest: string, context: any, tplOptions: any, options: any, opt: any}) =>
      new Promise((resolve, reject) => {
        const editor = fsEditor.create(memFs.create())
        editor.copyTpl(src, dest, context, tplOptions, {...options, ...opt})
        editor.commit(resolve)
      })
  )
}

const logger = console

export function initHelper (clipped: typeof Clipped) {
  clipped.prototype.resolve = resolvePath

  clipped.prototype.clone = cloneRepo

  clipped.prototype.exec = exec

  clipped.prototype.toArgs = toArgs

  clipped.prototype.fs = fsOperations

  clipped.prototype.logger = logger

  clipped.prototype.log = logger.log

  clipped.prototype.print = console.log

  Object.assign(clipped.prototype, clipped.prototype.fs)

  return Clipped
}
