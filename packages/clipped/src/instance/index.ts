import {initHook} from './hook'
import {initPreset, basePreset} from './preset'
import {initHelper} from './helper'

export class Clipped {
  constructor(opt: {[index: string]: any} = {}) {
    basePreset.call(this, opt)
  }
}


declare module '.' {
  interface Clipped {[index: string]: any}
}

initHelper(Clipped)
initHook(Clipped)
initPreset(Clipped)
