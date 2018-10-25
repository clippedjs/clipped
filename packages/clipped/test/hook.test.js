const assert = require('assert')
const Clipped = require('../dist').default

describe('hook', () => {
  let clipped = new Clipped()

  beforeEach(done => {
    clipped = new Clipped()
    done()
  })

  describe('#add', () => {
    it('should be able to add task to hook', async () => {
      clipped.hook('testing')
        .add('add-task', () => 'abc')

      asset.strict.equal(clipped.hook('testing').task('add-task').callbacks[0](), 'abc')
    })
  })

  describe('#modify', () => {
    it('should be able to modify callback of a task', () => {
      clipped.hook('testing')
        .add('modify-task', () => 'xyz')

      clipped.hook('testing')
        .modify('modify-task', callbacks => [() => 'pony'])

      asset.strict.equal(clipped.hook('testing').task('modify-task').callbacks[0](), 'pony')
    })
  })

  describe('#delete', () => {
    it('should be able to delete task from hook', async () => {
      clipped.hook('testing')
        .prepend('delete-task', () => {})
        .delete('delete-task')

      asset.strict.equal(clipped._hooks.testing.tasks.length, [].length)
    })
  })

  describe('#execute', () => {
    it('should be able to execute all tasks in the hook lifecycle', async () => {
      let accumulator = 0
      clipped.hook('pre')
        .add('pre#1', clipped => accumulator++)
      clipped.hook('pre-testing')
        .add('pre-task#1', clipped => accumulator++)
        .add('pre-task#2', [clipped => accumulator++, async clipped => accumulator++])

      clipped.hook('testing')
        .add('task#1', clipped => accumulator++)

      clipped.hook('post-testing')
        .add('post-task#1', clipped => accumulator++)
      clipped.hook('post')
        .add('post#1', clipped => accumulator++)

      await clipped.execHook('testing')
      asset.strict.equal(accumulator, 7)
    })
  })
})
