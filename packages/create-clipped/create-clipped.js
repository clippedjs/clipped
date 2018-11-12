require('child_process').spawn(
  require('path').resolve(__dirname, './node_modules/.bin/clipped'),
  ['create', ...process.argv.slice(2)],
  {stdio: 'inherit'}
)
