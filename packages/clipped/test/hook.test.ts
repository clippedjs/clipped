import test from "ava";
import Clipped from "../src"

let clipped: Clipped

test.beforeEach(t => {
  clipped = new Clipped()
})

test('Hook should be able to add task to hook', t => {
  clipped.hook('testing')
    .add('add-task', () => 'abc')

  t.is(clipped.hook('testing').task('add-task')!.callbacks[0](), 'abc')
})

test('Hook should be able to modify callback of a task', t => {
  clipped.hook('testing')
    .add('modify-task', () => 'xyz')

  t.is(clipped.hook('testing').task('modify-task')!.callbacks[0](), 'xyz')
  
  clipped.hook('testing')
    .modify('modify-task', () => [() => 'pony'])

    t.is(clipped.hook('testing').task('modify-task')!.callbacks[0](), 'pony')
})

test.serial('Hook should be able to delete task from hook', t => {
  clipped.hook('testing')
    .prepend('delete-task', () => 'qaq')

  t.is(clipped.hook('testing').task('delete-task')!.callbacks[0](), 'qaq')
  
  clipped.hook('testing')
    .delete('delete-task')

  t.log('tasks: ', clipped._hooks.testing.tasks)

  t.is(clipped._hooks.testing.tasks.length, 0)
})
