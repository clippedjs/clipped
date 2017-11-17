const spawn = require('cross-spawn')

module.exports.spawnFactory = (cmd: string, parameters: Array<string> = [], opts: Object = {stdio: 'inherit'}): Promise<void> =>
  new Promise((resolve, reject) => {
    const proc = spawn(cmd, parameters, opts)
    proc.on('error', err => reject(err))
    proc.on('close', code => resolve(code))
  })
