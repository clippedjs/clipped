# Clipped [![npm version](https://badge.fury.io/js/clipped.svg)](https://badge.fury.io/js/clipped) [![GitHub version](https://badge.fury.io/gh/IniZio%2Fusthing-clipped.svg)](https://badge.fury.io/gh/IniZio%2Fusthing-clipped)

There should be the best way to optimization.
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
  - [x] frntend: VueJs
  - [x] backend: Express
- [x] Dev:
  - [x] frontend: webpack-dev-server
  - [x] backend: backpack
- [x] Build (Docker Image):
  - [x] frontend: webpack
  - [x] backend: backpck
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
### Adding Flowtype (only npm clip)
1. In your project folder, install flowtype dependencies:
```sh
npm i --only=dev babel-plugin-transform-flow-strip-types babel-preset-es2015
```
2. Be sure you have the flowconfig. You may copy it from the 'npm' clip
