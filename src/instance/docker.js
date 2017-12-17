import {dockerImageFactory} from '../utils/docker'

export async function buildDocker (opt, dockerOpt) {
  return dockerImageFactory(opt, dockerOpt)
}

export function initDocker (Clipped: Object) {
  Clipped.prototype.docker = {
    build: buildDocker
  }
}
