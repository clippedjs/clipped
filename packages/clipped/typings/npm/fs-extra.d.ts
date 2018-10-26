declare module 'fs-extra' {
  var fs: {
    copy: Function,
    move: Function,
    remove: Function,
    ensureDir(dir: string): boolean
    emptyDir(dir: string): any
  }
  export = fs
}
