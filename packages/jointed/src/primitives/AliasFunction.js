const autobind = require('auto-bind')

class AliasFunction {
  constructor(func) {
    this.func = func
    this.__jointed__ = true
    this.__aliasfunction__ = true
    autobind(this)
  }

  toJSON() {
    return this.toConfig()
  }

  toConfig() {
    const res = this.func()

    return (res && res.toConfig) ? res.toConfig() : res
  }

  valueOf () {
    return this.toConfig()
  }

  toString () {
    return JSON.stringify(this.toConfig())
  }
}

module.exports = AliasFunction
