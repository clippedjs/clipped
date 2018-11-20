declare module 'enquirer' {
  interface promptOpt {
    // required
    type: string | Function,
    name: string | Function,
    message: string | Function,

    skip?: boolean | Function,
    autofocus?: string | number,
    initial?: string | Function,
    format?: Function,
    result?: Function,
    stdin?: NodeJS.ReadStream,
    stdout?: NodeJS.WriteStream,
    validate?: Function,
    choices?: {name: string, message: string, value: any}[]
    [index: string]: any
  }

  interface Enquirer {
    (opt: promptOpt | promptOpt[]): Promise<any>,
    on(event: string, cb: Function): any
  }
  export var prompt: Enquirer
}
