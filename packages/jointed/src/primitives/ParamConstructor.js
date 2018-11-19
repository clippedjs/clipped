const autobind = require('auto-bind')
const {isConstructor} = require('../utils')

class ParamConstructor {
  constructor (func, param) {
    this.func = func
    this.args = param
    this.__jointed__ = true
    this.__paramconstructor__ = true
    autobind(this)
  }

  update () {this.modify.apply(this, arguments)}
  modify (key, callback) {
    this.set(key, callback(this[key]))
  }

  set (key, value) {
    this[key] = value
  }

  toJSON() {
    return this.toConfig()
  }

  toConfig () {
    // BUG: does not check if is constructor well
    return (
      isConstructor(this.func)
      ? new this.func(...(this.args.toConfig instanceof Function ? this.args.toConfig() : this.args))
      : this.func.apply(this, (this.args.toConfig instanceof Function ? this.args.toConfig() : this.args))
    )
  }

  valueOf () {
    return this.toJSON()
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }
}

module.exports = ParamConstructor
