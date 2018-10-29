interface prompt {
  type: String | Function,
  name: String | Function,
  message: String | Function,
  initial?: String | Function
  format?: Function,
  onState?: Function,
  choices?: {title: any, value: any}[]
}

interface prompts {
  (prompts: prompt | prompt[], options?: {[index: string]: any}): Promise<any>,
  inject(values: {[index: string]: any}): any
}

declare module 'prompts' {
  var prompt: any
  export = prompt
}
