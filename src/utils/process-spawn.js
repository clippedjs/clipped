import spawn from 'cross-spawn'

/**
 * spawnFactory - Spawn a process
 *
 * @async
 * @param {string}   cmd  Program to run
 * @param {array}  [parameters=[]] Arguments to the program
 * @param {object} [opts={}]
 *
 */
function spawnFactory (
  cmd: string,
  parameters: Array<string> = [],
  opts: Object = {stdio: 'inherit'}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, parameters, opts)
    proc.on('error', err => reject(err))
    proc.on('close', code => resolve(code))
  })
}

export {
  spawnFactory
}
