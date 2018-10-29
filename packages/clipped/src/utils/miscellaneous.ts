import {promisify} from 'util'
import * as childProcess from 'child_process'
import * as dargs from 'dargs'

export const toArgs = dargs

export const cwd: string = process.cwd()

/**
 * Exec - run shell command as promise
 *
 * @param {string} command
 * @param {any[]} opts
 * @returns
 */
export const exec: (command: string, opts?: any) => Promise<any> =
  (command: string, opts: any) => new Promise((resolve, reject) => {
    require('child_process').exec(command, {stdio: 'inherit', ...opts}, (err: any, ...values: any[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(...values)
      }
  })
})

export const spawn = (cmd: string, args: any[], opt?: childProcess.SpawnOptions) => new Promise((resolve, reject) => {
  const [command, ...argss] = [...cmd.split(' '), ...args]
  let stdout = ''
  let stderr = ''
  const cp = childProcess.spawn(command, argss, {stdio: 'inherit', ...opt})
  // process.stdin.pipe(cp.stdin)
  cp.stdout && cp.stdout.on('data', chunk => stdout += chunk)
  cp.stderr && cp.stderr.on('data', chunk => stderr += chunk)
  cp.on('error', reject)
    .on('close', code => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(stderr)
      }
    })
})
