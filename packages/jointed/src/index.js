const {nestChainable} = require('./chains/chainable')
const ParamConstructor = require('./primitives/ParamConstructor')
const KeyArray = require('./primitives/KeyArray')
const ObjectMap = require('./primitives/ObjectMap')
const AliasFunction = require('./primitives/AliasFunction')
const {placeholder} = require('./constants/method-types')

const keysToArr = key => Array.isArray(key) ? key : (key.split ? key.split('.') : [key])

const path = (value, keys) => keysToArr(keys).reduce((acc, k) => {
  const accc = acc && acc[0]
  return (acc.get instanceof Function && acc.get(k) || acc[k]) || (accc && (accc.get instanceof Function && accc.get(k) || accc[k]))
}, value)

function createChainable (instance, markers = [], conditions = []) {
  instance = nestChainable(instance)

  const handler = {
    get (target, key = '') {
      const value = path(target, key)
      const parent = (target, key) => {
        console.log('parent: ', key)
        return path(target, keysToArr(key).slice(0, -1))
      }

      // 1. Property independent methods
      // Return to bookmark
      if (key === 'back') {
        return () => {
          const [secondLast, last] = markers.slice(-2).length >= 2 ? markers.slice(-2) : [undefined, markers.slice(-1)[0]]
          if (!last) throw new Error('Exceed end of bookmark history')

          // If back again then go to second last bookmark
          if (target._id == last._id) {
            return createChainable(secondLast || last, markers.slice(0, -1), conditions)
          }
          // Otherewise return to last bookmark
          return createChainable(last, markers, conditions)
        }
      }

      // Bookmark current node
      if (key === 'mark') {
        return () => createChainable(target, [...markers, target], conditions)
      }

      if (key === '$when') {
        return (criteria, callback) => {conditions.push({criteria, callback})}
      }

      // 2. Override property methods
      if (['toConfig', 'toJSON', 'valueOf'].includes(key)) {
        return () => {
          conditions.forEach(({criteria, callback}) => {criteria() && callback()})
          return (path(target, key) instanceof Function ? path(target, key).apply(target, arguments) : target)
        }
      }

      // Override setter's function
      if (['set', 'prepend', 'append', 'add'].includes(key)) {
        return (k, v, ...args) => {
          parent(target, k)[key](keysToArr(k).slice(-1)[0], createChainable(v, markers, conditions), ...args)
          return createChainable(target, markers, conditions)
        }
      }

      // Override getter's / modifier's function
      if (['delete', 'modify', 'update', 'has'].includes(key)) {
        return (k, ...args) => {
          return createChainable(
            typeof parent(target, k)[key] === 'function'
            ? (parent(target, k)[key](keysToArr(k).slice(-1)[0], ...args) || target)
            : parent(target, k)[key],
            markers,
            conditions
          )
        }
      }

      // 3. Existing properties
      // If property does exist and is not placeholder
      if (value !== undefined && (typeof value.toString !== 'function' || value.toString() !== placeholder.toString())) {
        // If is nested, apply proxy on it
        if (
          (typeof value === 'object' && value !== null)
          || (Array.isArray(value))
        ) {
          return createChainable(value, markers, conditions)
        }

        // HACK: not sure why alias return functions yet even when undefined yet
        if (key === 'alias' && typeof value === 'function') {}

        // If is a method, either return its output value or the intance
        else if (value instanceof Function || typeof value === 'function') {
          return (...args) => {
            const result = value.apply(target, args)
            return result === undefined ? createChainable(target, markers, conditions) : result
          }
        } else {
          return value
        }
      }

      // 4. Property-first methods
      if (key === 'alias') {
        return (k, f) => {
          parent(target, k).set(keysToArr(k).slice(-1)[0], createChainable(new AliasFunction(f), [], conditions))
          return createChainable(target, markers, conditions)
        }
      }

      // adding constructors
      if (key === 'use') {
        return (k, func , parameters = []) => {
          parent(target, k).set(keysToArr(k).slice(-1)[0], createChainable(new ParamConstructor(func, createChainable(parameters, markers, conditions)), markers, conditions))
          return createChainable(target, markers, conditions)
        }
      }

      if (key === 'get') {
        return (k, ...args) => {
          return createChainable(
            typeof parent(target, k)[key] === 'function'
            ? (parent(target, k)[key](keysToArr(k).slice(-1)[0], ...args) || target)
            : parent(target, k)[key],
            markers,
            conditions
          )
        }
      }

      return value
    },
    set (target, key, value) {
      const keyArr = keysToArr(key)

      let finalTarget = path(target, keyArr.slice(0, -1))

      // If target has setter, use it instead
      if (Array.isArray(finalTarget)) {
        finalTarget.forEach(target => {
          if (target.set instanceof Function) {
            target.set(keyArr[keyArr.length - 1], createChainable(value, markers, conditions)) || true
          } else {
            Reflect.set(target, keyArr[keyArr.length - 1], createChainable(value, markers, conditions)) || true
          }
        })
      } else {
        if (finalTarget.set instanceof Function) {
          finalTarget.set(keyArr[keyArr.length - 1], createChainable(value, markers, conditions)) || true
        } else {
          Reflect.set(finalTarget, keyArr[keyArr.length - 1], createChainable(value, markers, conditions)) || true
        }
      }
      return true
    }
  }

  try {
    const proxy = new Proxy(instance, handler)
    return proxy
  } catch (e) {
    return instance
  }
}

module.exports = {createChainable, nestChainable, ParamConstructor, ObjectMap, KeyArray}
