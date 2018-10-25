import {initHook} from './hook'
import {initPreset, basePreset} from './preset'
import {initHelper} from './helper'

export class Clipped {
  _hooks: {[index: string]: Hook} = {}
  constructor(opt: any = {}) {
    basePreset.call(this, opt)
  }
}

declare module '.' {
  interface Clipped {[index: string]: any} // eslint-disable-line no-undef, typescript/no-use-before-define
}

initHelper(Clipped)
initHook(Clipped)
initPreset(Clipped)
