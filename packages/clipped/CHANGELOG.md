# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.3.1"></a>
## [2.3.1](https://github.com/clippedjs/clipped/compare/clipped@2.3.0...clipped@2.3.1) (2018-11-12)


### Bug Fixes

* **cli:** config template syntax ([bdbd579](https://github.com/clippedjs/clipped/commit/bdbd579))





<a name="2.3.0"></a>
# [2.3.0](https://github.com/clippedjs/clipped/compare/clipped@2.2.0...clipped@2.3.0) (2018-11-12)


### Features

* **cli:** adds create-clipped with improvements ([#127](https://github.com/clippedjs/clipped/issues/127)) ([38b07ab](https://github.com/clippedjs/clipped/commit/38b07ab))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/clippedjs/clipped/compare/clipped@2.1.5...clipped@2.2.0) (2018-11-12)


### Features

* **defer:** defer config mutation to hook exe ([3c9244d](https://github.com/clippedjs/clipped/commit/3c9244d))
* **eslint:** adds eslint plugin ([#123](https://github.com/clippedjs/clipped/issues/123)) ([c1674ea](https://github.com/clippedjs/clipped/commit/c1674ea)), closes [#122](https://github.com/clippedjs/clipped/issues/122)





<a name="2.1.5"></a>
## [2.1.5](https://github.com/clippedjs/clipped/compare/clipped@2.1.4...clipped@2.1.5) (2018-11-04)


### Bug Fixes

* **spawn:** use cross-spawn and window-specific command ([324ca41](https://github.com/clippedjs/clipped/commit/324ca41))





<a name="2.1.4"></a>
## [2.1.4](https://github.com/clippedjs/clipped/compare/clipped@2.1.4...clipped@2.1.4) (2018-11-04)


### Bug Fixes

* **spawn:** use cross-spawn and window-specific command ([324ca41](https://github.com/clippedjs/clipped/commit/324ca41))





<a name="2.1.4"></a>
## [2.1.4](https://github.com/clippedjs/clipped/compare/clipped@2.1.2...clipped@2.1.4) (2018-11-03)


### Bug Fixes

* **dist:** include dist in publish ([bc9ba8d](https://github.com/clippedjs/clipped/commit/bc9ba8d))





<a name="2.1.2"></a>
## [2.1.2](https://github.com/clippedjs/clipped/compare/clipped@2.1.1...clipped@2.1.2) (2018-11-02)


### Bug Fixes

* **cli:** typo... ([dccc232](https://github.com/clippedjs/clipped/commit/dccc232))





<a name="2.1.1"></a>
## [2.1.1](https://github.com/clippedjs/clipped/compare/clipped@2.1.0...clipped@2.1.1) (2018-11-02)

**Note:** Version bump only for package clipped





<a name="2.1.0"></a>
# [2.1.0](https://github.com/clippedjs/clipped/compare/clipped@1.17.0...clipped@2.1.0) (2018-11-02)


### Bug Fixes

* **cli:** suggest plugins and templates instead of presets ([1758644](https://github.com/clippedjs/clipped/commit/1758644))
* **options:** make options accessible in preset ([54740c2](https://github.com/clippedjs/clipped/commit/54740c2))
* **plugin:** safer preset execution ([f1a63f1](https://github.com/clippedjs/clipped/commit/f1a63f1))
* **plugin:** safer preset execution 2 ([d68eee9](https://github.com/clippedjs/clipped/commit/d68eee9))
* **preset:** enables array-in-array presets ([3468704](https://github.com/clippedjs/clipped/commit/3468704))
* **preset:** ignore primitive return value ([c382dd7](https://github.com/clippedjs/clipped/commit/c382dd7))
* **typings:** wow so i ignored the typings the whole time... ([b67b228](https://github.com/clippedjs/clipped/commit/b67b228))
* **typings:** wrong return type of Hook ([f7564e1](https://github.com/clippedjs/clipped/commit/f7564e1))


### Features

* **generator:** adds 'create' hook to install presets and add config file ([639c1af](https://github.com/clippedjs/clipped/commit/639c1af))
* **plugin:** allows using return value of plugins to modify config ([417a3cb](https://github.com/clippedjs/clipped/commit/417a3cb))
* **plugins:** transform various plugins from presets ([fcc5dc6](https://github.com/clippedjs/clipped/commit/fcc5dc6))
* **preset:** support new preset format ([654450b](https://github.com/clippedjs/clipped/commit/654450b))
* **prompt:** adds prompts as helper function ([3c2c09e](https://github.com/clippedjs/clipped/commit/3c2c09e))
* **verbose:** write json from config ([f26fd6b](https://github.com/clippedjs/clipped/commit/f26fd6b))





<a name="1.17.0"></a>
# 1.17.0 (2018-03-22)


### Bug Fixes

* resolves support for key-value in config array ([8384b29](https://github.com/clippedjs/clipped/commit/8384b29))


### Features

* webpack4 basic preset ([3acec1e](https://github.com/clippedjs/clipped/commit/3acec1e))



<a name="1.15.3"></a>
## 1.15.3 (2018-03-21)


### Bug Fixes

* update jointed for multiple bug fixes ([#88](https://github.com/clippedjs/clipped/issues/88)) ([2aaa0e0](https://github.com/clippedjs/clipped/commit/2aaa0e0))



<a name="1.15.1"></a>
## 1.15.1 (2018-02-15)


### Bug Fixes

* **fs:** Missing dependencies ([#84](https://github.com/clippedjs/clipped/issues/84)) ([b0459ab](https://github.com/clippedjs/clipped/commit/b0459ab))



<a name="1.14.0"></a>
# 1.14.0 (2018-02-10)


### Features

* **preset:** Minify js ([#82](https://github.com/clippedjs/clipped/issues/82)) ([b68a9e3](https://github.com/clippedjs/clipped/commit/b68a9e3))



<a name="1.13.1"></a>
## 1.13.1 (2018-02-09)


### Bug Fixes

* Git pull when fail clone, and yarn install ([#80](https://github.com/clippedjs/clipped/issues/80)) ([c787c64](https://github.com/clippedjs/clipped/commit/c787c64))



<a name="1.13.0"></a>
# 1.13.0 (2018-02-09)


### Features

* Artzlogger for logging ([#79](https://github.com/clippedjs/clipped/issues/79)) ([3364de9](https://github.com/clippedjs/clipped/commit/3364de9))



<a name="1.11.6"></a>
## 1.11.6 (2018-01-31)



<a name="1.11.5"></a>
## 1.11.5 (2018-01-30)


### Bug Fixes

* Babel presets not added in webpack preset ([#62](https://github.com/clippedjs/clipped/issues/62)) ([f33e012](https://github.com/clippedjs/clipped/commit/f33e012))



<a name="1.11.4"></a>
## 1.11.4 (2018-01-30)


### Bug Fixes

* Preset followup ([#56](https://github.com/clippedjs/clipped/issues/56)) ([e05e505](https://github.com/clippedjs/clipped/commit/e05e505))
* remove execa ([#57](https://github.com/clippedjs/clipped/issues/57)) ([9a58216](https://github.com/clippedjs/clipped/commit/9a58216)), closes [#48](https://github.com/clippedjs/clipped/issues/48) [#49](https://github.com/clippedjs/clipped/issues/49)



<a name="1.11.1"></a>
## 1.11.1 (2018-01-29)


### Bug Fixes

* Cannot get array element raw ([#52](https://github.com/clippedjs/clipped/issues/52)) ([04e51cf](https://github.com/clippedjs/clipped/commit/04e51cf))



<a name="1.11.0"></a>
# 1.11.0 (2018-01-29)


### Features

* Support `use` by bumping jointed version ([#51](https://github.com/clippedjs/clipped/issues/51)) ([9899c35](https://github.com/clippedjs/clipped/commit/9899c35))



<a name="1.10.0"></a>
# 1.10.0 (2018-01-28)


### Features

* Make `clipped.config` jointed ([#50](https://github.com/clippedjs/clipped/issues/50)) ([db27db2](https://github.com/clippedjs/clipped/commit/db27db2))



<a name="1.9.2"></a>
## 1.9.2 (2018-01-20)


### Bug Fixes

* Version hook using execa ([#49](https://github.com/clippedjs/clipped/issues/49)) ([dd79131](https://github.com/clippedjs/clipped/commit/dd79131))



<a name="1.9.0"></a>
# 1.9.0 (2018-01-03)


### Bug Fixes

* **clipped:** Fix using absolute path to source-map-support due to lerna ([#36](https://github.com/clippedjs/clipped/issues/36)) ([5b4a8bf](https://github.com/clippedjs/clipped/commit/5b4a8bf))


### Features

* copyTpl with clipped as context ([1f6c03d](https://github.com/clippedjs/clipped/commit/1f6c03d))




<a name="1.16.0"></a>
# 1.16.0 (2018-03-21)


### Features

* webpack4 basic preset ([f490e7c](https://github.com/clippedjs/clipped/commit/f490e7c))



<a name="1.15.3"></a>
## 1.15.3 (2018-03-21)


### Bug Fixes

* update jointed for multiple bug fixes ([#88](https://github.com/clippedjs/clipped/issues/88)) ([2aaa0e0](https://github.com/clippedjs/clipped/commit/2aaa0e0))



<a name="1.15.1"></a>
## 1.15.1 (2018-02-15)


### Bug Fixes

* **fs:** Missing dependencies ([#84](https://github.com/clippedjs/clipped/issues/84)) ([b0459ab](https://github.com/clippedjs/clipped/commit/b0459ab))



<a name="1.14.0"></a>
# 1.14.0 (2018-02-10)


### Features

* **preset:** Minify js ([#82](https://github.com/clippedjs/clipped/issues/82)) ([b68a9e3](https://github.com/clippedjs/clipped/commit/b68a9e3))



<a name="1.13.1"></a>
## 1.13.1 (2018-02-09)


### Bug Fixes

* Git pull when fail clone, and yarn install ([#80](https://github.com/clippedjs/clipped/issues/80)) ([c787c64](https://github.com/clippedjs/clipped/commit/c787c64))



<a name="1.13.0"></a>
# 1.13.0 (2018-02-09)


### Features

* Artzlogger for logging ([#79](https://github.com/clippedjs/clipped/issues/79)) ([3364de9](https://github.com/clippedjs/clipped/commit/3364de9))



<a name="1.11.6"></a>
## 1.11.6 (2018-01-31)



<a name="1.11.5"></a>
## 1.11.5 (2018-01-30)


### Bug Fixes

* Babel presets not added in webpack preset ([#62](https://github.com/clippedjs/clipped/issues/62)) ([f33e012](https://github.com/clippedjs/clipped/commit/f33e012))



<a name="1.11.4"></a>
## 1.11.4 (2018-01-30)


### Bug Fixes

* Preset followup ([#56](https://github.com/clippedjs/clipped/issues/56)) ([e05e505](https://github.com/clippedjs/clipped/commit/e05e505))
* remove execa ([#57](https://github.com/clippedjs/clipped/issues/57)) ([9a58216](https://github.com/clippedjs/clipped/commit/9a58216)), closes [#48](https://github.com/clippedjs/clipped/issues/48) [#49](https://github.com/clippedjs/clipped/issues/49)



<a name="1.11.1"></a>
## 1.11.1 (2018-01-29)


### Bug Fixes

* Cannot get array element raw ([#52](https://github.com/clippedjs/clipped/issues/52)) ([04e51cf](https://github.com/clippedjs/clipped/commit/04e51cf))



<a name="1.11.0"></a>
# 1.11.0 (2018-01-29)


### Features

* Support `use` by bumping jointed version ([#51](https://github.com/clippedjs/clipped/issues/51)) ([9899c35](https://github.com/clippedjs/clipped/commit/9899c35))



<a name="1.10.0"></a>
# 1.10.0 (2018-01-28)


### Features

* Make `clipped.config` jointed ([#50](https://github.com/clippedjs/clipped/issues/50)) ([db27db2](https://github.com/clippedjs/clipped/commit/db27db2))



<a name="1.9.2"></a>
## 1.9.2 (2018-01-20)


### Bug Fixes

* Version hook using execa ([#49](https://github.com/clippedjs/clipped/issues/49)) ([dd79131](https://github.com/clippedjs/clipped/commit/dd79131))



<a name="1.9.0"></a>
# 1.9.0 (2018-01-03)


### Bug Fixes

* **clipped:** Fix using absolute path to source-map-support due to lerna ([#36](https://github.com/clippedjs/clipped/issues/36)) ([5b4a8bf](https://github.com/clippedjs/clipped/commit/5b4a8bf))


### Features

* copyTpl with clipped as context ([1f6c03d](https://github.com/clippedjs/clipped/commit/1f6c03d))




<a name="1.11.6"></a>
## [1.11.6](https://github.com/clippedjs/clipped/compare/v1.11.5...v1.11.6) (2018-01-31)




**Note:** Version bump only for package clipped
