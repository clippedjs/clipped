import {initConfig} from './config'
import {initHook} from './hook'
import {initLog} from './log'
import {initPreset} from './preset'
import {initHelper} from './helper'

function Clipped (opt: Object = {}) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !(this instanceof Clipped)
  ) {
    console.log('Clipped is a constructor and should be called with the `new` keyword')
  }

  this.opt = opt

  this.use(require('./preset').basePreset)

  return this
}

initHelper(Clipped)
initHook(Clipped)
initLog(Clipped)
initPreset(Clipped)
initConfig(Clipped)

export default Clipped
