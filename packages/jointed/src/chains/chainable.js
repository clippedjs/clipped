const {isPlainObject} = require('lodash')
const ObjectMap = require('../primitives/ObjectMap')
const KeyArray = require('../primitives/KeyArray')

function nestChainable (instance) {
  if (!instance || instance.__keyarray__ || instance.__objectmap__ || instance.__jointed__ || instance.__aliasfunction__) return instance

  //  If is array make it keyable
  if (Array.isArray(instance) && !instance.__keyarray__) {
    return new KeyArray(...instance.map(el => (el.key && el.value) ? {key: el.key, value: nestChainable(el.value)} : nestChainable(el)))
  }
  // If is object convert to Map
  if (isPlainObject(instance) && instance !== null && !(instance instanceof Map)) {
    return new ObjectMap(Object.keys(instance).map(k => [k, nestChainable(instance[k])]))
  }
  return instance
}

exports.nestChainable = nestChainable
