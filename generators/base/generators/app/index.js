const path = require('path')
const Generator = require('yeoman-generator')
const axios = require('axios')

const presetListUrl = 'https://api.github.com/repos/clippedjs/clipped/contents/presets/?ref=master'

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // To make sure resolve template from absolute generator path rather than relative
    this.sourceRoot(path.resolve(__dirname, 'templates'))
  }

  initializing() {
    // Yeoman replaces dashes with spaces. We want dashes.
    this.appname = this.appname.replace(/\s+/g, '-');
  }

  async prompting () {
    const presetChoices = await axios.get(presetListUrl).then(({data}) => data)

    const answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'checkbox',
      name: 'presets',
      message: 'Presets to use',
      choices: [
        ...presetChoices,
        {name: 'skip for now', value: 'none'}
      ]
    }])

    this.projectName = answers.name
    this.clippedPresets = (answers.presets.includes('none') ? [] : answers.presets).map(
      preset => `clipped-preset-${preset}`
    )
  }

  writing () {
    this._copyTpl('_package.json', 'package.json')
    this._copyTpl('_clipped.config.js', 'clipped.config.js')
    this._copy('src/_index.js', 'src/index.js')
  }

  _copy (from, to) {
    this.fs.copy(this.templatePath(from), this.destinationPath(to))
  }

  _copyTpl (from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this)
  }

  install () {
    this.installDependencies({bower: false})
    this.yarnInstall(this.clippedPresets, {dev: true})
  }
}
