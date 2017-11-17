# Clipped

There should be the best way to optimization.
Project configuration should be about options only.

**Clipped handles the `...`**

## How to Install
```bash
npm i -g clipped
```

## Available commands
```bash
npm i -g clipped # Install this module

clipped scaffold --type=nodejs # Scaffold a project

clipped dev # Hot reload the project (both nodejs and frontend)

clipped build # Build project natively

clipped build --platform=docker # Build docker image
```
1. Install this module: `npm i -g clipped`
2. Scaffold project: ``
3. Develop project with `clipped dev`
4. Build Project:
  - Native: `clipped build`
  - Docker: `clipped build --platform=docker`

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
│   ├── frontend
│   │   ├── docker-image
│   │   ├── scaffold
│   │   └── wrapper
│   └── nodejs
│       ├── docker-image
│       ├── scaffold
│       └── wrapper
└── src
    ├── actions
    └── utils
```
