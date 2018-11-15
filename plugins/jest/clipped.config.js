const path = require('path')
const jest = require('jest')

module.exports = () => [
  {
    jest: {
      modulePaths: [],
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'radi', 'marko'],
      moduleNameMapper: {},
      transform: {},
      moduleDirectories: ['node_modules', 'bower_components']
    },
    eslint(cfg) {
      cfg.env = {'jest/globals': true}
      cfg.plugins.push('jest')
      Object.assign(cfg.rules, {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error'
      })
    },
    webpack(cfg, api) {
      api.config.jest.moduleNameMapper = {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
      }

      api.config.alias('jest.moduleFileExtensions', () => cfg.resolve.extensions.toConfig().filter(ext => ext !== '*').map(ext => ext.replace('.', '')))
    }
  },
  api => {
    api.hook('pre')
      .add('jest-transformer', api => {
        // Has to use this way because transform has to provide path instead of a function
        process.env.JEST_BABEL_OPTIONS = JSON.stringify(api.config.babel.toConfig())
        api.config.jest.transform = {"^.+\\.(j|t)sx?$": require.resolve('./transformer')}
      })
    api.hook('test:unit').add('jest', async api => {
      await api.editPkg(pkg => {
        pkg.jest = api.config.jest.toConfig()
      })
      return jest.run([])
    })
    api.hook('test:unit:watch').add('jest', async api => {
      await api.editPkg(pkg => {
        pkg.jest = api.config.jest.toConfig()
      })
      return jest.run(['--watch'])
    })
  }
]
