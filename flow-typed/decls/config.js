declare type dockerConfig = {
}

declare type buildConfig = {
  docker?: dockerConfig
}

declare type thingConfig = {
  name?: string,
  type?: 'nodejs' | 'frontend',
  build?: buildConfig
}
