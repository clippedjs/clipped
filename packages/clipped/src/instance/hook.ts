import {castArray} from 'lodash'

import {Clipped} from '.'

declare module '.' {
  interface Clipped {
    _hooks: {[index: string]: Hook}; // eslint-disable-line no-undef, typescript/no-use-before-define
    hooks: {[index: string]: Hook}; // eslint-disable-line no-undef, typescript/no-use-before-define

    hook(name: string): Hook; // eslint-disable-line no-undef, typescript/no-use-before-define
    execHook(name: string): any; // eslint-disable-line no-undef, typescript/no-use-before-define
  }
}

class Tasker implements Task {
  name = '' // eslint-disable-line no-undef

  callbacks: Function [] = [] // eslint-disable-line no-undef

  /**
   * Creates an instance of Task.
   * @param {string} name
   * @param {Function[]} callbacks
   * @memberof Task
   */
  constructor(name: string, callbacks: Function[]) {
    this.name = name
    this.callbacks = callbacks
  }
}

class Hooker implements Hook {
  name = '' // eslint-disable-line no-undef

  tasks: Tasker[] = [] // eslint-disable-line no-undef

  constructor(name: string) {
    this.name = name
    this.tasks = []
  }

  task(name: string): Tasker | undefined {
    return this.tasks.find(task => task.name === name)
  }

  add(name: string, callbacks: Function | Function[], index = Math.max(this.tasks.length, 0)) {
    this.tasks.splice(index, 0, new Tasker(name, castArray(callbacks)))
    return this
  }

  modify(name: string, operation: Function) {
    const task = this.task(name)
    if (task !== undefined) {
      task.callbacks = operation(task.callbacks)
    }
    return this
  }

  prepend(name: string, callbacks: Function | Function[]) {
    this.add(name, castArray(callbacks), 0)
    return this
  }

  delete(name: string) {
    this.tasks = this.tasks.filter(task => task.name !== name)
    return this
  }
}

export function hookContext(this: Clipped, name: string): Hook {
  if (!(this.hooks[name] instanceof Hooker)) {
    this._hooks[name] = new Hooker(name)
  }

  this[name] = () => this.execHook(name)

  return this.hooks[name]
}

/**
 * ExecHook - Execute concurrent tasks in sequential hooks, including pre and post
 *
 * @param {Clipped} this
 * @param {string} name
 * @param {any[]} args
 *
 */
async function execHook(this: Clipped, name: string, ...args: any[]): Promise<Clipped> {
  const callbacks = []
  for (const hook of ['pre', `pre-${name}`, name, `post-${name}`, 'post']) {
    for (const task of this.hook(hook).tasks) {
      callbacks.push(Promise.all(task.callbacks.map(func => func(this, ...args))))
    }
  }
  await Promise.all(callbacks)
  return this
}

/**
 * InitHooks - Initialize Clipped hooks properties
 *
 * @param {Clipped} clipped
 *
 */
export function initHook(clipped: typeof Clipped): void {
  // /**
  //  * @private
  //  **/
  // clipped.prototype._hooks = {}

  Object.defineProperty(clipped.prototype, 'hooks', ({
    get() {
      return {...this._hooks}
    }
  }))

  clipped.prototype.hook = hookContext

  clipped.prototype.execHook = execHook
}
