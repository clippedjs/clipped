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
  add (name: string, callbacks: Function | Function[], index?: Number): Hook
  modify (name: string, operation: Function): Hook
  prepend (name: string, callbacks: Function | Function[]): Hook
  delete (name: string): Hook
}

interface presetInfo {
  id: string,
  name: string,
  description: string,
  options: {[index: string]: {
    type: any,
    description: string,
    before: string[],
    after: string[]
  }}
}
