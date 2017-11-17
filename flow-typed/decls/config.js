declare type dockerConfig = {
}

declare type buildConfig = {
  docker?: dockerConfig
}

declare type clippedConfig = {
  name?: string,
  type?: string,
  build?: buildConfig
}
