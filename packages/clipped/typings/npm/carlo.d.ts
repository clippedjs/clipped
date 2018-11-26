declare module 'carlo' {
  function launch(): {
    exposeFunction(...args: any[]): any,
    load(file: string): any
  }

  export {
    launch
  }
}
