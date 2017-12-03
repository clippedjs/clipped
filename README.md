# Clipped [![npm version](https://badge.fury.io/js/clipped.svg)](https://badge.fury.io/js/clipped) [![GitHub version](https://badge.fury.io/gh/IniZio%2Fusthing-clipped.svg)](https://badge.fury.io/gh/IniZio%2Fusthing-clipped) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

There should be "the best way" to optimization.
Project configuration should be about options only.

**Clipped handles the `...`**

## How to Install
```sh
npm i -g clipped
```

## Available commands
```sh
npm i -g clipped # Install this module

clipped scaffold --type=nodejs # Scaffold a project

clipped dev # Hot reload the project (both nodejs and frontend)

clipped build # Build project natively

clipped build --platform=docker # Build docker image
```

## Things handled
- [ ] Scaffolding: (eliminates need for devDependencies)
  - [ ] frontend: ReactJs (WIP)
  - [x] frontend: VueJs
  - [x] backend: Express
- [x] Dev:
  - [x] frontend: webpack-dev-server
  - [x] backend: backpack
- [x] Build (Docker Image):
  - [x] frontend: webpack
  - [x] backend: backpack
- [ ] Deploy: Docker push (Planning)

## How to contribute
```bash
# Clone the repo
git clone git@github.com:IniZio/usthing-clipped.git

# Install dependencies
npm i

# Use nodemon to continuously build
npm run dev
```

## Structure
```
.
├── clips
│   ├── frontend # Vuejs
│   │   ├── docker-image
│   │   ├── scaffold
│   │   └── wrapper
│   │── nodejs # Server in Nodejs
│   │   ├── docker-image
│   │   ├── scaffold
│   │   └── wrapper
│   └── npm # NPM module
│       ├── docker-image
│       ├── scaffold
│       └── wrapper
└── src
    ├── actions
    └── utils
```

## FAQ
### Does Clipped suport Flowtype / Typescript ?
Flowtype: :construction: WIP to make it supported on all clips

Typescript: waiting for babel to support Typescript :sleeping:

### Receives error 'the latest libstdc++ is missing on your system!'
On ubuntu:
```sh
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install libstdc++-4.9-dev
```

On Travis:
```
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - libstdc++-4.9-dev
```
