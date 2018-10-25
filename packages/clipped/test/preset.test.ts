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
