# :paperclip: Clipped
[![npm version](https://badge.fury.io/js/clipped.svg)](https://badge.fury.io/js/clipped)
[![GitHub version](https://badge.fury.io/gh/IniZio%2Fusthing-clipped.svg)](https://badge.fury.io/gh/IniZio%2Fusthing-clipped)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.org/clippedjs/clipped.svg?branch=master)](https://travis-ci.org/clippedjs/clipped)
[![codecov](https://codecov.io/gh/clippedjs/clipped/branch/develop/graph/badge.svg)](https://codecov.io/gh/clippedjs/clipped)

Configuration hurts :confounded:. Clipped makes it once (or even fun :smirk:).

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
3. To use presets, search 'clipped-preset` on [npm website](npmjs.com). Install them as devDependencies and to use them:
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

You do not have to use Webpack to use Clipped, feel free to contribute to presets like Rollup, Parcel, Fuse-box, Marko.js... :blush:

## How to contribute
```bash
# Clone the repo
git clone git@github.com:IniZio/usthing-clipped.git

# Install dependencies
npm i

# Build the project
clipped build
```

##
You are free to make your very own presets and put on your own npm account, but if the preset is for new extensions or build tools, we encourage to contribute to our presets folder so that others can hurt less :smile:

## FAQ

WIP :construction:

## Credits
Made with code and :heart: by [USThing team](https://github.com/USThing)

Heavily inspired by [mozilla-neutrino](https://github.com/mozilla-neutrino/neutrino-dev)
