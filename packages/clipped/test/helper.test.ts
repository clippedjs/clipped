import * as path from 'path'
import test from 'ava'
import Clipped from '../src'

const clipped = new Clipped()

test('helper should resolve path from context', t => {
  clipped.config.context = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)

  t.is(clipped.resolve('abc'), path.join(clipped.config.context, 'abc'))
})

test('helper should be able to execute command', async t => {
  const HELLO = 'Hello world'
  const response = await clipped.exec(`echo ${HELLO}`)
  t.is(response.trim(), HELLO) 
})

test('helper should be able to convert object to cli arguments', t => {
  const input = {
    _: ['some', 'option'], // Values in '_' will be appended to the end of the generated argument list
    foo: 'bar',
    hello: true, // Results in only the key being used
    cake: false, // Prepends `no-` before the key
    camelCase: 5, // CamelCase is slugged to `camel-case`
    multiple: ['value', 'value2'] // Converted to multiple arguments
  }

  t.deepEqual(clipped.toArgs(input), [
    '--foo=bar',
    '--hello',
    '--no-cake',
    '--camel-case=5',
    '--multiple=value',
    '--multiple=value2',
    'some',
    'option'
  ])
})

// if (!process.env.CI) {
  test('helper should be able to clone a git repo', async t => {
    await clipped.fs.remove([
      {path: 'test/somewhere'}
    ])
  
    await t.notThrowsAsync(() => clipped.clone('https://github.com/IniZio/placeholder.git', 'test/somewhere'))
  
    await clipped.fs.remove([
      {path: 'test/somewhere'}
    ])
  })
// }
