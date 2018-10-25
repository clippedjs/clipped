import * as path from 'path'
import Clipped from '../src/index'
import test from 'ava'

const testSite = path.resolve(__dirname, './site')
const testDefaults = path.resolve(__dirname, '../test/defaults')

const clipped = new Clipped()

test.serial('fs should be able to copy files', async t =>
  await t.notThrowsAsync(() => clipped.fs.copy({src: path.resolve(testSite, 'src.js'), dest: path.resolve(testSite, 'dest.js')}))
)

test.serial('fs should be able to remove file from path', async t =>
  await t.notThrowsAsync(() => clipped.fs.remove([
    {path: path.resolve(testSite, 'dest.js')}
  ]))
)
