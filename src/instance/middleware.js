import {isString, isFunction} from 'lodash'

const stockMiddlewares = {}

/**
 * normalizeMiddleware - Normalize normalize to same format
 *
 * @async
 * @param {any} ware
 *
 * @returns {any}
 */
async function normalizeMiddleware (ware: any) {
  const middleware = ware.default || ware
  if (isString(middleware)) { // String i.e. stock
    return stockMiddlewares[middleware]
  } else if (isFunction(middleware)) { // Function
    return middleware
  } else {
    // TODO: also git clone private module if has git property
    return clipped => { clipped.config = {...clipped.config, ...middleware} }
  }
}

export async function execMiddleware (ware: any = () => {}, ...args: any) {
  const middleware = await normalizeMiddleware(ware)

  await middleware(this, ...args)

  return this
}

export function initMiddleware (Clipped: Object) {
  Clipped.prototype.use = execMiddleware
  return Clipped
}
