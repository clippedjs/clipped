/**
 * initConfig - Initialize configuration
 *
 * @param {Object} Clipped
 *
 */
 export function initConfig (Clipped: Object) {
   // eslint-disable-next-line no-undef
   const packageJson = __non_webpack_require__(Clipped.prototype.resolve('package.json'))

   Clipped.prototype.opt = {}

   Clipped.prototype.config = {
     name: packageJson.name,
     context: Clipped.prototype.opt.context || process.cwd(),
     src: Clipped.prototype.resolve('src'),
     dist: Clipped.prototype.resolve('dist'),
     dockerTemplate: Clipped.prototype.resolve('docker-template'),
     packageJson
   }
 }
