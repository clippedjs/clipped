import test from 'ava'
import Clipped from '../src'

let clipped: Clipped

test.beforeEach(() => {
  clipped = new Clipped()
})

test('it should be initialized successfully', t => t.true(clipped.__initialized__))

test('it should be able to use other presets', async t => {
  const trial = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)
  await clipped.use(async (clipped: Clipped) => {
    clipped[trial] = true
  })
  t.true(clipped[trial])
})

test('it should be able to merge object preset', async t => {
  const uniq = Symbol()
  await clipped.use({
    abc: uniq
  })
  t.is(clipped.config.abc, uniq)
})

test('it should be able to use v2 preset format', async t => {
  /**
   * e.g. module.exports = [clipped => {}]
   */
  const uniq = Symbol()
  await clipped.use([
    (cl: Clipped) => {
      cl.config.xyz = uniq
    }
  ])
  t.is(clipped.config.xyz, uniq)
})

test('it should be able to handle preset being v2 plugin', async t => {
  /**
   * e.g. module.exports = opt => [clipped => {}]
   */
  const uniq = Symbol()
  await clipped.use(() => [
    (cl: Clipped) => {
      cl.config.xxx = uniq
    }
  ])
  t.is(clipped.config.xxx, uniq)
})

test.only('it should modify config with object return value of plugins', async t => {
  await clipped.use([
    // Plain object
    {webpack: {entry: ['app.js']}, babel: {}},
    // Object returned by preset
    () => ({
      babel: {presets: ['env']}
    }),
    // Object with function properties that mutates config
    {
      babel(cfg: any) {
        cfg.plugins = ['jsx']
      }
    },
    // Function that returns object with function properties that mutates config
    (ci: Clipped) => ({
      webpack: (cfg: any) => {
        cfg.output = {
          library: 'blablabla'
        }
      }
    })
  ])
  clipped.execDefer()
  t.log('and now: ', clipped.config.babel.toConfig())

  t.is(clipped.config.webpack.entry[0], 'app.js')
  t.is(clipped.config.babel.presets[0], 'env')
  t.is(clipped.config.babel.plugins[0], 'jsx')
  t.is(clipped.config.webpack.output.library, 'blablabla')
})
