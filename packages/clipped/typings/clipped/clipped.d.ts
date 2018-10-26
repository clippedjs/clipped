// import {Clipped} from '../../src/instance'

interface Clipped {}

interface Task {
  name: string,
  callbacks: Function []
}

interface Hook {
  name: string
  tasks: Task[]

  task (name: string): Task | undefined
  add (name: string, callbacks: Function | Function[], index?: Number): Clipped
  modify (name: string, operation: Function): Clipped
  prepend (name: string, callbacks: Function | Function[]): Clipped
  delete (name: string): Clipped
}
