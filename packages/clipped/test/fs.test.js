const path = require('path')
const assert = require('assert')
const Clipped = require('../dist').default

const testSite = path.resolve(__dirname, '../test/site')
const testDefaults = path.resolve(__dirname, '../test/defaults')

describe('fs', async () => {
  let clipped = new Clipped()

  await clipped.fs.copy([
    {src: testDefaults, dest: testSite}
  ])

  beforeEach(done => {
    clipped = new Clipped()
    done()
  })

  describe('#copy', () => {
    it('should be able to copy file from src to dest', async () => {
      await clipped.fs.copy([
        {src: path.resolve(testSite, 'src.js'), dest: path.resolve(testSite, 'dest.js')}
      ])
    })
  })

  describe('#remove', () => {
    it('should be able to remove file from path', async () => {
      await clipped.fs.remove([
        {path: path.resolve(testSite, 'dest.js')}
      ])
    })
  })

  describe('#rmdir', () => {
    it('#should be able to remove directory', async () => {

    })
  })
})
