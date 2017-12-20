import {dockerImageFactory} from '../utils/docker'

export function initDocker (Clipped: Object) {
  Clipped.prototype.docker = {
    build: dockerImageFactory
  }
}
