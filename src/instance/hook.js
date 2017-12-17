import {castArray} from 'lodash'
import {promiseSerial, exec, filterFromTree} from '../utils'

class Task {
  constructor (name: string, callback: Function) {
    this.name = name
    this.callback = callback
  }
}

class Hook {
  constructor (name: string) {
    this.name = name
    this.tasks = []
  }

  task (name: string) {
    return this.tasks.find(task => task.name === name)
  }

  add (name: string, callback: Function | Function[], index = Math.max(this.tasks.length, 0)) {
    this.tasks.splice(index, 0, castArray(new Task(name, callback)))
    return this
  }

  prepend (name: string, callback: Function | Function[]) {
    this.add(name, castArray(callback), 0)
    return this
  }

  modify (name: string, operation: Function) {
    this.tasks[this.tasks.findIndex(task => task.name === name)] = operation(this.tasks[this.tasks.findIndex(task => task.name === name)])
  }

  delete (name: string) {
    this.tasks = filterFromTree({callback: this.tasks}, 'callback', child => child.name === name).callback
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
 * exec - Execute hook, including pre and post hooks
 *
 * @export
 * @param {string} name
 */
export async function execHook (name: string, ...args: any) {
  // NOTE: to be removed once make clipped factory
  await this.init()

  await promiseSerial(
    [
      ...(this.hook('pre') || {}).tasks,
      ...(this.hook(`pre-${name}`) || {}).tasks,
      ...(this.hook(name) || {}).tasks,
      ...(this.hook(`post-${name}`) || {}).tasks,
      ...(this.hook('post') || {}).tasks
    ].map(task => {
      // Distinguish concurrernt tasks
      switch (task.constructor) {
        case Array:
          return args => Promise.all(task.map(tk => tk.callback(args)))
        default:
          return task.callback
      }
    }),
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

  Clipped.prototype.hook = hookContext

  Clipped.prototype.execHook = execHook

  Clipped.prototype.hook('version')
    .add('default', async clipped => {
      const version = await exec('npm view clipped version')
      clipped.print(version)
    })

  return Clipped
}
