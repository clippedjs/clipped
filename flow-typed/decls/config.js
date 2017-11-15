declare type dockerConfig = {
}

declare type buildConfig = {
  docker?: dockerConfig
}

declare type clippedConfig = {
  name?: string,
  type?: 'nodejs' | 'frontend',
  build?: buildConfig
}
