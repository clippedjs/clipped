export function execMiddleware (middleware: any = () => {}, opt: Object = {}) {
  middleware(this, opt)

  return this
}

export function initMiddleware (Clipped: Object) {
  Clipped.prototype.use = execMiddleware
}
