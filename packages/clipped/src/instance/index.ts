import {initHook} from './hook'
import {initPreset, basePreset} from './preset'
import {initHelper} from './helper'
import {initDefer} from './defer'

export class Clipped {
  _hooks: {[index: string]: Hook} = {}
  _presets: {info: presetInfo, plugin: any}[] = []
  constructor(opt: any = {}) {
    basePreset.call(this, opt)
  }
}

declare module '.' {
  interface Clipped {[index: string]: any} // eslint-disable-line no-undef, typescript/no-use-before-define
}

initHelper(Clipped)
initDefer(Clipped)
initHook(Clipped)
initPreset(Clipped)
