import {castArray} from 'lodash'
import {exec} from '../utils'

class Task {
  name: string
  callbacks: Function []
  constructor (name: string, callbacks: Function[]) {
    this.name = name
    this.callbacks = callbacks
  }

  modify (operation: Function) {
    this.callbacks = operation(this.callbacks)
  }
}

class Hook {
  name: string
  tasks: Task[]
  constructor (name: string) {
    this.name = name
    this.tasks = []
  }

  task (name: string) {
    return this.tasks.find(task => task.name === name)
  }

  add (name: string, callbacks: Function | Function[], index = Math.max(this.tasks.length, 0)) {
    this.tasks.splice(index, 0, new Task(name, castArray(callbacks)))
    return this
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

export function hookContext (name: string) {
  if (!(this.hooks[name] instanceof Hook)) {
    this._hooks[name] = new Hook(name)
  }

  this[name] = () => this.execHook(name)

  return this.hooks[name]
}

/**
 * execHook - Execute concurrent tasks in sequential hooks, including pre and post
 *
 * @export
 * @param {string} name
 * @param {any[]} args
 *
 */
export async function execHook (name: string, ...args: any) {
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
export function initHook (Clipped: Object) {
  /**
   * @private
   **/
  Clipped.prototype._hooks = {}

  Object.defineProperty(Clipped.prototype, 'hooks', ({
    get: function () { return {...this._hooks} }
  }: Object))

  Clipped.prototype.hook = hookContext

  Clipped.prototype.execHook = execHook

  return Clipped
}
