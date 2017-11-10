declare type dockerConfig = {
  path: string
}

declare type buildConfig = {
  docker?: dockerConfig
}

declare type thingConfig = {
  name?: string,
  type?: 'nodejs',
  build?: buildConfig
}
