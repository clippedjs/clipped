# Docker preset

## Hooks

- `build:docker`: Runs `build` hook then copies from `config.dockerTemplate` to `config.dist`, then builds Docker Image from `config.dist`

## Extensions

- `docker.buildImage`: `(pack, opt) => Promise to build image`
