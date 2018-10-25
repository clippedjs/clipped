import {castArray} from 'lodash'

declare module '.' {
  interface Clipped {
    _hooks: {[index: string]: Hook}
    hooks: {[index: string]: Hook}

    hook(name: string): Hook
    execHook(name: string): any
  }
}

import {Clipped} from '.'

class Task {
  name: string
  callbacks: Function []
  constructor (name: string, callbacks: Function[]) {
    this.name = name
    this.callbacks = callbacks
  }
}

class Hook {
  name: string
  tasks: Task[]
  constructor (name: string) {
    this.name = name
    this.tasks = []
  }

  task (name: string): Task | undefined {
    return this.tasks.find(task => task.name === name)
  }

  add (name: string, callbacks: Function | Function[], index = Math.max(this.tasks.length, 0)) {
    this.tasks.splice(index, 0, new Task(name, castArray(callbacks)))
    return this
  }

  modify (name: string, operation: Function) {
    if (this.task(name)) {
      this.task(name)!.callbacks = operation(this.task(name)!.callbacks)
    }
  }

  prepend (name: string, callbacks: Function | Function[]) {
    this.add(name, castArray(callbacks), 0)
    return this
  }

  delete (name: string) {
    this.tasks = this.tasks.filter(task => task.name !== name)
    return this
  }
}

export function hookContext (this: Clipped, name: string) {
  if (!(this.hooks[name] instanceof Hook)) {
    this._hooks[name] = new Hook(name)
  }

  this[name] = () => this.execHook(name)

  return this.hooks[name]
}

/**
 * execHook - Execute concurrent tasks in sequential hooks, including pre and post
 *
 * @param {string} name
 * @param {any[]} args
 *
 */
async function execHook (this: Clipped, name: string, ...args: any[]) {
  for (let hook of ['pre', `pre-${name}`, name, `post-${name}`, 'post']) {
    for (let task of this.hook(hook).tasks) {
      // this.print(`${hook} > ${task.name}`)
      await Promise.all(
        task.callbacks.map(func => func(this, ...args))
      )
    }
    // if (this.hook(hook).tasks.length) this.print(`ended ${hook}`)
  }
  return this
}

/**
 * initHooks - Initialize Clipped hooks properties
 *
 * @param {Object} Clipped
 *
 */
export function initHook (clipped: typeof Clipped) {
  /**
   * @private
   **/
  clipped.prototype._hooks = {}

  Object.defineProperty(clipped.prototype, 'hooks', ({
    get: function () { return {...this._hooks} }
  }))

  clipped.prototype.hook = hookContext

  clipped.prototype.execHook = execHook

  return clipped
}
