[![Clipped](static/clipped-banner.jpg)](https://clippedjs.github.io)

<p align="center">
Configuration hurts. Clipped makes it once only. :muscle:
</p>

<p align="center">
  <a href="https://badge.fury.io/js/clipped">
    <img src="https://badge.fury.io/js/clipped.svg" alt="npm version">
  </a>
  <a href="https://badge.fury.io/gh/IniZio%2Fusthing-clipped">
    <img src="https://badge.fury.io/gh/IniZio%2Fusthing-clipped.svg" alt="GitHub version">
  </a>
  <a href="https://travis-ci.org/clippedjs/clipped">
    <img src="https://travis-ci.org/clippedjs/clipped.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/clippedjs/clipped.svg" alt="Greenkeeper badge">
  </a>
  <a href="https://codecov.io/gh/clippedjs/clipped">
    <img src="https://codecov.io/gh/clippedjs/clipped/branch/develop/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs">
  </a>
</p>

## Requirements
- NodeJs >= 8.0.0

## How to use
1. `npm i -g clipped`
2. Add a clipped.config.js to your project with content:
```js
module.exports = async clipped => {
  // blablabla...
}
```
3. To use presets, search 'clipped-preset` on [npm website](npmjs.com). Install them as devDependencies and use them:
```js
module.exports = async clipped => {
  clipped.config.name = 'magic' // defaults to 'name' property in package.json
  await clipped.use(require('clipped-preset-some-preset'))
}
```
4. Run `clipped` to see available actions, and use them!

## How it works
Most often our configurations are disposable items i.e. we cannot share them across projects. For example we use are likely to use similar loaders and plugins across webpack projects, yet we keep having to rewrite them over and over again.

Clipped makes it so configurations are functions of static configurations and dynamic task runners. You can even use existing projects as preset!

You do not have to use Webpack to use Clipped, feel free to contribute to presets like Rollup, Parcel, Fuse-box... :blush:

## How to contribute
```bash
# Clone the repo
git clone git@github.com:IniZio/usthing-clipped.git

# Install dependencies
npm i

# Watch the project
npm run dev
```

You are free to make your very own presets and put on your own npm account, but if the preset is for new extensions or build tools, we encourage you to contribute to our presets folder so that others can hurt less as well :smile:

## FAQ

WIP :construction:

## Credits
Made with code and :heart: by [USThing team](https://github.com/USThing)

Heavily inspired by [mozilla-neutrino](https://github.com/mozilla-neutrino/neutrino-dev)
