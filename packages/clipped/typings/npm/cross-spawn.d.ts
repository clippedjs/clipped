declare module 'cross-spawn' {
  function spawn(command: string, args?: ReadonlyArray<string> | undefined, options?: any | undefined): import('child_process').ChildProcess
  export = spawn
}
