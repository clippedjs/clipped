import {initHook} from './hook'
import {initPreset, basePreset} from './preset'
import {initHelper} from './helper'

function Clipped (opt: Object = {}): clippedInstance {
  if (
    process.env.NODE_ENV !== 'production' &&
    !(this instanceof Clipped)
  ) {
    console.log('Clipped is a constructor and should be called with the `new` keyword')
  }

  basePreset(this, opt)

  return this
}

initHelper(Clipped)
initHook(Clipped)
initPreset(Clipped)

export default Clipped
