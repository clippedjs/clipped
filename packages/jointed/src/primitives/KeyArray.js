const autobind = require('auto-bind')
const {isPlainObject} = require('lodash')
const uuid = require('uuid')

const methods = require('../constants/method-types')

class KeyArray extends Array {
  constructor () {
    super(...arguments)
    this._id = uuid.v4()
    this.__keyarray__ = true
    this.__jointed__ = true

    this._forEach = this.forEach
    this.forEach = (callback) => {
      this._forEach((el, index) => callback(el.value || el.key || el, index))
    }

    this._map = this.map
    this.map = (callback) => this_.map((el, index) => callback(el.value || el.key || el, index))

    autobind(this)
  }

  get (key) {
    return this.has(key) ? (this[this.getIndex(key)].value || this[this.getIndex(key)]) : null
  }

  has (key) {
    return this.getIndex(key) >= 0
  }

  getIndex (key) {
    return this.findIndex((el = {}) =>
      el.key === key
      || el.value === key
      || el === key
    )
  }

  append () { return this.add.apply(this, arguments) }
  prepend () { return this.add.apply(this, [...arguments, 0]) }

  add (key, value, index = -1) {
    if (index >= 0) {
      this.splice(index, 0, {key})
    } else {
      this.push({key})
    }
    this.set(key, value)
  }

  update () {this.modify.apply(this, arguments)}
  modify (key, callback) {
    this.set(key, callback(this.get(key)))
  }

  set (key, value = key) {
    if (!this.has(key)) {
      this.add(key, value)
    } else {
      this[this.getIndex(key)] = {key, value: (value || key)}
    }
  }

  delete (key) {
    this.splice(this.getIndex(key), 1)
  }

  toJSON () {
    return this.toConfig()
  }

  toConfig () {
    const result = this.reduce((acc, el) => {
      const value = el ? el.value || el.key || el : el

      acc.push(value && value.toConfig
      ? (value.toConfig() ? value.toConfig().value || value.toConfig().key || value.toConfig() : value.toConfig())
      : (value ? value.value || value.key || value : value))

      return acc
    }, [])

    return result
  }

  valueOf () {
    return this.toJSON()
  }

  toString () {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}

Object.keys(methods).map(key => KeyArray.prototype[key] = KeyArray.prototype[key] || methods[key])

module.exports = KeyArray
