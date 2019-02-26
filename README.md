[![Clipped](static/clipped-banner.jpg)](https://clippedjs.github.io)

<p align="center">
More than boilerplate :muscle:
</p>

<p align="center">
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square" alt="All Contributors">
  </a>
  <a href="https://badge.fury.io/js/clipped">
    <img src="https://badge.fury.io/js/clipped.svg" alt="npm version">
  </a>
  <a href="https://travis-ci.org/clippedjs/clipped">
    <img src="https://travis-ci.org/clippedjs/clipped.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/clippedjs/clipped.svg" alt="Greenkeeper badge">
  </a>
  <a href="https://codecov.io/gh/clippedjs/clipped">
    <img src="https://codecov.io/gh/clippedjs/clipped/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="XO code style">
  </a>
  <a href="https://usthing.xyz">
    <img src="https://badgen.net/badge/%E2%99%A5/USThing/blue" alt="USThing">
  </a>
</p>

## Requirements
- Node.js >= 8.0.0

## How to use
If you have yarn:
1. `yarn create clipped`

Otherwise:
1. `npm i -g clipped`
2. `clipped create <app-name>`
4. Run `clipped` to see available actions, and use them!

## How it works
Most often our boilerplates are disposable items i.e. we cannot share them across projects. 

For example we use are likely to use similar loaders and plugins across webpack projects, yet we keep having to rewrite them over and over again.

Clipped makes it so configurations are functions of static configurations and dynamic task runners. You can even use existing projects as preset!

You do not have to use Webpack to use Clipped, feel free to contribute to presets like Rollup, Parcel, Fuse-box... :blush:

## How to contribute
```bash
# Clone the repo
git clone git@github.com:clippedjs/clipped.git

# Install dependencies
yarn

# Watch the project
cd packages/clipped && npm run test:watch
```

You are free to make your very own presets and put on your own npm account, but if the preset is for new extensions or build tools, we encourage you to contribute to our presets folder so that others can suffer less as well :smile:


## Credits
Made with code and :heart: by [USThing team](https://github.com/USThing)

Heavily inspired by [mozilla-neutrino](https://github.com/mozilla-neutrino/neutrino-dev)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://twitch.tv/inizio1"><img src="https://avatars1.githubusercontent.com/u/3119725?v=4" width="100px;" alt="IniZio"/><br /><sub><b>IniZio</b></sub></a><br /><a href="https://github.com/inizio/clipped/commits?author=IniZio" title="Code">💻</a></td><td align="center"><a href="https://binarcode.com"><img src="https://avatars2.githubusercontent.com/u/15955045?v=4" width="100px;" alt="Cristi Jora"/><br /><sub><b>Cristi Jora</b></sub></a><br /><a href="https://github.com/inizio/clipped/commits?author=cristijora" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/chihimng"><img src="https://avatars1.githubusercontent.com/u/11769136?v=4" width="100px;" alt="Elliot Ng"/><br /><sub><b>Elliot Ng</b></sub></a><br /><a href="#ideas-chihimng" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
