declare type dockerConfig = {
}

declare type buildConfig = {
  platform?: string,
  docker?: dockerConfig
}

declare type clippedConfig = {
  name?: string,
  type?: string,
  build?: buildConfig,
  platform?: string
}
