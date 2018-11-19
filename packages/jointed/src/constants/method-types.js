const symbol = Symbol('method-type')
const placeholder = () => symbol

module.exports = [
  'alias',
  'add',
  'prepend',
  'append',
  'update',
  'updateOptions',
  'get',
  'set',
  'modify',
  'delete',
  'has',
  'toJSON',
  'toConfig',
  'toString',
  'valueOf'
].reduce((acc = {}, method) => {acc[method] = () => placeholder; return acc}, {})

module.exports.placeholder = placeholder
