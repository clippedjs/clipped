interface prompts {
  (opts: {
    type: String | Function,
    name: String | Function,
    message: String | Function,
    initial?: String | Function
    format?: Function,
    onState?: Function
  }): Promise<any>,
  inject(values: {[index: string]: any}): any
}

declare module 'prompts' {
  var prompt: any
  export = prompt
}
