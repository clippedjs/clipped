# Clipped

There should be the best way to optimization.
Project configuration should be about options only.

**Clipped handles the `...`**

## How to use
1. Install this module: `npm i -g clipped`
2. Copy from skeleton from examples folder
3. Develop project with `clipped dev`
4. Build Project:
  - Native: `clipped build #--platform=native`
  - Docker: `clipped build --platform=docker`

## Things handled
- [ ] Scaffolding: (eliminates need for devDependencies)(currently in examples/ folder)
  - frontend: ReactJs (WIP), VueJs
  - backend: Express
- [x] Dev:
  - frontend: webpack-dev-server
  - backend: nodemon
- [x] Build (Docker Image):
  - frontend: webpack
  - backend: (currently raw copy)
- [ ] Deploy: Docker push(Planning)

## How to contribute
```bash
# Clone the repo<
git clone git@github.com:IniZio/usthing-clipped.git

# Install dependencies
npm i

# Use nodemon to continuously build
npm run dev

# Try the actions in examples folder
cd examples/frontend
npm run dev
npm run build
```
