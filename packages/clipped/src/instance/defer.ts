import {isFunction, isPlainObject} from 'lodash'

import {Clipped} from '.'

declare module '.' {
  interface Clipped {
    _defers: Function[] // eslint-disable-line no-undef, typescript/no-use-before-define
    defer(mutator: any): Clipped // eslint-disable-line no-undef, typescript/no-use-before-define
    execDefer(): any
  }
}

function deferConfig(this: Clipped, mutator: any = () => {}): Clipped {
  if (isPlainObject(mutator)) {
    this._defers.push((clipped: Clipped) => {
      Object.keys(mutator).map(key => {
        if (isFunction(mutator[key])) {
          if(clipped.config[key]) mutator[key](clipped.config[key], clipped)
        } else if (isPlainObject(mutator[key])) {
          if (!clipped.config[key]) {
            clipped.config[key] = mutator[key]
          } else {
            Object.assign(clipped.config[key], mutator[key])
          }
        } else {
          clipped.config[key] = mutator[key]
        }
      })
    })
  } else if (isFunction(mutator)) {
    this._defers.push(mutator)
  }
  
  return this
}

function execDefer(this: Clipped): any {
  (this._defers || []).forEach(cb => cb.call(this, this))
  return this.config
}

export function initDefer(clipped: typeof Clipped): void {
  clipped.prototype._defers = []
  
  clipped.prototype.defer = deferConfig
  clipped.prototype.execDefer = execDefer
}
