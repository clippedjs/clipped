const assert = require('assert')
const Clipped = require('../dist').default

describe('hook', function () {
  let clipped = new Clipped()

  beforeEach(function (done) {
    clipped = new Clipped()
    done()
  })

  describe('#add', function () {
    it('should be able to add task to hook', async function () {
      clipped.hook('testing')
        .add('add-task', () => {})

      assert.equal(clipped.hook('testing').task('add-task').callbacks.toString(), [() => {}].toString())
    })
  })

  describe('#delete', function () {
    it('should be able to delete task from hook', async function () {
      clipped.hook('testing')
        .prepend('delete-task', () => {})
        .delete('delete-task')

      assert.equal(clipped._hooks['testing'].tasks.length, [].length)
    })
  })

  describe('#execute', function () {
    it('should be able to execute all tasks in the hook lifecycle', async function () {
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
      assert.equal(accumulator, 7)
    })
  })
})
