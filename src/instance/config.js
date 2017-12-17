/**
 * execConfig - Execute project configuration
 *
 * @param {Object} [opt={}]
 *
 * @returns {Object} this instance
 */
async function execConfig (opt: Object = {}) { // eslint-disable-line
  if (this.__initialized__) return this

  // eslint-disable-next-line no-undef
  const script = __non_webpack_require__(this.resolve(opt.configPath || 'clipped.config.js'))
  await this.use(script, opt)

  this.__initialized__ = true
  return this
}

export function initConfig (Clipped: Object) {
  Clipped.prototype.__initialized__ = false

  Clipped.prototype.config = {
    context: process.cwd(),
    src: Clipped.prototype.resolve('src'),
    dist: Clipped.prototype.resolve('dist'),
    dockerTemplate: Clipped.prototype.resolve('docker-template')
  }

  Clipped.prototype.init = execConfig

  return Clipped
}
