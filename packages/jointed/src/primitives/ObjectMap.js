const autobind = require('auto-bind')
const uuid = require('uuid')

const methods = require('../constants/method-types')

class ObjectMap extends Map {
  constructor () {
    super(...arguments)
    this._id = uuid.v4()
    this. __objectmap__ = true
    this.__jointed__ = true
    autobind(this)
  }

  forEach(callback) {
    Object.keys(this).forEach(key => {
      callback(this[key])
    })
  }

  map(callback) {
    return Object.keys(this).map(key => {
      callback(this[key])
    })
  }

  add () { this.set.apply(this, arguments) }
  set() {
    super.set(...arguments)
  }

  update () {this.modify.apply(this, arguments)}
  modify (key, callback) {
    this.set(key, callback(this.get(key)))
  }

  delete () {
    super.delete(...arguments)
  }

  toJSON() {
    return this.toConfig()
  }

  toConfig () {
    return Array.from(this).reduce((obj, [key, value]) => (
      Object.assign(obj, {[key]: value && value.toConfig ? value.toConfig() : value})
    ), {})
  }

  valueOf () {
    return this.toJSON()
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }
}

Object.keys(methods).map(key => ObjectMap.prototype[key] = ObjectMap.prototype[key] || methods[key])

module.exports = ObjectMap
