require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/HenrikJoreteg/extend-object/blob/v0.1.0/extend-object.js

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

module.exports.extend = function(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

module.exports.processArgs = function(opts, callback, defaultOpts) {
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = null;
  }
  return {
    callback: callback,
    opts: module.exports.extend({}, defaultOpts, opts)
  };
};


/**
 * Parse the given repo tag name (as a string) and break it out into repo/tag pair.
 * // if given the input http://localhost:8080/woot:latest
 * {
 *   repository: 'http://localhost:8080/woot',
 *   tag: 'latest'
 * }
 * @param {String} input Input e.g: 'repo/foo', 'ubuntu', 'ubuntu:latest'
 * @return {Object} input parsed into the repo and tag.
 */
module.exports.parseRepositoryTag = function(input) {
  var separatorPos;
  var digestPos = input.indexOf('@');
  var colonPos = input.lastIndexOf(':');
  // @ symbol is more important
  if (digestPos >= 0) {
    separatorPos = digestPos;
  } else if (colonPos >= 0) {
    separatorPos = colonPos;
  } else {
    // no colon nor @
    return {
      repository: input
    };
  }

  // last colon is either the tag (or part of a port designation)
  var tag = input.slice(separatorPos + 1);

  // if it contains a / its not a tag and is part of the url
  if (tag.indexOf('/') === -1) {
    return {
      repository: input.slice(0, separatorPos),
      tag: tag
    };
  }

  return {
    repository: input
  };
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("readable-stream");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cwd", function() { return cwd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvePath", function() { return resolvePath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);


var cwd = process.cwd();

/**
 * resolvePath - Resolve paths
 *
 * @param {string}  [dir=''] Target
 * @param {string} [parent='../'] Parent path
 *
 * @returns {string} Resolved path
 */
function resolvePath() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, '../');

  return __WEBPACK_IMPORTED_MODULE_0_path___default.a.join(parent, dir);
}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(22)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClipPath", function() { return getClipPath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);


/**
 * getClipPath - setup clip and return its path
 *
 * @async
 * @param {string} type
 * @returns {Promise<sting>} Promise to return  path to clip
 */
var getClipPath = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nodejs';
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', resolvePath(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join('./clips/' + type, target)));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getClipPath() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


var merge = __webpack_require__(41);

var _require = __webpack_require__(6),
    cwd = _require.cwd,
    resolvePath = _require.resolvePath;

/**
 * getConfig - Get clipped.config.js of project
 *
 * @returns {thingConfig}
 */


function getConfig() {
  var config = {};
  var packageJSON = {};
  try {
    packageJSON = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
    config = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
  } catch (err) {}
  return merge(packageJSON, config);
}



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable camelcase */

const spawn = __webpack_require__(16)

// cache the install check result
let yarnInstalled

// cache npm version check result
let isNpm5

function getPm({
  respectNpm5
} = {}) {
  return ((respectNpm5 && checkNpmVersion()) || !checkYarnInstalled()) ? 'npm' : 'yarn'
}

// const install = require('yarn-install)
//
// with dependencies
// install(['webpack', 'ava'], {saveDev: true})
// install(['webpack', 'ava'], {save: true})
// install(['webpack', 'ava'], {global: true})
//
// omit dependencies
// it runs npm install or yarn install directly
// install(options)
//
// remove dependencies
// install(['webpack'], {remove: true})
// install(['webpack'], {remove: true, global: true})
module.exports = function (deps, opts) {
  // first argument is not an array
  // then treat it as opts
  if (!Array.isArray(deps)) {
    opts = deps
    deps = null
  }

  opts = opts || {}
  const cwd = opts.cwd
  const stdio = opts.stdio === undefined ? 'inherit' : opts.stdio

  const command = getPm({ respectNpm5: opts.respectNpm5 })

  let args
  if (command === 'yarn') {
    args = getArgs({
      // yarn global
      global: opts.global,
      // yarn add
      add: deps && !opts.remove,
      // yarn install
      install: !deps && !opts.remove,
      // yarn remove
      remove: opts.remove,
      // yarn --dev
      '--dev': opts.dev,
      // yarn --production
      // only install dependencies
      '--production': opts.production
    })
  } else {
    args = getArgs({
      // npm install
      install: !opts.remove,
      // npm uninstall
      uninstall: opts.remove,
      '--save': !opts.dev && !opts.global,
      // npm --save0dev
      '--save-dev': opts.dev,
      // npm --global
      '--global': opts.global,
      // yarn --production
      // only install dependencies
      '--production': opts.production
    })
  }

  if (deps) {
    args = args.concat(deps)
  }

  if (opts.showCommand) {
    console.log('>', command, args.join(' '))
  }

  const result = spawn.sync(command, args, {
    stdio,
    cwd,
    env: getEnv(opts, command === 'yarn')
  })

  // set the error code
  // make sure the same behavior as in yarn and npm
  if (result.status !== 0) process.exitCode = result.status

  return result
}

module.exports.yarnInstalled = yarnInstalled
module.exports.isNpm5 = isNpm5
module.exports.getPm = getPm

function checkYarnInstalled() {
  if (typeof yarnInstalled !== 'undefined') return yarnInstalled

  const command = spawn.sync('yarn', ['--version'])
  const installed = command.stdout && command.stdout.toString().trim()
  yarnInstalled = installed
  return installed
}

function checkNpmVersion() {
  if (typeof isNpm5 !== 'undefined') return isNpm5

  const command = spawn.sync('npm', ['--version'])
  const majorVersion = command.stdout.toString().trim().split('.')[0]
  isNpm5 = majorVersion >= 5
  return isNpm5
}

function getArgs(obj) {
  return Object.keys(obj).filter(name => obj[name])
}

function getEnv(opts, isYarn) {
  const env = Object.assign({}, process.env)
  if (opts.registry) {
    if (isYarn) env.yarn_registry = opts.registry
    else env.npm_config_registry = opts.registry
  }
  return env
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ncp", function() { return ncp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rimraf", function() { return rimraf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mkdirp", function() { return mkdirp; });
var nncp = __webpack_require__(36);
var rrimraf = __webpack_require__(37);
var mmkdirp = __webpack_require__(23);

/**
* ncp - Copy file recursively
*
* @async
* @param {string}   src
* @param {string}   dest
* @param {object} [opts={}]
*
*/
function ncp(src, dest) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Promise(function (resolve, reject) {
    nncp(src, dest, opts, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
}

/**
 * rimraf - Remove file recursively
 *
 * @async
 * @param {string}   f         file / folder name
 * @param {object} [opts={}]
 *
 */
function rimraf(f) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    rrimraf(f, opts, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
}

/**
 * mkdirp - Create directory
 *
 * @async
 * @param {string}   path
 * @param {object} [opts={}]
 *
 */
function mkdirp(path) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    mmkdirp(path, opts, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
}



/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("minimatch");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path-is-absolute");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("lodash/mergeWith");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("lodash/differenceWith");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cross-spawn");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(1)
var rp = __webpack_require__(18)
var minimatch = __webpack_require__(12)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(19)
var EE = __webpack_require__(20).EventEmitter
var path = __webpack_require__(3)
var assert = __webpack_require__(11)
var isAbsolute = __webpack_require__(13)
var globSync = __webpack_require__(39)
var common = __webpack_require__(21)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(40)
var util = __webpack_require__(0)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(7)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(1)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(38)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("inherits");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(3)
var minimatch = __webpack_require__(12)
var isAbsolute = __webpack_require__(13)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spawnFactory", function() { return spawnFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cross_spawn__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cross_spawn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cross_spawn__);


/**
 * spawnFactory - Spawn a process
 *
 * @async
 * @param {string}   cmd  Program to run
 * @param {array}  [parameters=[]] Arguments to the program
 * @param {object} [opts={}]
 *
 */
function spawnFactory(cmd) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { stdio: 'inherit' };

  return new Promise(function (resolve, reject) {
    var proc = __WEBPACK_IMPORTED_MODULE_0_cross_spawn___default()(cmd, parameters, opts);
    proc.on('error', function (err) {
      return reject(err);
    });
    proc.on('close', function (code) {
      return resolve(code);
    });
  });
}



/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("lodash/unionWith");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 26;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var ZEROS = '0000000000000000000'
var SEVENS = '7777777777777777777'
var ZERO_OFFSET = '0'.charCodeAt(0)
var USTAR = 'ustar\x0000'
var MASK = parseInt('7777', 8)

var clamp = function (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

var toType = function (flag) {
  switch (flag) {
    case 0:
      return 'file'
    case 1:
      return 'link'
    case 2:
      return 'symlink'
    case 3:
      return 'character-device'
    case 4:
      return 'block-device'
    case 5:
      return 'directory'
    case 6:
      return 'fifo'
    case 7:
      return 'contiguous-file'
    case 72:
      return 'pax-header'
    case 55:
      return 'pax-global-header'
    case 27:
      return 'gnu-long-link-path'
    case 28:
    case 30:
      return 'gnu-long-path'
  }

  return null
}

var toTypeflag = function (flag) {
  switch (flag) {
    case 'file':
      return 0
    case 'link':
      return 1
    case 'symlink':
      return 2
    case 'character-device':
      return 3
    case 'block-device':
      return 4
    case 'directory':
      return 5
    case 'fifo':
      return 6
    case 'contiguous-file':
      return 7
    case 'pax-header':
      return 72
  }

  return 0
}

var alloc = function (size) {
  var buf = new Buffer(size)
  buf.fill(0)
  return buf
}

var indexOf = function (block, num, offset, end) {
  for (; offset < end; offset++) {
    if (block[offset] === num) return offset
  }
  return end
}

var cksum = function (block) {
  var sum = 8 * 32
  for (var i = 0; i < 148; i++) sum += block[i]
  for (var j = 156; j < 512; j++) sum += block[j]
  return sum
}

var encodeOct = function (val, n) {
  val = val.toString(8)
  if (val.length > n) return SEVENS.slice(0, n) + ' '
  else return ZEROS.slice(0, n - val.length) + val + ' '
}

/* Copied from the node-tar repo and modified to meet
 * tar-stream coding standard.
 *
 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
 */
function parse256 (buf) {
  // first byte MUST be either 80 or FF
  // 80 for positive, FF for 2's comp
  var positive
  if (buf[0] === 0x80) positive = true
  else if (buf[0] === 0xFF) positive = false
  else return null

  // build up a base-256 tuple from the least sig to the highest
  var zero = false
  var tuple = []
  for (var i = buf.length - 1; i > 0; i--) {
    var byte = buf[i]
    if (positive) tuple.push(byte)
    else if (zero && byte === 0) tuple.push(0)
    else if (zero) {
      zero = false
      tuple.push(0x100 - byte)
    } else tuple.push(0xFF - byte)
  }

  var sum = 0
  var l = tuple.length
  for (i = 0; i < l; i++) {
    sum += tuple[i] * Math.pow(256, i)
  }

  return positive ? sum : -1 * sum
}

var decodeOct = function (val, offset, length) {
  val = val.slice(offset, offset + length)
  offset = 0

  // If prefixed with 0x80 then parse as a base-256 integer
  if (val[offset] & 0x80) {
    return parse256(val)
  } else {
    // Older versions of tar can prefix with spaces
    while (offset < val.length && val[offset] === 32) offset++
    var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length)
    while (offset < end && val[offset] === 0) offset++
    if (end === offset) return 0
    return parseInt(val.slice(offset, end).toString(), 8)
  }
}

var decodeStr = function (val, offset, length) {
  return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString()
}

var addLength = function (str) {
  var len = Buffer.byteLength(str)
  var digits = Math.floor(Math.log(len) / Math.log(10)) + 1
  if (len + digits > Math.pow(10, digits)) digits++

  return (len + digits) + str
}

exports.decodeLongPath = function (buf) {
  return decodeStr(buf, 0, buf.length)
}

exports.encodePax = function (opts) { // TODO: encode more stuff in pax
  var result = ''
  if (opts.name) result += addLength(' path=' + opts.name + '\n')
  if (opts.linkname) result += addLength(' linkpath=' + opts.linkname + '\n')
  var pax = opts.pax
  if (pax) {
    for (var key in pax) {
      result += addLength(' ' + key + '=' + pax[key] + '\n')
    }
  }
  return new Buffer(result)
}

exports.decodePax = function (buf) {
  var result = {}

  while (buf.length) {
    var i = 0
    while (i < buf.length && buf[i] !== 32) i++
    var len = parseInt(buf.slice(0, i).toString(), 10)
    if (!len) return result

    var b = buf.slice(i + 1, len - 1).toString()
    var keyIndex = b.indexOf('=')
    if (keyIndex === -1) return result
    result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1)

    buf = buf.slice(len)
  }

  return result
}

exports.encode = function (opts) {
  var buf = alloc(512)
  var name = opts.name
  var prefix = ''

  if (opts.typeflag === 5 && name[name.length - 1] !== '/') name += '/'
  if (Buffer.byteLength(name) !== name.length) return null // utf-8

  while (Buffer.byteLength(name) > 100) {
    var i = name.indexOf('/')
    if (i === -1) return null
    prefix += prefix ? '/' + name.slice(0, i) : name.slice(0, i)
    name = name.slice(i + 1)
  }

  if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null
  if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null

  buf.write(name)
  buf.write(encodeOct(opts.mode & MASK, 6), 100)
  buf.write(encodeOct(opts.uid, 6), 108)
  buf.write(encodeOct(opts.gid, 6), 116)
  buf.write(encodeOct(opts.size, 11), 124)
  buf.write(encodeOct((opts.mtime.getTime() / 1000) | 0, 11), 136)

  buf[156] = ZERO_OFFSET + toTypeflag(opts.type)

  if (opts.linkname) buf.write(opts.linkname, 157)

  buf.write(USTAR, 257)
  if (opts.uname) buf.write(opts.uname, 265)
  if (opts.gname) buf.write(opts.gname, 297)
  buf.write(encodeOct(opts.devmajor || 0, 6), 329)
  buf.write(encodeOct(opts.devminor || 0, 6), 337)

  if (prefix) buf.write(prefix, 345)

  buf.write(encodeOct(cksum(buf), 6), 148)

  return buf
}

exports.decode = function (buf) {
  var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET

  var name = decodeStr(buf, 0, 100)
  var mode = decodeOct(buf, 100, 8)
  var uid = decodeOct(buf, 108, 8)
  var gid = decodeOct(buf, 116, 8)
  var size = decodeOct(buf, 124, 12)
  var mtime = decodeOct(buf, 136, 12)
  var type = toType(typeflag)
  var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100)
  var uname = decodeStr(buf, 265, 32)
  var gname = decodeStr(buf, 297, 32)
  var devmajor = decodeOct(buf, 329, 8)
  var devminor = decodeOct(buf, 337, 8)

  if (buf[345]) name = decodeStr(buf, 345, 155) + '/' + name

  // to support old tar versions that use trailing / to indicate dirs
  if (typeflag === 0 && name && name[name.length - 1] === '/') typeflag = 5

  var c = cksum(buf)

  // checksum is still initial value if header was null.
  if (c === 8 * 32) return null

  // valid checksum
  if (c !== decodeOct(buf, 148, 8)) throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?')

  return {
    name: name,
    mode: mode,
    uid: uid,
    gid: gid,
    size: size,
    mtime: new Date(1000 * mtime),
    type: type,
    linkname: linkname,
    uname: uname,
    gname: gname,
    devmajor: devmajor,
    devminor: devminor
  }
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var once = __webpack_require__(7);

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onclose = function() {
		if (readable && !(rs && rs.ended)) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && ws.ended)) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', callback);
	stream.on('close', onclose);

	return function() {
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', callback);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an Exec
 * @param {Object} modem docker-modem
 * @param {String} id    Exec's ID
 */
var Exec = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Exec.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Start the exec call that was setup.
 *
 * @param {object} options
 * @param {function} callback
 */
Exec.prototype.start = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/exec/' + this.id + '/start',
    method: 'POST',
    isStream: true,
    allowEmpty: true,
    hijack: args.opts.hijack,
    openStdin: args.opts.stdin,
    statusCodes: {
      200: true,
      204: true,
      404: 'no such exec',
      409: 'container stopped/paused',
      500: 'container not running'
    },
    options: args.opts
  };


  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, data);
    });
  }
};

/**
 * Resize the exec call that was setup.
 *
 * @param {object} options
 * @param {function} callback
 */
Exec.prototype.resize = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/exec/' + this.id + '/resize?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'no such exec',
      500: 'container not running'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, data);
    });
  }
};

/**
 * Get low-level information about the exec call.
 *
 * @param {function} callback
 */
Exec.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/exec/' + this.id + '/json',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such exec',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return callback(err, data);
      callback(err, data);
    });
  }
};


module.exports = Exec;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_minimist__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_minimist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_minimist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_dev__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_build__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_scaffold__ = __webpack_require__(90);


var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : parseArgs();
    var action, opt;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            action = args.action, opt = args.opt;

            if (!Object.keys(actions).includes(action)) {
              _context.next = 12;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return actions[action](Object.assign({}, getConfig(), opt));

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](2);

            console.error(_context.t0);

          case 10:
            _context.next = 13;
            break;

          case 12:
            console.log('\n      Usage:\n      $ clipped <action>\n\n      Available actions:\n      ' + Object.keys(actions).join(', ') + '\n    ');

          case 13:

            process.exit(0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 7]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * parseArgs - Parse cli arguments
 *
 * @returns {Object} action and options
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






var _require = __webpack_require__(8),
    getConfig = _require.getConfig;

var actions = { dev: __WEBPACK_IMPORTED_MODULE_2__actions_dev__["a" /* default */], build: __WEBPACK_IMPORTED_MODULE_3__actions_build__["a" /* default */], scaffold: __WEBPACK_IMPORTED_MODULE_4__actions_scaffold__["a" /* default */]

  /**
   * main - Entry function
   *
   * @async
   * @param {Object} [args={}] Arguments to command
   *
   */
};function parseArgs() {
  var action = process.argv[2];
  var opt = __WEBPACK_IMPORTED_MODULE_1_minimist___default()(process.argv, { default: { platform: 'native' } });

  return { action: action, opt: opt };
}

/* harmony default export */ __webpack_exports__["default"] = (main);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("minimist");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_yarn_install__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_yarn_install___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_yarn_install__);


/**
 * dev - Handle dev action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 * @returns {Promise<void>}
 */
var dev = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig();
    var wrapperPath;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return rimraf(resolvePath('./dist', cwd));

          case 2:
            _context.next = 4;
            return mkdirp(resolvePath('./dist', cwd));

          case 4:
            _context.next = 6;
            return getClipPath(config.type, 'wrapper');

          case 6:
            wrapperPath = _context.sent;
            _context.next = 9;
            return __WEBPACK_IMPORTED_MODULE_1_yarn_install___default()({ cwd: wrapperPath });

          case 9:
            _context.next = 11;
            return spawnFactory('npm', ['run', 'dev', '--prefix', wrapperPath, '--', '--env.clippedTarget=' + cwd]);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function dev() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var _require = __webpack_require__(6),
    cwd = _require.cwd,
    resolvePath = _require.resolvePath;

var _require2 = __webpack_require__(10),
    rimraf = _require2.rimraf,
    mkdirp = _require2.mkdirp;

var _require3 = __webpack_require__(24),
    spawnFactory = _require3.spawnFactory;

var _require4 = __webpack_require__(8),
    getConfig = _require4.getConfig,
    getClipPath = _require4.getClipPath;

/* harmony default export */ __webpack_exports__["a"] = (dev);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1),
    path = __webpack_require__(3);

module.exports = ncp;
ncp.ncp = ncp;

function ncp (source, dest, options, callback) {
  var cback = callback;

  if (!callback) {
    cback = options;
    options = {};
  }

  var basePath = process.cwd(),
      currentPath = path.resolve(basePath, source),
      targetPath = path.resolve(basePath, dest),
      filter = options.filter,
      rename = options.rename,
      transform = options.transform,
      clobber = options.clobber !== false,
      modified = options.modified,
      dereference = options.dereference,
      errs = null,
      started = 0,
      finished = 0,
      running = 0,
      limit = options.limit || ncp.limit || 16;

  limit = (limit < 1) ? 1 : (limit > 512) ? 512 : limit;

  startCopy(currentPath);
  
  function startCopy(source) {
    started++;
    if (filter) {
      if (filter instanceof RegExp) {
        if (!filter.test(source)) {
          return cb(true);
        }
      }
      else if (typeof filter === 'function') {
        if (!filter(source)) {
          return cb(true);
        }
      }
    }
    return getStats(source);
  }

  function getStats(source) {
    var stat = dereference ? fs.stat : fs.lstat;
    if (running >= limit) {
      return setImmediate(function () {
        getStats(source);
      });
    }
    running++;
    stat(source, function (err, stats) {
      var item = {};
      if (err) {
        return onError(err);
      }

      // We need to get the mode from the stats object and preserve it.
      item.name = source;
      item.mode = stats.mode;
      item.mtime = stats.mtime; //modified time
      item.atime = stats.atime; //access time

      if (stats.isDirectory()) {
        return onDir(item);
      }
      else if (stats.isFile()) {
        return onFile(item);
      }
      else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source);
      }
    });
  }

  function onFile(file) {
    var target = file.name.replace(currentPath, targetPath);
    if(rename) {
      target =  rename(target);
    }
    isWritable(target, function (writable) {
      if (writable) {
        return copyFile(file, target);
      }
      if(clobber) {
        rmFile(target, function () {
          copyFile(file, target);
        });
      }
      if (modified) {
        var stat = dereference ? fs.stat : fs.lstat;
        stat(target, function(err, stats) {
            //if souce modified time greater to target modified time copy file
            if (file.mtime.getTime()>stats.mtime.getTime())
                copyFile(file, target);
            else return cb();
        });
      }
      else {
        return cb();
      }
    });
  }

  function copyFile(file, target) {
    var readStream = fs.createReadStream(file.name),
        writeStream = fs.createWriteStream(target, { mode: file.mode });
    
    readStream.on('error', onError);
    writeStream.on('error', onError);
    
    if(transform) {
      transform(readStream, writeStream, file);
    } else {
      writeStream.on('open', function() {
        readStream.pipe(writeStream);
      });
    }
    writeStream.once('finish', function() {
        if (modified) {
            //target file modified date sync.
            fs.utimesSync(target, file.atime, file.mtime);
            cb();
        }
        else cb();
    });
  }

  function rmFile(file, done) {
    fs.unlink(file, function (err) {
      if (err) {
        return onError(err);
      }
      return done();
    });
  }

  function onDir(dir) {
    var target = dir.name.replace(currentPath, targetPath);
    isWritable(target, function (writable) {
      if (writable) {
        return mkDir(dir, target);
      }
      copyDir(dir.name);
    });
  }

  function mkDir(dir, target) {
    fs.mkdir(target, dir.mode, function (err) {
      if (err) {
        return onError(err);
      }
      copyDir(dir.name);
    });
  }

  function copyDir(dir) {
    fs.readdir(dir, function (err, items) {
      if (err) {
        return onError(err);
      }
      items.forEach(function (item) {
        startCopy(path.join(dir, item));
      });
      return cb();
    });
  }

  function onLink(link) {
    var target = link.replace(currentPath, targetPath);
    fs.readlink(link, function (err, resolvedPath) {
      if (err) {
        return onError(err);
      }
      checkLink(resolvedPath, target);
    });
  }

  function checkLink(resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath);
    }
    isWritable(target, function (writable) {
      if (writable) {
        return makeLink(resolvedPath, target);
      }
      fs.readlink(target, function (err, targetDest) {
        if (err) {
          return onError(err);
        }
        if (dereference) {
          targetDest = path.resolve(basePath, targetDest);
        }
        if (targetDest === resolvedPath) {
          return cb();
        }
        return rmFile(target, function () {
          makeLink(resolvedPath, target);
        });
      });
    });
  }

  function makeLink(linkPath, target) {
    fs.symlink(linkPath, target, function (err) {
      if (err) {
        return onError(err);
      }
      return cb();
    });
  }

  function isWritable(path, done) {
    fs.lstat(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true);
        return done(false);
      }
      return done(false);
    });
  }

  function onError(err) {
    if (options.stopOnError) {
      return cback(err);
    }
    else if (!errs && options.errs) {
      errs = fs.createWriteStream(options.errs);
    }
    else if (!errs) {
      errs = [];
    }
    if (typeof errs.write === 'undefined') {
      errs.push(err);
    }
    else { 
      errs.write(err.stack + '\n\n');
    }
    return cb();
  }

  function cb(skipped) {
    if (!skipped) running--;
    finished++;
    if ((started === finished) && (running === 0)) {
      if (cback !== undefined ) {
        return errs ? cback(errs) : cback(null);
      }
    }
  }
}




/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __webpack_require__(11)
var path = __webpack_require__(3)
var fs = __webpack_require__(1)
var glob = __webpack_require__(17)
var _0666 = parseInt('666', 8)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, _0666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, _0666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(3);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(1);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(1)
var rp = __webpack_require__(18)
var minimatch = __webpack_require__(12)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(17).Glob
var util = __webpack_require__(0)
var path = __webpack_require__(3)
var assert = __webpack_require__(11)
var isAbsolute = __webpack_require__(13)
var common = __webpack_require__(21)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(22)
var reqs = Object.create(null)
var once = __webpack_require__(7)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _values2 = __webpack_require__(42);

var _values3 = _interopRequireDefault(_values2);

var _unionWith2 = __webpack_require__(25);

var _unionWith3 = _interopRequireDefault(_unionWith2);

var _mergeWith2 = __webpack_require__(14);

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _differenceWith2 = __webpack_require__(15);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _joinArrays = __webpack_require__(43);

var _joinArrays2 = _interopRequireDefault(_joinArrays);

var _joinArraysSmart = __webpack_require__(47);

var _unique = __webpack_require__(49);

var _unique2 = _interopRequireDefault(_unique);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function merge() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  // This supports
  // merge([<object>] | ...<object>)
  // merge({ customizeArray: <fn>, customizeObject: <fn>})([<object>] | ...<object>)
  // where fn = (a, b, key)
  if (sources.length === 1) {
    if (Array.isArray(sources[0])) {
      return _mergeWith3.default.apply(undefined, [{}].concat(_toConsumableArray(sources[0]), [(0, _joinArrays2.default)(sources[0])]));
    }

    if (sources[0].customizeArray || sources[0].customizeObject) {
      return function () {
        for (var _len2 = arguments.length, structures = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          structures[_key2] = arguments[_key2];
        }

        if (Array.isArray(structures[0])) {
          return _mergeWith3.default.apply(undefined, [{}].concat(_toConsumableArray(structures[0]), [(0, _joinArrays2.default)(sources[0])]));
        }

        return _mergeWith3.default.apply(undefined, [{}].concat(structures, [(0, _joinArrays2.default)(sources[0])]));
      };
    }

    return sources[0];
  }

  return _mergeWith3.default.apply(undefined, [{}].concat(sources, [(0, _joinArrays2.default)()]));
}

var mergeSmart = merge({
  customizeArray: function customizeArray(a, b, key) {
    if (isRule(key.split('.').slice(-1)[0])) {
      return (0, _unionWith3.default)(a, b, _joinArraysSmart.uniteRules.bind(null, {}, key));
    }

    return null;
  }
});

var mergeMultiple = function mergeMultiple() {
  for (var _len3 = arguments.length, sources = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    sources[_key3] = arguments[_key3];
  }

  return (0, _values3.default)(merge(sources));
};

// rules: { <field>: <'append'|'prepend'|'replace'> }
// All default to append but you can override here
var mergeStrategy = function mergeStrategy() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return merge({
    customizeArray: _customizeArray(rules),
    customizeObject: customizeObject(rules)
  });
};
var mergeSmartStrategy = function mergeSmartStrategy() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return merge({
    customizeArray: function customizeArray(a, b, key) {
      var topKey = key.split('.').slice(-1)[0];

      if (isRule(topKey)) {
        switch (rules[key]) {
          case 'prepend':
            return [].concat(_toConsumableArray((0, _differenceWith3.default)(b, a, function (newRule, seenRule) {
              return (0, _joinArraysSmart.uniteRules)(rules, key, newRule, seenRule, 'prepend');
            })), _toConsumableArray(a));
          case 'replace':
            return b;
          default:
            // append
            return (0, _unionWith3.default)(a, b, _joinArraysSmart.uniteRules.bind(null, rules, key));
        }
      }

      return _customizeArray(rules)(a, b, key);
    },
    customizeObject: customizeObject(rules)
  });
};

function _customizeArray(rules) {
  return function (a, b, key) {
    switch (rules[key]) {
      case 'prepend':
        return [].concat(_toConsumableArray(b), _toConsumableArray(a));
      case 'replace':
        return b;
      default:
        // append
        return false;
    }
  };
}

function customizeObject(rules) {
  return function (a, b, key) {
    switch (rules[key]) {
      case 'prepend':
        return (0, _mergeWith3.default)({}, b, a, (0, _joinArrays2.default)());
      case 'replace':
        return b;
      default:
        // append
        return false;
    }
  };
}

function isRule(key) {
  return ['preLoaders', 'loaders', 'postLoaders', 'rules'].indexOf(key) >= 0;
}

module.exports = merge;
module.exports.multiple = mergeMultiple;
module.exports.smart = mergeSmart;
module.exports.strategy = mergeStrategy;
module.exports.smartStrategy = mergeSmartStrategy;
module.exports.unique = _unique2.default;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("lodash/values");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeWith2 = __webpack_require__(14);

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _isPlainObject2 = __webpack_require__(44);

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isFunction2 = __webpack_require__(45);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _cloneDeep2 = __webpack_require__(46);

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

exports.default = joinArrays;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = Array.isArray;

function joinArrays() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      customizeArray = _ref.customizeArray,
      customizeObject = _ref.customizeObject,
      key = _ref.key;

  return function _joinArrays(a, b, k) {
    var newKey = key ? key + '.' + k : k;

    if ((0, _isFunction3.default)(a) && (0, _isFunction3.default)(b)) {
      return function () {
        return _joinArrays(a.apply(undefined, arguments), b.apply(undefined, arguments), k);
      };
    }
    if (isArray(a) && isArray(b)) {
      var customResult = customizeArray && customizeArray(a, b, newKey);

      return customResult || [].concat(_toConsumableArray(a), _toConsumableArray(b));
    }

    if ((0, _isPlainObject3.default)(a) && (0, _isPlainObject3.default)(b)) {
      var _customResult = customizeObject && customizeObject(a, b, newKey);

      return _customResult || (0, _mergeWith3.default)({}, a, b, joinArrays({
        customizeArray: customizeArray,
        customizeObject: customizeObject,
        key: newKey
      }));
    }

    if ((0, _isPlainObject3.default)(b)) {
      return (0, _cloneDeep3.default)(b);
    }

    return b;
  };
}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("lodash/cloneDeep");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniteEntries = exports.uniteRules = undefined;

var _differenceWith2 = __webpack_require__(15);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _unionWith2 = __webpack_require__(25);

var _unionWith3 = _interopRequireDefault(_unionWith2);

var _mergeWith2 = __webpack_require__(14);

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _isEqual2 = __webpack_require__(48);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = Array.isArray;

function uniteRules(rules, key, newRule, rule) {
  if (String(rule.test) !== String(newRule.test) || (newRule.enforce || rule.enforce) && rule.enforce !== newRule.enforce || newRule.include && !isSameValue(rule.include, newRule.include) || newRule.exclude && !isSameValue(rule.exclude, newRule.exclude)) {
    return false;
  } else if (!rule.test && !rule.include && !rule.exclude && (rule.loader && rule.loader.split('?')[0]) !== (newRule.loader && newRule.loader.split('?')[0])) {
    // Don't merge the rule if there isn't any identifying fields and the loaders don't match
    return false;
  } else if ((rule.include || rule.exclude) && !newRule.include && !newRule.exclude) {
    // Don't merge child without include/exclude to parent that has either
    return false;
  }

  // newRule.loader should always override
  if (newRule.loader) {
    var optionsKey = newRule.options ? 'options' : newRule.query && 'query';

    delete rule.use;
    delete rule.loaders;
    rule.loader = newRule.loader;

    if (optionsKey) {
      rule[optionsKey] = newRule[optionsKey];
    }
  } else if ((rule.use || rule.loaders || rule.loader) && (newRule.use || newRule.loaders)) {
    var expandEntry = function expandEntry(loader) {
      return typeof loader === 'string' ? { loader: loader } : loader;
    };
    // this is only here to avoid breaking existing tests
    var unwrapEntry = function unwrapEntry(entry) {
      return !entry.options && !entry.query ? entry.loader : entry;
    };

    var entries = void 0;
    if (rule.loader) {
      var _optionsKey = rule.options ? 'options' : rule.query && 'query';
      entries = [{ loader: rule.loader }];

      if (_optionsKey) {
        entries[0][_optionsKey] = rule[_optionsKey];
      }

      delete rule.loader;

      if (_optionsKey) {
        delete rule[_optionsKey];
      }
    } else {
      entries = [].concat(rule.use || rule.loaders).map(expandEntry);
    }
    var newEntries = [].concat(newRule.use || newRule.loaders).map(expandEntry);

    var loadersKey = rule.use || newRule.use ? 'use' : 'loaders';
    var resolvedKey = key + '.' + loadersKey;

    switch (rules[resolvedKey]) {
      case 'prepend':
        rule[loadersKey] = [].concat(_toConsumableArray((0, _differenceWith3.default)(newEntries, entries, uniteEntries)), _toConsumableArray(entries)).map(unwrapEntry);
        break;
      case 'replace':
        rule[loadersKey] = newRule.use || newRule.loaders;
        break;
      default:
        rule[loadersKey] = (0, _unionWith3.default)(
        // Remove existing entries so that we can respect the order of the new
        // entries
        (0, _differenceWith3.default)(entries, newEntries, _isEqual3.default), newEntries, uniteEntries).map(unwrapEntry);
    }
  }

  if (newRule.include) {
    rule.include = newRule.include;
  }

  if (newRule.exclude) {
    rule.exclude = newRule.exclude;
  }

  return true;
}

/**
 * Check equality of two values using lodash's isEqual
 * Arrays need to be sorted for equality checking
 * but clone them first so as not to disrupt the sort order in tests
 */
function isSameValue(a, b) {
  var _map = [a, b].map(function (value) {
    return isArray(value) ? [].concat(_toConsumableArray(value)).sort() : value;
  }),
      _map2 = _slicedToArray(_map, 2),
      propA = _map2[0],
      propB = _map2[1];

  return (0, _isEqual3.default)(propA, propB);
}

function uniteEntries(newEntry, entry) {
  var loaderNameRe = /^([^?]+)/ig;

  var _entry$loader$match = entry.loader.match(loaderNameRe),
      _entry$loader$match2 = _slicedToArray(_entry$loader$match, 1),
      loaderName = _entry$loader$match2[0];

  var _newEntry$loader$matc = newEntry.loader.match(loaderNameRe),
      _newEntry$loader$matc2 = _slicedToArray(_newEntry$loader$matc, 1),
      newLoaderName = _newEntry$loader$matc2[0];

  if (loaderName !== newLoaderName) {
    return false;
  }

  // Replace query values with newer ones
  (0, _mergeWith3.default)(entry, newEntry);
  return true;
}

exports.uniteRules = uniteRules;
exports.uniteEntries = uniteEntries;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _differenceWith2 = __webpack_require__(15);

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function mergeUnique(key, uniques) {
  var getter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a) {
    return a;
  };

  return function (a, b, k) {
    return k === key && [].concat(_toConsumableArray(a), _toConsumableArray((0, _differenceWith3.default)(b, a, function (item) {
      return uniques.indexOf(getter(item)) >= 0;
    })));
  };
}

exports.default = mergeUnique;

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);


/**
 * docker - Builds docker image from dist folder
 *
 * @async
 * @param {clippedConfig} [config={}]
 * @returns {Promise<void>}
 */
var docker = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig();
    var srcDockerImage, dockerImageDest, files;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getClipPath(config.type, 'docker-image');

          case 2:
            srcDockerImage = _context.sent;
            dockerImageDest = resolvePath('dist', cwd);


            console.log('> Preparing Dockerfile');
            _context.next = 7;
            return ncp(srcDockerImage, dockerImageDest);

          case 7:

            console.log('> Start building image');
            files = __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readdirSync(dockerImageDest);
            // const tarStream = tar.pack(resolvePath('dist', cwd))

            _context.next = 11;
            return dockerImageFactory(
            // tarStream,
            {
              context: resolvePath('dist', cwd),
              src: files
            }, {
              // NOTE: dockerode does not seem to support custom dockerfile in options?
              // f: srcDockerfile,
              t: config.name
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function docker() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * native - Builds dist folder from src folder
 *
 * @async
 * @param {clippedConfig} [config={}]
 * @returns {Promise<void>}
 */


var native = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig();
    var wrapperPath;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return rimraf(resolvePath('./dist', cwd));

          case 2:
            _context2.next = 4;
            return mkdirp(resolvePath('./dist', cwd));

          case 4:
            _context2.next = 6;
            return getClipPath(config.type, 'wrapper');

          case 6:
            wrapperPath = _context2.sent;
            _context2.next = 9;
            return yarnInstall({ cwd: wrapperPath });

          case 9:
            _context2.next = 11;
            return spawnFactory('npm', ['run', 'build', '--prefix', wrapperPath, '--', '--env.clippedTarget=' + cwd], { stdio: 'inherit', 'NODE_ENV': 'production' });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function native() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * build - Build action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 */


var build = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig();
    var platforms;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // Make sure each platform only build once
            platforms = [].concat(_toConsumableArray(new Set([].concat(config.platform || 'native'))));
            _context4.next = 3;
            return Promise.all(platforms.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(platform) {
                return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = platform;
                        _context3.next = _context3.t0 === 'docker' ? 3 : _context3.t0 === 'native' ? 8 : 11;
                        break;

                      case 3:
                        _context3.next = 5;
                        return native(config);

                      case 5:
                        _context3.next = 7;
                        return docker(config);

                      case 7:
                        return _context3.abrupt('break', 11);

                      case 8:
                        _context3.next = 10;
                        return native(config);

                      case 10:
                        return _context3.abrupt('break', 11);

                      case 11:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function build() {
    return _ref3.apply(this, arguments);
  };
}();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


var yarnInstall = __webpack_require__(9);

var _require = __webpack_require__(6),
    cwd = _require.cwd,
    resolvePath = _require.resolvePath;

var _require2 = __webpack_require__(10),
    ncp = _require2.ncp,
    rimraf = _require2.rimraf,
    mkdirp = _require2.mkdirp;

var _require3 = __webpack_require__(24),
    spawnFactory = _require3.spawnFactory;

var _require4 = __webpack_require__(51),
    dockerImageFactory = _require4.dockerImageFactory;

var _require5 = __webpack_require__(8),
    getConfig = _require5.getConfig,
    getClipPath = _require5.getClipPath;

/* harmony default export */ __webpack_exports__["a"] = (build);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dockerImageFactory", function() { return dockerImageFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dockerode__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dockerode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dockerode__);


/**
 * dockerImageFactory - Docker image generator
 *
 * @async
 * @param {type} pack
 * @param {Object} [opts={}]
 *
 */
function dockerImageFactory(pack) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    var docker = new __WEBPACK_IMPORTED_MODULE_0_dockerode___default.a();
    docker.buildImage(pack, opts, function (err, output) {
      if (err) reject(err);
      if (output) {
        output.pipe(process.stdout, { end: true });
        output.on('end', function () {
          return resolve();
        });
      }
    });
  });
}



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(20).EventEmitter,
  Modem = __webpack_require__(53),
  tar = __webpack_require__(66),
  zlib = __webpack_require__(77),
  fs = __webpack_require__(1),
  concat = __webpack_require__(78),
  path = __webpack_require__(3),
  Container = __webpack_require__(80),
  Image = __webpack_require__(81),
  Volume = __webpack_require__(82),
  Network = __webpack_require__(83),
  Service = __webpack_require__(84),
  Plugin = __webpack_require__(85),
  Secret = __webpack_require__(86),
  Config = __webpack_require__(87),
  Task = __webpack_require__(88),
  Node = __webpack_require__(89),
  Exec = __webpack_require__(31),
  util = __webpack_require__(2),
  extend = util.extend;

var Docker = function(opts) {
  if (!(this instanceof Docker)) return new Docker(opts);

  var plibrary = global.Promise;

  if (opts && opts.Promise) {
    plibrary = opts.Promise;

    if (Object.keys(opts).length === 1) {
      opts = undefined;
    }
  }

  this.modem = new Modem(opts);
  this.modem.Promise = plibrary;
};

/**
 * Creates a new container
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createContainer = function(opts, callback) {
  var self = this;
  var optsf = {
    path: '/containers/create?',
    method: 'POST',
    options: opts,
    authconfig: opts.authconfig,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      404: 'no such container',
      406: 'impossible to attach',
      500: 'server error'
    }
  };

  delete opts.authconfig;

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getContainer(data.Id));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return callback(err, data);
      callback(err, self.getContainer(data.Id));
    });
  }
};

/**
 * Creates a new image
 * @param {Object}   auth     Authentication (optional)
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createImage = function(auth, opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = auth;
    auth = opts.authconfig || undefined;
  } else if (!callback && !opts) {
    opts = auth;
    auth = opts.authconfig;
  }

  var optsf = {
    path: '/images/create?',
    method: 'POST',
    options: opts,
    authconfig: auth,
    isStream: true,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Load image
 * @param {String}   file     File
 * @param {Object}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.loadImage = function(file, opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  var optsf = {
    path: '/images/load?',
    method: 'POST',
    options: opts,
    file: file,
    isStream: true,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Import image from a tar archive
 * @param {String}   file     File
 * @param {Object}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.importImage = function(file, opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts.fromSrc = '-';

  var optsf = {
    path: '/images/create?',
    method: 'POST',
    options: opts,
    file: file,
    isStream: true,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Verifies auth
 * @param {Object}   opts     Options
 * @param {Function} callback Callback
 */
Docker.prototype.checkAuth = function(opts, callback) {
  var self = this;
  var optsf = {
    path: '/auth',
    method: 'POST',
    options: opts,
    statusCodes: {
      200: true,
      204: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Builds an image
 * @param {String}   file     File
 * @param {Object}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.buildImage = function(file, opts, callback) {
  var self = this;
  var pack = tar.pack();
  var content;

  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  function build(file) {
    var optsf = {
      path: '/build?',
      method: 'POST',
      file: file,
      options: opts,
      isStream: true,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    };

    if (opts) {
      if (opts.registryconfig) {
        optsf.registryconfig = optsf.options.registryconfig;
        delete optsf.options.registryconfig;
      }

      //undocumented?
      if (opts.authconfig) {
        optsf.authconfig = optsf.options.authconfig;
        delete optsf.options.authconfig;
      }
    }

    if (callback === undefined) {
      return new self.modem.Promise(function(resolve, reject) {
        self.modem.dial(optsf, function(err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    } else {
      self.modem.dial(optsf, function(err, data) {
        callback(err, data);
      });
    }
  }

  if (file && file.context) {
    file.src.forEach(function(filePath) {
      content = fs.readFileSync(path.join(file.context, filePath));
      pack.entry({
        name: filePath
      }, content);
    });
    pack.finalize();
    return build(pack.pipe(zlib.createGzip()));
  } else {
    return build(file);
  }
};

/**
 * Fetches a Container by ID
 * @param {String} id Container's ID
 */
Docker.prototype.getContainer = function(id) {
  return new Container(this.modem, id);
};

/**
 * Fetches an Image by name
 * @param {String} name Image's name
 */
Docker.prototype.getImage = function(name) {
  return new Image(this.modem, name);
};

/**
 * Fetches a Volume by name
 * @param {String} name Volume's name
 */
Docker.prototype.getVolume = function(name) {
  return new Volume(this.modem, name);
};

/**
 * Fetches a Plugin by name
 * @param {String} name Volume's name
 */
Docker.prototype.getPlugin = function(name, remote) {
  return new Plugin(this.modem, name, remote);
};

/**
 * Fetches a Service by id
 * @param {String} id Services's id
 */
Docker.prototype.getService = function(id) {
  return new Service(this.modem, id);
};

/**
 * Fetches a Task by id
 * @param {String} id Task's id
 */
Docker.prototype.getTask = function(id) {
  return new Task(this.modem, id);
};

/**
 * Fetches Node by id
 * @param {String} id Node's id
 */
Docker.prototype.getNode = function(id) {
  return new Node(this.modem, id);
};

/**
 * Fetches a Network by id
 * @param {String} id network's id
 */
Docker.prototype.getNetwork = function(id) {
  return new Network(this.modem, id);
};

/**
 * Fetches a Secret by id
 * @param {String} id network's id
 */
Docker.prototype.getSecret = function(id) {
  return new Secret(this.modem, id);
};

/**
 * Fetches a Config by id
 * @param {String} id network's id
 */
Docker.prototype.getConfig = function(id) {
  return new Config(this.modem, id);
};

/**
 * Fetches an Exec instance by ID
 * @param {String} id Exec instance's ID
 */
Docker.prototype.getExec = function(id) {
  return new Exec(this.modem, id);
};

/**
 * Lists containers
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.listContainers = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/json?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      400: 'bad parameter',
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Lists images
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.listImages = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/images/json?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      400: 'bad parameter',
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Lists Services
 * @param {Function} callback Callback
 */
Docker.prototype.listServices = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/services?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Lists Nodes
 * @param {Function} callback Callback
 */
Docker.prototype.listNodes = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/nodes?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      400: 'bad parameter',
      404: 'no such node',
      500: 'server error',
      503: 'node is not part of a swarm',
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Lists Tasks
 * @param {Function} callback Callback
 */
Docker.prototype.listTasks = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/tasks?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Creates a new secret
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createSecret = function(opts, callback) {
  var args = util.processArgs(opts, callback);
  var self = this;
  var optsf = {
    path: '/secrets/create?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      406: 'server error or node is not part of a swarm',
      409: 'name conflicts with an existing object',
      500: 'server error'
    }
  };


  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getSecret(data.ID));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, self.getSecret(data.ID));
    });
  }
};


/**
 * Creates a new config
 * @param {Object}   opts     Config options
 * @param {Function} callback Callback
 */
Docker.prototype.createConfig = function(opts, callback) {
  var args = util.processArgs(opts, callback);
  var self = this;
  var optsf = {
    path: '/configs/create?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      406: 'server error or node is not part of a swarm',
      409: 'name conflicts with an existing object',
      500: 'server error'
    }
  };


  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getConfig(data.ID));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, self.getConfig(data.ID));
    });
  }
};


/**
 * Lists secrets
 * @param {Function} callback Callback
 */
Docker.prototype.listSecrets = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/secrets?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Lists configs
 * @param {Function} callback Callback
 */
Docker.prototype.listConfigs = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/configs?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Creates a new plugin
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createPlugin = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);
  var optsf = {
    path: '/plugins/create?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      500: 'server error'
    }
  };


  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getPlugin(args.opts.name));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, self.getPlugin(args.opts.name));
    });
  }
};


/**
 * Lists plugins
 * @param {Function} callback Callback
 */
Docker.prototype.listPlugins = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Prune images
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.pruneImages = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/images/prune?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Prune containers
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.pruneContainers = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/prune?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Prune volumes
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.pruneVolumes = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/volumes/prune?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Prune networks
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.pruneNetworks = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/networks/prune?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Creates a new volume
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createVolume = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);
  var optsf = {
    path: '/volumes/create?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      500: 'server error'
    }
  };


  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getVolume(data.Name));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, self.getVolume(data.Name));
    });
  }
};

/**
 * Creates a new service
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createService = function(auth, opts, callback) {
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = auth;
    auth = opts.authconfig || undefined;
  } else if (!opts && !callback) {
    opts = auth;
  }


  var self = this;
  var optsf = {
    path: '/services/create',
    method: 'POST',
    options: opts,
    authconfig: auth,
    statusCodes: {
      200: true,
      201: true,
      500: 'server error'
    }
  };


  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getService(data.ID || data.Id));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return callback(err, data);
      callback(err, self.getService(data.ID || data.Id));
    });
  }
};

/**
 * Lists volumes
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.listVolumes = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/volumes?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      400: 'bad parameter',
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Creates a new network
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Docker.prototype.createNetwork = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);
  var optsf = {
    path: '/networks/create?',
    method: 'POST',
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      404: 'driver not found',
      500: 'server error'
    }
  };


  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(self.getNetwork(data.Id));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, self.getNetwork(data.Id));
    });
  }
};

/**
 * Lists networkss
 * @param {Options}   opts     Options (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.listNetworks = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/networks?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      400: 'bad parameter',
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Search images
 * @param {Object}   opts     Options
 * @param {Function} callback Callback
 */
Docker.prototype.searchImages = function(opts, callback) {
  var self = this;
  var optsf = {
    path: '/images/search?',
    method: 'GET',
    options: opts,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Info
 * @param  {Function} callback Callback with info
 */
Docker.prototype.info = function(callback) {
  var self = this;
  var opts = {
    path: '/info',
    method: 'GET',
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };


  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Version
 * @param  {Function} callback Callback
 */
Docker.prototype.version = function(callback) {
  var self = this;
  var opts = {
    path: '/version',
    method: 'GET',
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Ping
 * @param  {Function} callback Callback
 */
Docker.prototype.ping = function(callback) {
  var self = this;
  var optsf = {
    path: '/_ping',
    method: 'GET',
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * SystemDf 	equivalent to system/df API Engine
 *		get usage data information
 * @param  {Function} callback Callback
 */
Docker.prototype.df = function(callback) {
  var self = this;
  var optsf = {
    path: '/system/df',
    method: 'GET',
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Events
 * @param {Object}   opts     Events options, like 'since' (optional)
 * @param {Function} callback Callback
 */
Docker.prototype.getEvents = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/events?',
    method: 'GET',
    options: args.opts,
    isStream: true,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Pull is a wrapper around parsing out the tag from the image
 * (which create image cannot do but run can for whatever reasons) and create image overloading.
 * @param  {String}   repoTag  Repository tag
 * @param  {Object}   opts     Options (optional)
 * @param  {Function} callback Callback
 * @param  {Object}   auth     Authentication (optional)
 * @return {Object}            Image
 */
Docker.prototype.pull = function(repoTag, opts, callback, auth) {
  var args = util.processArgs(opts, callback);

  var imageSrc = util.parseRepositoryTag(repoTag);
  args.opts.fromImage = imageSrc.repository;
  args.opts.tag = imageSrc.tag;

  var argsf = [args.opts, args.callback];
  if (auth) {
    argsf = [auth, args.opts, args.callback];
  }
  return this.createImage.apply(this, argsf);
};

/**
 * Like run command from Docker's CLI
 * @param  {String}   image         Image name to be used.
 * @param  {Array}   cmd           Command to run in array format.
 * @param  {Object}   streamo       Output stream
 * @param  {Object}   createOptions Container create options (optional)
 * @param  {Object}   startOptions  Container start options (optional)
 * @param  {Function} callback      Callback
 * @return {Object}                 EventEmitter
 */
Docker.prototype.run = function(image, cmd, streamo, createOptions, startOptions, callback) {
  if (typeof arguments[arguments.length - 1] === 'function') {
    return this.runCallback(image, cmd, streamo, createOptions, startOptions, callback);
  } else {
    return this.runPromise(image, cmd, streamo, createOptions, startOptions);
  }
};


Docker.prototype.runCallback = function(image, cmd, streamo, createOptions, startOptions, callback) {
  if (!callback && typeof createOptions === 'function') {
    callback = createOptions;
    createOptions = {};
    startOptions = {};
  } else if (!callback && typeof startOptions === 'function') {
    callback = startOptions;
    startOptions = {};
  }

  var hub = new EventEmitter();

  function handler(err, container) {
    if (err) return callback(err, null, container);

    hub.emit('container', container);

    container.attach({
      stream: true,
      stdout: true,
      stderr: true
    }, function handler(err, stream) {
      if (err) return callback(err, null, container);

      hub.emit('stream', stream);

      if (streamo) {
        if (streamo instanceof Array) {
          stream.on('end', function() {
            try {
              streamo[0].end();
            } catch (e) {}
            try {
              streamo[1].end();
            } catch (e) {}
          });
          container.modem.demuxStream(stream, streamo[0], streamo[1]);
        } else {
          stream.setEncoding('utf8');
          stream.pipe(streamo, {
            end: true
          });
        }
      }

      container.start(startOptions, function(err, data) {
        if (err) return callback(err, data, container);
        hub.emit('start', container);

        container.wait(function(err, data) {
          hub.emit('data', data);
          callback(err, data, container);
        });
      });
    });
  }

  var optsc = {
    'Hostname': '',
    'User': '',
    'AttachStdin': false,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': true,
    'OpenStdin': false,
    'StdinOnce': false,
    'Env': null,
    'Cmd': cmd,
    'Image': image,
    'Volumes': {},
    'VolumesFrom': []
  };

  extend(optsc, createOptions);

  this.createContainer(optsc, handler);

  return hub;
};

Docker.prototype.runPromise = function(image, cmd, streamo, createOptions, startOptions) {
  var self = this;

  createOptions = createOptions || {};
  startOptions = startOptions || {};

  var optsc = {
    'Hostname': '',
    'User': '',
    'AttachStdin': false,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': true,
    'OpenStdin': false,
    'StdinOnce': false,
    'Env': null,
    'Cmd': cmd,
    'Image': image,
    'Volumes': {},
    'VolumesFrom': []
  };

  extend(optsc, createOptions);

  var containero;

  return new this.modem.Promise(function(resolve, reject) {
    self.createContainer(optsc).then(function(container) {
      containero = container;
      return container.attach({
        stream: true,
        stdout: true,
        stderr: true
      });
    }).then(function(stream) {
      if (streamo) {
        if (streamo instanceof Array) {
          stream.on('end', function() {
            try {
              streamo[0].end();
            } catch (e) {}
            try {
              streamo[1].end();
            } catch (e) {}
          });
          containero.modem.demuxStream(stream, streamo[0], streamo[1]);
        } else {
          stream.setEncoding('utf8');
          stream.pipe(streamo, {
            end: true
          });
        }
      }
      return containero.start(startOptions);
    }).then(function(container) {
      return container.wait();
    }).then(function(data) {
      containero.output = data;
      resolve(containero);
    }).catch(function(err) {
      reject(err);
    });
  });
};

/**
 * Init swarm.
 *
 * @param {object} options
 * @param {function} callback
 */
Docker.prototype.swarmInit = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/swarm/init',
    method: 'POST',
    statusCodes: {
      200: true,
      400: 'bad parameter',
      406: 'node is already part of a Swarm'
    },
    options: args.opts
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Join swarm.
 *
 * @param {object} options
 * @param {function} callback
 */
Docker.prototype.swarmJoin = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/swarm/join',
    method: 'POST',
    statusCodes: {
      200: true,
      400: 'bad parameter',
      406: 'node is already part of a Swarm'
    },
    options: args.opts
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Leave swarm.
 *
 * @param {function} callback
 */
Docker.prototype.swarmLeave = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/swarm/leave?',
    method: 'POST',
    statusCodes: {
      200: true,
      406: 'node is not part of a Swarm'
    },
    options: args.opts
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Update swarm.
 *
 * @param {function} callback
 */
Docker.prototype.swarmUpdate = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/swarm/update?',
    method: 'POST',
    statusCodes: {
      200: true,
      400: 'bad parameter',
      406: 'node is already part of a Swarm'
    },
    options: args.opts
  };

  if (args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Inspect a Swarm.
 * Warning: This method is not documented in the API
 *
 * @param  {Function} callback Callback
 */
Docker.prototype.swarmInspect = function(callback) {
  var self = this;
  var optsf = {
    path: '/swarm',
    method: 'GET',
    statusCodes: {
      200: true,
      406: 'This node is not a swarm manager',
      500: 'server error'
    }
  };

  if (callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

Docker.Container = Container;
Docker.Image = Image;
Docker.Volume = Volume;
Docker.Network = Network;
Docker.Service = Service;
Docker.Plugin = Plugin;
Docker.Secret = Secret;
Docker.Task = Task;
Docker.Node = Node;
Docker.Exec = Exec;

module.exports = Docker;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

function parseJSON(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}

var querystring = __webpack_require__(54),
  http = __webpack_require__(55),
  fs = __webpack_require__(1),
  path = __webpack_require__(3),
  url = __webpack_require__(27),
  stream = __webpack_require__(4),
  HttpDuplex = __webpack_require__(59),
  debug = __webpack_require__(60)('modem'),
  util = __webpack_require__(0),
  splitca = __webpack_require__(61),
  JSONStream = __webpack_require__(62),
  isWin = __webpack_require__(28).type() === 'Windows_NT';

var defaultOpts = function() {
  var split;
  var opts = {};

  if (!process.env.DOCKER_HOST) {
    // Windows socket path: //./pipe/docker_engine ( Windows 10 )
    // Linux & Darwin socket path: /var/run/docker.sock
    opts.socketPath = isWin ? '//./pipe/docker_engine' : '/var/run/docker.sock';
  } else if (process.env.DOCKER_HOST.indexOf('unix://') === 0) {
    // Strip off unix://, fall back to default of /var/run/docker.sock if
    // unix:// was passed without a path
    opts.socketPath = process.env.DOCKER_HOST.substring(7) || '/var/run/docker.sock';
  } else {
    split = /(?:tcp:\/\/)?(.*?):([0-9]+)/g.exec(process.env.DOCKER_HOST);

    if (!split || split.length !== 3) {
      throw new Error('DOCKER_HOST env variable should be something like tcp://localhost:1234');
    }

    opts.port = split[2];

    if (process.env.DOCKER_TLS_VERIFY === '1' || opts.port === '2376') {
      opts.protocol = 'https';
    } else {
      opts.protocol = 'http';
    }

    opts.host = split[1];

    if (process.env.DOCKER_CERT_PATH) {
      opts.ca = splitca(path.join(process.env.DOCKER_CERT_PATH, 'ca.pem'));
      opts.cert = fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'cert.pem'));
      opts.key = fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'key.pem'));
    }

    if (process.env.DOCKER_CLIENT_TIMEOUT) {
      opts.timeout = process.env.DOCKER_CLIENT_TIMEOUT;
    }
  }

  return opts;
};

var Modem = function(opts) {
  if (!opts) {
    opts = defaultOpts();
  }

  this.socketPath = opts.socketPath;
  this.host = opts.host;
  this.port = opts.port;
  this.version = opts.version;
  this.key = opts.key;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.timeout = opts.timeout;
  this.checkServerIdentity = opts.checkServerIdentity;

  if (this.key && this.cert && this.ca) {
    this.protocol = 'https';
  }
  this.protocol = opts.protocol || this.protocol || 'http';
};

Modem.prototype.dial = function(options, callback) {
  var opts, address, data;
  var self = this;

  if (options.options) {
    opts = options.options;
  }

  // Prevent credentials from showing up in URL
  if (opts && opts.authconfig) {
    delete opts.authconfig;
  }

  if (this.version) {
    options.path = '/' + this.version + options.path;
  }

  if (this.host) {
    var parsed = url.parse(self.host);
    address = url.format({
      'protocol': parsed.protocol || self.protocol,
      'hostname': parsed.hostname || self.host,
      'port': self.port
    });
    address = url.resolve(address, options.path);
  } else {
    address = options.path;
  }

  if (options.path.indexOf('?') !== -1) {
    if (opts && Object.keys(opts).length > 0) {
      address += this.buildQuerystring(opts._query || opts);
    } else {
      address = address.substring(0, address.length - 1);
    }
  }

  var optionsf = {
    path: address,
    method: options.method,
    headers: options.headers || {},
    key: self.key,
    cert: self.cert,
    ca: self.ca
  };

  if (this.checkServerIdentity) {
    optionsf.checkServerIdentity = this.checkServerIdentity;
  }

  if (options.authconfig) {
    optionsf.headers['X-Registry-Auth'] = options.authconfig.key || options.authconfig.base64 ||
      new Buffer(JSON.stringify(options.authconfig)).toString('base64');
  }

  if (options.registryconfig) {
    optionsf.headers['X-Registry-Config'] = options.registryconfig.base64 ||
      new Buffer(JSON.stringify(options.registryconfig)).toString('base64');
  }

  if (options.file) {
    if (typeof options.file === 'string') {
      data = fs.readFileSync(path.resolve(options.file));
    } else {
      data = options.file;
    }
    optionsf.headers['Content-Type'] = 'application/tar';
  } else if (opts && options.method === 'POST') {
    data = JSON.stringify(opts._body || opts);
    if(options.allowEmpty) {
      optionsf.headers['Content-Type'] = 'application/json';
    } else {
      if (data !== '{}' && data !== '""') {
        optionsf.headers['Content-Type'] = 'application/json';
      } else {
        data = undefined;
      }
    }
  }

  if (typeof data === "string") {
    optionsf.headers['Content-Length'] = Buffer.byteLength(data);
  } else if (Buffer.isBuffer(data) === true) {
    optionsf.headers['Content-Length'] = data.length;
  } else if (optionsf.method === 'PUT' || options.hijack || options.openStdin) {
    optionsf.headers['Transfer-Encoding'] = 'chunked';
  }

  if (options.hijack) {
    optionsf.headers.Connection = 'Upgrade';
    optionsf.headers.Upgrade = 'tcp';
  }

  if (this.socketPath) {
    optionsf.socketPath = this.socketPath;
  } else {
    var urlp = url.parse(address);
    optionsf.hostname = urlp.hostname;
    optionsf.port = urlp.port;
    optionsf.path = urlp.path;
  }

  this.buildRequest(optionsf, options, data, callback);
};

Modem.prototype.buildRequest = function(options, context, data, callback) {
  var self = this;
  var req = http[self.protocol].request(options, function() {});

  debug('Sending: %s', util.inspect(options, {
    showHidden: true,
    depth: null
  }));

  if (self.timeout) {
    req.on('socket', function(socket) {
      socket.setTimeout(self.timeout);
      socket.on('timeout', function() {
        debug('Timeout of %s ms exceeded', self.timeout);
        req.abort();
      });
    });
  }

  if (context.hijack === true) {
    req.on('upgrade', function(res, sock, head) {
      return callback(null, sock);
    });
  }

  req.on('response', function(res) {
    if (context.isStream === true) {
      self.buildPayload(null, context.isStream, context.statusCodes, context.openStdin, req, res, null, callback);
    } else {
      var chunks = '';
      res.on('data', function(chunk) {
        chunks += chunk;
      });

      res.on('end', function() {
        debug('Received: %s', chunks);

        var json = parseJSON(chunks) || chunks;
        self.buildPayload(null, context.isStream, context.statusCodes, false, req, res, json, callback);
      });
    }
  });

  req.on('error', function(error) {
    self.buildPayload(error, context.isStream, context.statusCodes, false, {}, {}, null, callback);
  });

  if (typeof data === "string" || Buffer.isBuffer(data)) {
    req.write(data);
  } else if (data) {
    data.pipe(req);
  }

  if (!context.hijack && !context.openStdin && (typeof data === "string" || data === undefined || Buffer.isBuffer(data))) {
    req.end();
  }
};

Modem.prototype.buildPayload = function(err, isStream, statusCodes, openStdin, req, res, json, cb) {
  if (err) return cb(err, null);

  if (statusCodes[res.statusCode] !== true) {
    getCause(isStream, res, json, function(err, cause) {
      var msg = new Error(
        '(HTTP code ' + res.statusCode + ') ' +
        (statusCodes[res.statusCode] || 'unexpected') + ' - ' +
        (cause.message || cause) + ' '
      );
      msg.reason = statusCodes[res.statusCode];
      msg.statusCode = res.statusCode;
      msg.json = json;
      cb(msg, null);
    });
  } else {
    if (openStdin) {
      cb(null, new HttpDuplex(req, res));
    } else if (isStream) {
      cb(null, res);
    } else {
      cb(null, json);
    }
  }

  function getCause(isStream, res, json, callback) {
    var chunks = '';
    if (isStream) {
      res.on('data', function(chunk) {
        chunks += chunk;
      });
      res.on('end', function() {
        callback(null, parseJSON(chunks) || chunks);
      });
    } else {
      callback(null, json);
    }
  }
};

Modem.prototype.demuxStream = function(stream, stdout, stderr) {
  var header = null;

  stream.on('readable', function() {
    header = header || stream.read(8);
    while (header !== null) {
      var type = header.readUInt8(0);
      var payload = stream.read(header.readUInt32BE(4));
      if (payload === null) break;
      if (type == 2) {
        stderr.write(payload);
      } else {
        stdout.write(payload);
      }
      header = stream.read(8);
    }
  });
};

Modem.prototype.followProgress = function(stream, onFinished, onProgress) {
  var parser = JSONStream.parse(),
    output = [];

  parser.on('root', onStreamEvent);
  parser.on('error', onStreamError);
  parser.on('end', onStreamEnd);

  stream.pipe(parser);

  function onStreamEvent(evt) {
    if (!(evt instanceof Object)) {
      evt = {};
    }

    output.push(evt);

    if (evt.error) {
      return onStreamError(evt.error);
    }

    if (onProgress) {
      onProgress(evt);
    }
  }

  function onStreamError(err) {
    parser.removeListener('root', onStreamEvent);
    parser.removeListener('error', onStreamError);
    parser.removeListener('end', onStreamEnd);
    onFinished(err, output);
  }

  function onStreamEnd() {
    onFinished(null, output);
  }
};

Modem.prototype.buildQuerystring = function(opts) {
  var clone = {};

  // serialize map values as JSON strings, else querystring truncates.
  Object.keys(opts).map(function(key, i) {
    clone[key] = (opts[key] && typeof opts[key] === 'object' && key !== 't') ?
      JSON.stringify(opts[key]) : opts[key];
  });

  return querystring.stringify(clone);
};

module.exports = Modem;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//Based on follow-redirects v0.0.x

var nativeHttps = __webpack_require__(56),
  nativeHttp = __webpack_require__(57),
  url = __webpack_require__(27),
  util = __webpack_require__(58);

var maxRedirects = module.exports.maxRedirects = 5;

var protocols = {
  https: nativeHttps,
  http: nativeHttp
};

for (var protocol in protocols) {
  var h = function() {};
  h.prototype = protocols[protocol];
  h = new h();

  h.request = function(h) {
    return function(options, callback, redirectOptions) {

      redirectOptions = redirectOptions || {};

      var max = (typeof options === 'object' && 'maxRedirects' in options) ? options.maxRedirects : exports.maxRedirects;

      var redirect = util.extend({
        count: 0,
        max: max,
        clientRequest: null,
        userCallback: callback
      }, redirectOptions);

      if (redirect.count > redirect.max) {
        var err = new Error('Max redirects exceeded. To allow more redirects, pass options.maxRedirects property.');
        redirect.clientRequest.emit('error', err);
        return redirect.clientRequest;
      }

      redirect.count++;

      var reqUrl;
      if (typeof options === 'string') {
        reqUrl = options;
      } else {
        reqUrl = url.format(util.extend({
          protocol: protocol
        }, options));
      }

      var clientRequest = Object.getPrototypeOf(h).request(options, redirectCallback(reqUrl, redirect));

      if (!redirect.clientRequest) redirect.clientRequest = clientRequest;

      function redirectCallback(reqUrl, redirect) {
        return function(res) {
          if (res.statusCode < 300 || res.statusCode > 399) {
            return redirect.userCallback(res);
          }

          if (!('location' in res.headers)) {
            return redirect.userCallback(res);
          }

          var redirectUrl = url.resolve(reqUrl, res.headers.location);

          var proto = url.parse(redirectUrl).protocol;
          proto = proto.substr(0, proto.length - 1);
          return module.exports[proto].get(redirectUrl, redirectCallback(reqUrl, redirect), redirect);
        };
      }

      return clientRequest;
    };
  }(h);

  // see https://github.com/joyent/node/blob/master/lib/http.js#L1623
  h.get = function(h) {
    return function(options, cb, redirectOptions) {
      var req = h.request(options, cb, redirectOptions);
      req.end();
      return req;
    };
  }(h);

  module.exports[protocol] = h;
}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// https://github.com/HenrikJoreteg/extend-object/blob/v0.1.0/extend-object.js

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

module.exports.extend = function(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = HttpDuplex;

var util = __webpack_require__(0),
  stream = __webpack_require__(4);

util.inherits(HttpDuplex, stream.Duplex);

function HttpDuplex(req, res, options) {
  var self = this;

  if (!(self instanceof HttpDuplex)) return new HttpDuplex(req, res, options);

  stream.Duplex.call(self, options);
  self._output = null;

  self.connect(req, res);
}

HttpDuplex.prototype.connect = function(req, res) {
  var self = this;
  self.req = req;
  self._output = res;
  self.emit('response', res);

  res.on('data', function(c) {
    if (!self.push(c)) self._output.pause();
  });
  res.on('end', function() {
    self.push(null);
  });
};

HttpDuplex.prototype._read = function(n) {
  if (this._output) this._output.resume();
};

HttpDuplex.prototype._write = function(chunk, encoding, cb) {
  this.req.write(chunk, encoding);
  cb();
};

HttpDuplex.prototype.end = function(chunk, encoding, cb) {
  this._output.socket.destroy();
  return this.req.end(chunk, encoding, cb);
};

HttpDuplex.prototype.destroy = function() {
  this.req.destroy();
  this._output.socket.destroy();
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1);

module.exports = function (filepath, split, encoding) {
  split = typeof split !== 'undefined' ? split : "\n";
  encoding = typeof encoding !== 'undefined' ? encoding : "utf8";

  var ca = [];
  var chain = fs.readFileSync(filepath, encoding);
  if(chain.indexOf("-END CERTIFICATE-") < 0 || chain.indexOf("-BEGIN CERTIFICATE-") < 0){
    throw Error("File does not contain 'BEGIN CERTIFICATE' or 'END CERTIFICATE'");
  }
  chain = chain.split(split);
  var cert = [];
  var _i, _len;
  for (_i = 0, _len = chain.length; _i < _len; _i++) {
    var line = chain[_i];
    if (!(line.length !== 0)) {
      continue;
    }
    cert.push(line);
    if (line.match(/-END CERTIFICATE-/)) {
      ca.push(cert.join(split));
      cert = [];
    }
  }
  return ca;
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {
var Parser = __webpack_require__(64)
  , through = __webpack_require__(65)

/*

  the value of this.stack that creationix's jsonparse has is weird.

  it makes this code ugly, but his problem is way harder that mine,
  so i'll forgive him.

*/

exports.parse = function (path, map) {

  var parser = new Parser()
  var stream = through(function (chunk) {
    if('string' === typeof chunk)
      chunk = new Buffer(chunk)
    parser.write(chunk)
  },
  function (data) {
    if(data)
      stream.write(data)
    stream.queue(null)
  })

  if('string' === typeof path)
    path = path.split('.').map(function (e) {
      if (e === '*')
        return true
      else if (e === '') // '..'.split('.') returns an empty string
        return {recurse: true}
      else
        return e
    })


  var count = 0, _key
  if(!path || !path.length)
    path = null

  parser.onValue = function (value) {
    if (!this.root)
      stream.root = value

    if(! path) return

    var i = 0 // iterates on path
    var j  = 0 // iterates on stack
    while (i < path.length) {
      var key = path[i]
      var c
      j++

      if (key && !key.recurse) {
        c = (j === this.stack.length) ? this : this.stack[j]
        if (!c) return
        if (! check(key, c.key)) return
        i++
      } else {
        i++
        var nextKey = path[i]
        if (! nextKey) return
        while (true) {
          c = (j === this.stack.length) ? this : this.stack[j]
          if (!c) return
          if (check(nextKey, c.key)) { i++; break}
          j++
        }
      }
    }
    if (j !== this.stack.length) return

    count ++
    var actualPath = this.stack.slice(1).map(function(element) { return element.key }).concat([this.key])
    var data = this.value[this.key]
    if(null != data)
      if(null != (data = map ? map(data, actualPath) : data))
        stream.queue(data)
    delete this.value[this.key]
  }
  parser._onToken = parser.onToken;

  parser.onToken = function (token, value) {
    parser._onToken(token, value);
    if (this.stack.length === 0) {
      if (stream.root) {
        if(!path)
          stream.queue(stream.root)
        stream.emit('root', stream.root, count)
        count = 0;
        stream.root = null;
      }
    }
  }

  parser.onError = function (err) {
    stream.emit('error', err)
  }


  return stream
}

function check (x, y) {
  if ('string' === typeof x)
    return y == x
  else if (x && 'function' === typeof x.exec)
    return x.exec(y)
  else if ('boolean' === typeof x)
    return x
  else if ('function' === typeof x)
    return x(y)
  return false
}

exports.stringify = function (op, sep, cl, indent) {
  indent = indent || 0
  if (op === false){
    op = ''
    sep = '\n'
    cl = ''
  } else if (op == null) {

    op = '[\n'
    sep = '\n,\n'
    cl = '\n]\n'

  }

  //else, what ever you like

  var stream
    , first = true
    , anyData = false
  stream = through(function (data) {
    anyData = true
    var json = JSON.stringify(data, null, indent)
    if(first) { first = false ; stream.queue(op + json)}
    else stream.queue(sep + json)
  },
  function (data) {
    if(!anyData)
      stream.queue(op)
    stream.queue(cl)
    stream.queue(null)
  })

  return stream
}

exports.stringifyObject = function (op, sep, cl, indent) {
  indent = indent || 0
  if (op === false){
    op = ''
    sep = '\n'
    cl = ''
  } else if (op == null) {

    op = '{\n'
    sep = '\n,\n'
    cl = '\n}\n'

  }

  //else, what ever you like

  var first = true
    , anyData = false
  stream = through(function (data) {
    anyData = true
    var json = JSON.stringify(data[0]) + ':' + JSON.stringify(data[1], null, indent)
    if(first) { first = false ; this.queue(op + json)}
    else this.queue(sep + json)
  },
  function (data) {
    if(!anyData) this.queue(op)
    this.queue(cl)

    this.queue(null)
  })

  return stream
}

if(!module.parent && process.title !== 'browser') {
  process.stdin
    .pipe(exports.parse(process.argv[2]))
    .pipe(exports.stringify('[', ',\n', ']\n', 2))
    .pipe(process.stdout)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/*global Buffer*/
// Named constants with unique integer values
var C = {};
// Tokens
var LEFT_BRACE    = C.LEFT_BRACE    = 0x1;
var RIGHT_BRACE   = C.RIGHT_BRACE   = 0x2;
var LEFT_BRACKET  = C.LEFT_BRACKET  = 0x3;
var RIGHT_BRACKET = C.RIGHT_BRACKET = 0x4;
var COLON         = C.COLON         = 0x5;
var COMMA         = C.COMMA         = 0x6;
var TRUE          = C.TRUE          = 0x7;
var FALSE         = C.FALSE         = 0x8;
var NULL          = C.NULL          = 0x9;
var STRING        = C.STRING        = 0xa;
var NUMBER        = C.NUMBER        = 0xb;
// Tokenizer States
var START   = C.START   = 0x11;
var TRUE1   = C.TRUE1   = 0x21;
var TRUE2   = C.TRUE2   = 0x22;
var TRUE3   = C.TRUE3   = 0x23;
var FALSE1  = C.FALSE1  = 0x31;
var FALSE2  = C.FALSE2  = 0x32;
var FALSE3  = C.FALSE3  = 0x33;
var FALSE4  = C.FALSE4  = 0x34;
var NULL1   = C.NULL1   = 0x41;
var NULL2   = C.NULL3   = 0x42;
var NULL3   = C.NULL2   = 0x43;
var NUMBER1 = C.NUMBER1 = 0x51;
var NUMBER2 = C.NUMBER2 = 0x52;
var NUMBER3 = C.NUMBER3 = 0x53;
var NUMBER4 = C.NUMBER4 = 0x54;
var NUMBER5 = C.NUMBER5 = 0x55;
var NUMBER6 = C.NUMBER6 = 0x56;
var NUMBER7 = C.NUMBER7 = 0x57;
var NUMBER8 = C.NUMBER8 = 0x58;
var STRING1 = C.STRING1 = 0x61;
var STRING2 = C.STRING2 = 0x62;
var STRING3 = C.STRING3 = 0x63;
var STRING4 = C.STRING4 = 0x64;
var STRING5 = C.STRING5 = 0x65;
var STRING6 = C.STRING6 = 0x66;
// Parser States
var VALUE   = C.VALUE   = 0x71;
var KEY     = C.KEY     = 0x72;
// Parser Modes
var OBJECT  = C.OBJECT  = 0x81;
var ARRAY   = C.ARRAY   = 0x82;

// Slow code to string converter (only used when throwing syntax errors)
function toknam(code) {
  var keys = Object.keys(C);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    if (C[key] === code) { return key; }
  }
  return code && ("0x" + code.toString(16));
}


function Parser() {
  this.tState = START;
  this.value = undefined;

  this.string = undefined; // string data
  this.unicode = undefined; // unicode escapes

  // For number parsing
  this.negative = undefined;
  this.magnatude = undefined;
  this.position = undefined;
  this.exponent = undefined;
  this.negativeExponent = undefined;
  
  this.key = undefined;
  this.mode = undefined;
  this.stack = [];
  this.state = VALUE;
  this.bytes_remaining = 0; // number of bytes remaining in multi byte utf8 char to read after split boundary
  this.bytes_in_sequence = 0; // bytes in multi byte utf8 char to read
  this.temp_buffs = { "2": new Buffer(2), "3": new Buffer(3), "4": new Buffer(4) }; // for rebuilding chars split before boundary is reached
}
var proto = Parser.prototype;
proto.charError = function (buffer, i) {
  this.onError(new Error("Unexpected " + JSON.stringify(String.fromCharCode(buffer[i])) + " at position " + i + " in state " + toknam(this.tState)));
};
proto.onError = function (err) { throw err; };
proto.write = function (buffer) {
  if (typeof buffer === "string") buffer = new Buffer(buffer);
  //process.stdout.write("Input: ");
  //console.dir(buffer.toString());
  var n;
  for (var i = 0, l = buffer.length; i < l; i++) {
    if (this.tState === START){
      n = buffer[i];
      if(n === 0x7b){ this.onToken(LEFT_BRACE, "{"); // {
      }else if(n === 0x7d){ this.onToken(RIGHT_BRACE, "}"); // }
      }else if(n === 0x5b){ this.onToken(LEFT_BRACKET, "["); // [
      }else if(n === 0x5d){ this.onToken(RIGHT_BRACKET, "]"); // ]
      }else if(n === 0x3a){ this.onToken(COLON, ":");  // :
      }else if(n === 0x2c){ this.onToken(COMMA, ","); // ,
      }else if(n === 0x74){ this.tState = TRUE1;  // t
      }else if(n === 0x66){ this.tState = FALSE1;  // f
      }else if(n === 0x6e){ this.tState = NULL1; // n
      }else if(n === 0x22){ this.string = ""; this.tState = STRING1; // "
      }else if(n === 0x2d){ this.negative = true; this.tState = NUMBER1; // -
      }else if(n === 0x30){ this.magnatude = 0; this.tState = NUMBER2; // 0
      }else{
        if (n > 0x30 && n < 0x40) { // 1-9
          this.magnatude = n - 0x30; this.tState = NUMBER3;
        } else if (n === 0x20 || n === 0x09 || n === 0x0a || n === 0x0d) {
          // whitespace
        } else { this.charError(buffer, i); }
      }
    }else if (this.tState === STRING1){ // After open quote
      n = buffer[i]; // get current byte from buffer
      // check for carry over of a multi byte char split between data chunks
      // & fill temp buffer it with start of this data chunk up to the boundary limit set in the last iteration
      if (this.bytes_remaining > 0) {
        for (var j = 0; j < this.bytes_remaining; j++) {
          this.temp_buffs[this.bytes_in_sequence][this.bytes_in_sequence - this.bytes_remaining + j] = buffer[j];
        }
        this.string += this.temp_buffs[this.bytes_in_sequence].toString();
        this.bytes_in_sequence = this.bytes_remaining = 0;
        i = i + j - 1;
      } else if (this.bytes_remaining === 0 && n >= 128) { // else if no remainder bytes carried over, parse multi byte (>=128) chars one at a time
        if ((n >= 194) && (n <= 223)) this.bytes_in_sequence = 2;
        if ((n >= 224) && (n <= 239)) this.bytes_in_sequence = 3;
        if ((n >= 240) && (n <= 244)) this.bytes_in_sequence = 4;
        if ((this.bytes_in_sequence + i) > buffer.length) { // if bytes needed to complete char fall outside buffer length, we have a boundary split
          for (var k = 0; k <= (buffer.length - 1 - i); k++) {
            this.temp_buffs[this.bytes_in_sequence][k] = buffer[i + k]; // fill temp buffer of correct size with bytes available in this chunk
          }
          this.bytes_remaining = (i + this.bytes_in_sequence) - buffer.length;
          i = buffer.length - 1;
        } else {
          this.string += buffer.slice(i, (i + this.bytes_in_sequence)).toString();
          i = i + this.bytes_in_sequence - 1;
        }
      } else if (n === 0x22) { this.tState = START; this.onToken(STRING, this.string); this.string = undefined; }
      else if (n === 0x5c) { this.tState = STRING2; }
      else if (n >= 0x20) { this.string += String.fromCharCode(n); }
      else { this.charError(buffer, i); }
    }else if (this.tState === STRING2){ // After backslash
      n = buffer[i];
      if(n === 0x22){ this.string += "\""; this.tState = STRING1;
      }else if(n === 0x5c){ this.string += "\\"; this.tState = STRING1; 
      }else if(n === 0x2f){ this.string += "\/"; this.tState = STRING1; 
      }else if(n === 0x62){ this.string += "\b"; this.tState = STRING1; 
      }else if(n === 0x66){ this.string += "\f"; this.tState = STRING1; 
      }else if(n === 0x6e){ this.string += "\n"; this.tState = STRING1; 
      }else if(n === 0x72){ this.string += "\r"; this.tState = STRING1; 
      }else if(n === 0x74){ this.string += "\t"; this.tState = STRING1; 
      }else if(n === 0x75){ this.unicode = ""; this.tState = STRING3;
      }else{ 
        this.charError(buffer, i); 
      }
    }else if (this.tState === STRING3 || this.tState === STRING4 || this.tState === STRING5 || this.tState === STRING6){ // unicode hex codes
      n = buffer[i];
      // 0-9 A-F a-f
      if ((n >= 0x30 && n < 0x40) || (n > 0x40 && n <= 0x46) || (n > 0x60 && n <= 0x66)) {
        this.unicode += String.fromCharCode(n);
        if (this.tState++ === STRING6) {
          this.string += String.fromCharCode(parseInt(this.unicode, 16));
          this.unicode = undefined;
          this.tState = STRING1; 
        }
      } else {
        this.charError(buffer, i);
      }
    }else if (this.tState === NUMBER1){ // after minus
      n = buffer[i];
      if (n === 0x30) { this.magnatude = 0; this.tState = NUMBER2; }
      else if (n > 0x30 && n < 0x40) { this.magnatude = n - 0x30; this.tState = NUMBER3; }
      else { this.charError(buffer, i); }
    }else if (this.tState === NUMBER2){ // * After initial zero
      n = buffer[i];
      if(n === 0x2e){ // .
        this.position = 0.1; this.tState = NUMBER4;
      }else if(n === 0x65 ||  n === 0x45){ // e/E
        this.exponent = 0; this.tState = NUMBER6;
      }else{
        this.tState = START;
        this.onToken(NUMBER, 0);
        this.magnatude = undefined;
        this.negative = undefined;
        i--;
      }
    }else if (this.tState === NUMBER3){ // * After digit (before period)
      n = buffer[i];
      if(n === 0x2e){ // .
        this.position = 0.1; this.tState = NUMBER4;
      }else if(n === 0x65 || n === 0x45){ // e/E
        this.exponent = 0; this.tState = NUMBER6;
      }else{
        if (n >= 0x30 && n < 0x40) { this.magnatude = this.magnatude * 10 + n - 0x30; }
        else {
          this.tState = START; 
          if (this.negative) {
            this.magnatude = -this.magnatude;
            this.negative = undefined;
          }
          this.onToken(NUMBER, this.magnatude); 
          this.magnatude = undefined;
          i--;
        }
      }
    }else if (this.tState === NUMBER4){ // After period
      n = buffer[i];
      if (n >= 0x30 && n < 0x40) { // 0-9
        this.magnatude += this.position * (n - 0x30);
        this.position /= 10;
        this.tState = NUMBER5; 
      } else { this.charError(buffer, i); }
    }else if (this.tState === NUMBER5){ // * After digit (after period)
      n = buffer[i];
      if (n >= 0x30 && n < 0x40) { // 0-9
        this.magnatude += this.position * (n - 0x30);
        this.position /= 10;
      }
      else if (n === 0x65 || n === 0x45) { this.exponent = 0; this.tState = NUMBER6; } // E/e
      else {
        this.tState = START; 
        if (this.negative) {
          this.magnatude = -this.magnatude;
          this.negative = undefined;
        }
        this.onToken(NUMBER, this.negative ? -this.magnatude : this.magnatude); 
        this.magnatude = undefined;
        this.position = undefined;
        i--; 
      }
    }else if (this.tState === NUMBER6){ // After E
      n = buffer[i];
      if (n === 0x2b || n === 0x2d) { // +/-
        if (n === 0x2d) { this.negativeExponent = true; }
        this.tState = NUMBER7;
      }
      else if (n >= 0x30 && n < 0x40) {
        this.exponent = this.exponent * 10 + (n - 0x30);
        this.tState = NUMBER8;
      }
      else { this.charError(buffer, i); }  
    }else if (this.tState === NUMBER7){ // After +/-
      n = buffer[i];
      if (n >= 0x30 && n < 0x40) { // 0-9
        this.exponent = this.exponent * 10 + (n - 0x30);
        this.tState = NUMBER8;
      }
      else { this.charError(buffer, i); }  
    }else if (this.tState === NUMBER8){ // * After digit (after +/-)
      n = buffer[i];
      if (n >= 0x30 && n < 0x40) { // 0-9
        this.exponent = this.exponent * 10 + (n - 0x30);
      }
      else {
        if (this.negativeExponent) {
          this.exponent = -this.exponent;
          this.negativeExponent = undefined;
        }
        this.magnatude *= Math.pow(10, this.exponent);
        this.exponent = undefined;
        if (this.negative) { 
          this.magnatude = -this.magnatude;
          this.negative = undefined;
        }
        this.tState = START;
        this.onToken(NUMBER, this.magnatude);
        this.magnatude = undefined;
        i--; 
      } 
    }else if (this.tState === TRUE1){ // r
      if (buffer[i] === 0x72) { this.tState = TRUE2; }
      else { this.charError(buffer, i); }
    }else if (this.tState === TRUE2){ // u
      if (buffer[i] === 0x75) { this.tState = TRUE3; }
      else { this.charError(buffer, i); }
    }else if (this.tState === TRUE3){ // e
      if (buffer[i] === 0x65) { this.tState = START; this.onToken(TRUE, true); }
      else { this.charError(buffer, i); }
    }else if (this.tState === FALSE1){ // a
      if (buffer[i] === 0x61) { this.tState = FALSE2; }
      else { this.charError(buffer, i); }
    }else if (this.tState === FALSE2){ // l
      if (buffer[i] === 0x6c) { this.tState = FALSE3; }
      else { this.charError(buffer, i); }
    }else if (this.tState === FALSE3){ // s
      if (buffer[i] === 0x73) { this.tState = FALSE4; }
      else { this.charError(buffer, i); }
    }else if (this.tState === FALSE4){ // e
      if (buffer[i] === 0x65) { this.tState = START; this.onToken(FALSE, false); }
      else { this.charError(buffer, i); }
    }else if (this.tState === NULL1){ // u
      if (buffer[i] === 0x75) { this.tState = NULL2; }
      else { this.charError(buffer, i); }
    }else if (this.tState === NULL2){ // l
      if (buffer[i] === 0x6c) { this.tState = NULL3; }
      else { this.charError(buffer, i); }
    }else if (this.tState === NULL3){ // l
      if (buffer[i] === 0x6c) { this.tState = START; this.onToken(NULL, null); }
      else { this.charError(buffer, i); }
    }
  }
};
proto.onToken = function (token, value) {
  // Override this to get events
};

proto.parseError = function (token, value) {
  this.onError(new Error("Unexpected " + toknam(token) + (value ? ("(" + JSON.stringify(value) + ")") : "") + " in state " + toknam(this.state)));
};
proto.onError = function (err) { throw err; };
proto.push = function () {
  this.stack.push({value: this.value, key: this.key, mode: this.mode});
};
proto.pop = function () {
  var value = this.value;
  var parent = this.stack.pop();
  this.value = parent.value;
  this.key = parent.key;
  this.mode = parent.mode;
  this.emit(value);
  if (!this.mode) { this.state = VALUE; }
};
proto.emit = function (value) {
  if (this.mode) { this.state = COMMA; }
  this.onValue(value);
};
proto.onValue = function (value) {
  // Override me
};  
proto.onToken = function (token, value) {
  //console.log("OnToken: state=%s token=%s %s", toknam(this.state), toknam(token), value?JSON.stringify(value):"");
  if(this.state === VALUE){
    if(token === STRING || token === NUMBER || token === TRUE || token === FALSE || token === NULL){
      if (this.value) {
        this.value[this.key] = value;
      }
      this.emit(value);  
    }else if(token === LEFT_BRACE){
      this.push();
      if (this.value) {
        this.value = this.value[this.key] = {};
      } else {
        this.value = {};
      }
      this.key = undefined;
      this.state = KEY;
      this.mode = OBJECT;
    }else if(token === LEFT_BRACKET){
      this.push();
      if (this.value) {
        this.value = this.value[this.key] = [];
      } else {
        this.value = [];
      }
      this.key = 0;
      this.mode = ARRAY;
      this.state = VALUE;
    }else if(token === RIGHT_BRACE){
      if (this.mode === OBJECT) {
        this.pop();
      } else {
        this.parseError(token, value);
      }
    }else if(token === RIGHT_BRACKET){
      if (this.mode === ARRAY) {
        this.pop();
      } else {
        this.parseError(token, value);
      }
    }else{
      this.parseError(token, value);
    }
  }else if(this.state === KEY){
    if (token === STRING) {
      this.key = value;
      this.state = COLON;
    } else if (token === RIGHT_BRACE) {
      this.pop();
    } else {
      this.parseError(token, value);
    }
  }else if(this.state === COLON){
    if (token === COLON) { this.state = VALUE; }
    else { this.parseError(token, value); }
  }else if(this.state === COMMA){
    if (token === COMMA) { 
      if (this.mode === ARRAY) { this.key++; this.state = VALUE; }
      else if (this.mode === OBJECT) { this.state = KEY; }

    } else if (token === RIGHT_BRACKET && this.mode === ARRAY || token === RIGHT_BRACE && this.mode === OBJECT) {
      this.pop();
    } else {
      this.parseError(token, value);
    }
  }else{
    this.parseError(token, value);
  }
};

module.exports = Parser;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("through");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var chownr = __webpack_require__(67)
var tar = __webpack_require__(68)
var pump = __webpack_require__(76)
var mkdirp = __webpack_require__(23)
var fs = __webpack_require__(1)
var path = __webpack_require__(3)
var os = __webpack_require__(28)

var win32 = os.platform() === 'win32'

var noop = function () {}

var echo = function (name) {
  return name
}

var normalize = !win32 ? echo : function (name) {
  return name.replace(/\\/g, '/').replace(/[:?<>|]/g, '_')
}

var statAll = function (fs, stat, cwd, ignore, entries, sort) {
  var queue = entries || ['.']

  return function loop (callback) {
    if (!queue.length) return callback()
    var next = queue.shift()
    var nextAbs = path.join(cwd, next)

    stat(nextAbs, function (err, stat) {
      if (err) return callback(err)

      if (!stat.isDirectory()) return callback(null, next, stat)

      fs.readdir(nextAbs, function (err, files) {
        if (err) return callback(err)

        if (sort) files.sort()
        for (var i = 0; i < files.length; i++) {
          if (!ignore(path.join(cwd, next, files[i]))) queue.push(path.join(next, files[i]))
        }

        callback(null, next, stat)
      })
    })
  }
}

var strip = function (map, level) {
  return function (header) {
    header.name = header.name.split('/').slice(level).join('/')

    var linkname = header.linkname
    if (linkname && (header.type === 'link' || path.isAbsolute(linkname))) {
      header.linkname = linkname.split('/').slice(level).join('/')
    }

    return map(header)
  }
}

exports.pack = function (cwd, opts) {
  if (!cwd) cwd = '.'
  if (!opts) opts = {}

  var xfs = opts.fs || fs
  var ignore = opts.ignore || opts.filter || noop
  var map = opts.map || noop
  var mapStream = opts.mapStream || echo
  var statNext = statAll(xfs, opts.dereference ? xfs.stat : xfs.lstat, cwd, ignore, opts.entries, opts.sort)
  var strict = opts.strict !== false
  var umask = typeof opts.umask === 'number' ? ~opts.umask : ~processUmask()
  var dmode = typeof opts.dmode === 'number' ? opts.dmode : 0
  var fmode = typeof opts.fmode === 'number' ? opts.fmode : 0
  var pack = opts.pack || tar.pack()
  var finish = opts.finish || noop

  if (opts.strip) map = strip(map, opts.strip)

  if (opts.readable) {
    dmode |= parseInt(555, 8)
    fmode |= parseInt(444, 8)
  }
  if (opts.writable) {
    dmode |= parseInt(333, 8)
    fmode |= parseInt(222, 8)
  }

  var onsymlink = function (filename, header) {
    xfs.readlink(path.join(cwd, filename), function (err, linkname) {
      if (err) return pack.destroy(err)
      header.linkname = normalize(linkname)
      pack.entry(header, onnextentry)
    })
  }

  var onstat = function (err, filename, stat) {
    if (err) return pack.destroy(err)
    if (!filename) {
      if (opts.finalize !== false) pack.finalize()
      return finish(pack)
    }

    if (stat.isSocket()) return onnextentry() // tar does not support sockets...

    var header = {
      name: normalize(filename),
      mode: (stat.mode | (stat.isDirectory() ? dmode : fmode)) & umask,
      mtime: stat.mtime,
      size: stat.size,
      type: 'file',
      uid: stat.uid,
      gid: stat.gid
    }

    if (stat.isDirectory()) {
      header.size = 0
      header.type = 'directory'
      header = map(header) || header
      return pack.entry(header, onnextentry)
    }

    if (stat.isSymbolicLink()) {
      header.size = 0
      header.type = 'symlink'
      header = map(header) || header
      return onsymlink(filename, header)
    }

    // TODO: add fifo etc...

    header = map(header) || header

    if (!stat.isFile()) {
      if (strict) return pack.destroy(new Error('unsupported type for ' + filename))
      return onnextentry()
    }

    var entry = pack.entry(header, onnextentry)
    if (!entry) return

    var rs = mapStream(xfs.createReadStream(path.join(cwd, filename)), header)

    rs.on('error', function (err) { // always forward errors on destroy
      entry.destroy(err)
    })

    pump(rs, entry)
  }

  var onnextentry = function (err) {
    if (err) return pack.destroy(err)
    statNext(onstat)
  }

  onnextentry()

  return pack
}

var head = function (list) {
  return list.length ? list[list.length - 1] : null
}

var processGetuid = function () {
  return process.getuid ? process.getuid() : -1
}

var processUmask = function () {
  return process.umask ? process.umask() : 0
}

exports.extract = function (cwd, opts) {
  if (!cwd) cwd = '.'
  if (!opts) opts = {}

  var xfs = opts.fs || fs
  var ignore = opts.ignore || opts.filter || noop
  var map = opts.map || noop
  var mapStream = opts.mapStream || echo
  var own = opts.chown !== false && !win32 && processGetuid() === 0
  var extract = opts.extract || tar.extract()
  var stack = []
  var now = new Date()
  var umask = typeof opts.umask === 'number' ? ~opts.umask : ~processUmask()
  var dmode = typeof opts.dmode === 'number' ? opts.dmode : 0
  var fmode = typeof opts.fmode === 'number' ? opts.fmode : 0
  var strict = opts.strict !== false

  if (opts.strip) map = strip(map, opts.strip)

  if (opts.readable) {
    dmode |= parseInt(555, 8)
    fmode |= parseInt(444, 8)
  }
  if (opts.writable) {
    dmode |= parseInt(333, 8)
    fmode |= parseInt(222, 8)
  }

  var utimesParent = function (name, cb) { // we just set the mtime on the parent dir again everytime we write an entry
    var top
    while ((top = head(stack)) && name.slice(0, top[0].length) !== top[0]) stack.pop()
    if (!top) return cb()
    xfs.utimes(top[0], now, top[1], cb)
  }

  var utimes = function (name, header, cb) {
    if (opts.utimes === false) return cb()

    if (header.type === 'directory') return xfs.utimes(name, now, header.mtime, cb)
    if (header.type === 'symlink') return utimesParent(name, cb) // TODO: how to set mtime on link?

    xfs.utimes(name, now, header.mtime, function (err) {
      if (err) return cb(err)
      utimesParent(name, cb)
    })
  }

  var chperm = function (name, header, cb) {
    var link = header.type === 'symlink'
    var chmod = link ? xfs.lchmod : xfs.chmod
    var chown = link ? xfs.lchown : xfs.chown

    if (!chmod) return cb()

    var mode = (header.mode | (header.type === 'directory' ? dmode : fmode)) & umask
    chmod(name, mode, function (err) {
      if (err) return cb(err)
      if (!own) return cb()
      if (!chown) return cb()
      chown(name, header.uid, header.gid, cb)
    })
  }

  extract.on('entry', function (header, stream, next) {
    header = map(header) || header
    header.name = normalize(header.name)
    var name = path.join(cwd, path.join('/', header.name))

    if (ignore(name, header)) {
      stream.resume()
      return next()
    }

    var stat = function (err) {
      if (err) return next(err)
      utimes(name, header, function (err) {
        if (err) return next(err)
        if (win32) return next()
        chperm(name, header, next)
      })
    }

    var onsymlink = function () {
      if (win32) return next() // skip symlinks on win for now before it can be tested
      xfs.unlink(name, function () {
        xfs.symlink(header.linkname, name, stat)
      })
    }

    var onlink = function () {
      if (win32) return next() // skip links on win for now before it can be tested
      xfs.unlink(name, function () {
        var srcpath = path.resolve(cwd, header.linkname)

        xfs.link(srcpath, name, function (err) {
          if (err && err.code === 'EPERM' && opts.hardlinkAsFilesFallback) {
            stream = xfs.createReadStream(srcpath)
            return onfile()
          }

          stat(err)
        })
      })
    }

    var onfile = function () {
      var ws = xfs.createWriteStream(name)
      var rs = mapStream(stream, header)

      ws.on('error', function (err) { // always forward errors on destroy
        rs.destroy(err)
      })

      pump(rs, ws, function (err) {
        if (err) return next(err)
        ws.on('close', stat)
      })
    }

    if (header.type === 'directory') {
      stack.push([name, header.mtime])
      return mkdirfix(name, {
        fs: xfs, own: own, uid: header.uid, gid: header.gid
      }, stat)
    }

    mkdirfix(path.dirname(name), {
      fs: xfs, own: own, uid: header.uid, gid: header.gid
    }, function (err) {
      if (err) return next(err)

      switch (header.type) {
        case 'file': return onfile()
        case 'link': return onlink()
        case 'symlink': return onsymlink()
      }

      if (strict) return next(new Error('unsupported type for ' + name + ' (' + header.type + ')'))

      stream.resume()
      next()
    })
  })

  if (opts.finish) extract.on('finish', opts.finish)

  return extract
}

function mkdirfix (name, opts, cb) {
  mkdirp(name, {fs: opts.xfs}, function (err, made) {
    if (!err && made && opts.own) {
      chownr(made, opts.uid, opts.gid, cb)
    } else {
      cb(err)
    }
  })
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = chownr
chownr.sync = chownrSync

var fs = __webpack_require__(1)
, path = __webpack_require__(3)

function chownr (p, uid, gid, cb) {
  fs.readdir(p, function (er, children) {
    // any error other than ENOTDIR means it's not readable, or
    // doesn't exist.  give up.
    if (er && er.code !== "ENOTDIR") return cb(er)
    if (er || !children.length) return fs.chown(p, uid, gid, cb)

    var len = children.length
    , errState = null
    children.forEach(function (child) {
      var pathChild = path.resolve(p, child);
      fs.lstat(pathChild, function(er, stats) {
        if (er)
          return cb(er)
        if (!stats.isSymbolicLink())
          chownr(pathChild, uid, gid, then)
        else
          then()
        })
    })
    function then (er) {
      if (errState) return
      if (er) return cb(errState = er)
      if (-- len === 0) return fs.chown(p, uid, gid, cb)
    }
  })
}

function chownrSync (p, uid, gid) {
  var children
  try {
    children = fs.readdirSync(p)
  } catch (er) {
    if (er && er.code === "ENOTDIR") return fs.chownSync(p, uid, gid)
    throw er
  }
  if (!children.length) return fs.chownSync(p, uid, gid)

  children.forEach(function (child) {
    var pathChild = path.resolve(p, child)
    var stats = fs.lstatSync(pathChild)
    if (!stats.isSymbolicLink())
      chownrSync(pathChild, uid, gid)
  })
  return fs.chownSync(p, uid, gid)
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports.extract = __webpack_require__(69)
exports.pack = __webpack_require__(73)


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0)
var bl = __webpack_require__(70)
var xtend = __webpack_require__(72)
var headers = __webpack_require__(29)

var Writable = __webpack_require__(4).Writable
var PassThrough = __webpack_require__(4).PassThrough

var noop = function () {}

var overflow = function (size) {
  size &= 511
  return size && 512 - size
}

var emptyStream = function (self, offset) {
  var s = new Source(self, offset)
  s.end()
  return s
}

var mixinPax = function (header, pax) {
  if (pax.path) header.name = pax.path
  if (pax.linkpath) header.linkname = pax.linkpath
  header.pax = pax
  return header
}

var Source = function (self, offset) {
  this._parent = self
  this.offset = offset
  PassThrough.call(this)
}

util.inherits(Source, PassThrough)

Source.prototype.destroy = function (err) {
  this._parent.destroy(err)
}

var Extract = function (opts) {
  if (!(this instanceof Extract)) return new Extract(opts)
  Writable.call(this, opts)

  this._offset = 0
  this._buffer = bl()
  this._missing = 0
  this._onparse = noop
  this._header = null
  this._stream = null
  this._overflow = null
  this._cb = null
  this._locked = false
  this._destroyed = false
  this._pax = null
  this._paxGlobal = null
  this._gnuLongPath = null
  this._gnuLongLinkPath = null

  var self = this
  var b = self._buffer

  var oncontinue = function () {
    self._continue()
  }

  var onunlock = function (err) {
    self._locked = false
    if (err) return self.destroy(err)
    if (!self._stream) oncontinue()
  }

  var onstreamend = function () {
    self._stream = null
    var drain = overflow(self._header.size)
    if (drain) self._parse(drain, ondrain)
    else self._parse(512, onheader)
    if (!self._locked) oncontinue()
  }

  var ondrain = function () {
    self._buffer.consume(overflow(self._header.size))
    self._parse(512, onheader)
    oncontinue()
  }

  var onpaxglobalheader = function () {
    var size = self._header.size
    self._paxGlobal = headers.decodePax(b.slice(0, size))
    b.consume(size)
    onstreamend()
  }

  var onpaxheader = function () {
    var size = self._header.size
    self._pax = headers.decodePax(b.slice(0, size))
    if (self._paxGlobal) self._pax = xtend(self._paxGlobal, self._pax)
    b.consume(size)
    onstreamend()
  }

  var ongnulongpath = function () {
    var size = self._header.size
    this._gnuLongPath = headers.decodeLongPath(b.slice(0, size))
    b.consume(size)
    onstreamend()
  }

  var ongnulonglinkpath = function () {
    var size = self._header.size
    this._gnuLongLinkPath = headers.decodeLongPath(b.slice(0, size))
    b.consume(size)
    onstreamend()
  }

  var onheader = function () {
    var offset = self._offset
    var header
    try {
      header = self._header = headers.decode(b.slice(0, 512))
    } catch (err) {
      self.emit('error', err)
    }
    b.consume(512)

    if (!header) {
      self._parse(512, onheader)
      oncontinue()
      return
    }
    if (header.type === 'gnu-long-path') {
      self._parse(header.size, ongnulongpath)
      oncontinue()
      return
    }
    if (header.type === 'gnu-long-link-path') {
      self._parse(header.size, ongnulonglinkpath)
      oncontinue()
      return
    }
    if (header.type === 'pax-global-header') {
      self._parse(header.size, onpaxglobalheader)
      oncontinue()
      return
    }
    if (header.type === 'pax-header') {
      self._parse(header.size, onpaxheader)
      oncontinue()
      return
    }

    if (self._gnuLongPath) {
      header.name = self._gnuLongPath
      self._gnuLongPath = null
    }

    if (self._gnuLongLinkPath) {
      header.linkname = self._gnuLongLinkPath
      self._gnuLongLinkPath = null
    }

    if (self._pax) {
      self._header = header = mixinPax(header, self._pax)
      self._pax = null
    }

    self._locked = true

    if (!header.size || header.type === 'directory') {
      self._parse(512, onheader)
      self.emit('entry', header, emptyStream(self, offset), onunlock)
      return
    }

    self._stream = new Source(self, offset)

    self.emit('entry', header, self._stream, onunlock)
    self._parse(header.size, onstreamend)
    oncontinue()
  }

  this._parse(512, onheader)
}

util.inherits(Extract, Writable)

Extract.prototype.destroy = function (err) {
  if (this._destroyed) return
  this._destroyed = true

  if (err) this.emit('error', err)
  this.emit('close')
  if (this._stream) this._stream.emit('close')
}

Extract.prototype._parse = function (size, onparse) {
  if (this._destroyed) return
  this._offset += size
  this._missing = size
  this._onparse = onparse
}

Extract.prototype._continue = function () {
  if (this._destroyed) return
  var cb = this._cb
  this._cb = noop
  if (this._overflow) this._write(this._overflow, undefined, cb)
  else cb()
}

Extract.prototype._write = function (data, enc, cb) {
  if (this._destroyed) return

  var s = this._stream
  var b = this._buffer
  var missing = this._missing

  // we do not reach end-of-chunk now. just forward it

  if (data.length < missing) {
    this._missing -= data.length
    this._overflow = null
    if (s) return s.write(data, cb)
    b.append(data)
    return cb()
  }

  // end-of-chunk. the parser should call cb.

  this._cb = cb
  this._missing = 0

  var overflow = null
  if (data.length > missing) {
    overflow = data.slice(missing)
    data = data.slice(0, missing)
  }

  if (s) s.end(data)
  else b.append(data)

  this._overflow = overflow
  this._onparse()
}

module.exports = Extract


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var DuplexStream = __webpack_require__(71)
  , util         = __webpack_require__(0)


function BufferList (callback) {
  if (!(this instanceof BufferList))
    return new BufferList(callback)

  this._bufs  = []
  this.length = 0

  if (typeof callback == 'function') {
    this._callback = callback

    var piper = function piper (err) {
      if (this._callback) {
        this._callback(err)
        this._callback = null
      }
    }.bind(this)

    this.on('pipe', function onPipe (src) {
      src.on('error', piper)
    })
    this.on('unpipe', function onUnpipe (src) {
      src.removeListener('error', piper)
    })
  } else {
    this.append(callback)
  }

  DuplexStream.call(this)
}


util.inherits(BufferList, DuplexStream)


BufferList.prototype._offset = function _offset (offset) {
  var tot = 0, i = 0, _t
  if (offset === 0) return [ 0, 0 ]
  for (; i < this._bufs.length; i++) {
    _t = tot + this._bufs[i].length
    if (offset < _t || i == this._bufs.length - 1)
      return [ i, offset - tot ]
    tot = _t
  }
}


BufferList.prototype.append = function append (buf) {
  var i = 0

  if (Buffer.isBuffer(buf)) {
    this._appendBuffer(buf);
  } else if (Array.isArray(buf)) {
    for (; i < buf.length; i++)
      this.append(buf[i])
  } else if (buf instanceof BufferList) {
    // unwrap argument into individual BufferLists
    for (; i < buf._bufs.length; i++)
      this.append(buf._bufs[i])
  } else if (buf != null) {
    // coerce number arguments to strings, since Buffer(number) does
    // uninitialized memory allocation
    if (typeof buf == 'number')
      buf = buf.toString()

    this._appendBuffer(new Buffer(buf));
  }

  return this
}


BufferList.prototype._appendBuffer = function appendBuffer (buf) {
  this._bufs.push(buf)
  this.length += buf.length
}


BufferList.prototype._write = function _write (buf, encoding, callback) {
  this._appendBuffer(buf)

  if (typeof callback == 'function')
    callback()
}


BufferList.prototype._read = function _read (size) {
  if (!this.length)
    return this.push(null)

  size = Math.min(size, this.length)
  this.push(this.slice(0, size))
  this.consume(size)
}


BufferList.prototype.end = function end (chunk) {
  DuplexStream.prototype.end.call(this, chunk)

  if (this._callback) {
    this._callback(null, this.slice())
    this._callback = null
  }
}


BufferList.prototype.get = function get (index) {
  return this.slice(index, index + 1)[0]
}


BufferList.prototype.slice = function slice (start, end) {
  if (typeof start == 'number' && start < 0)
    start += this.length
  if (typeof end == 'number' && end < 0)
    end += this.length
  return this.copy(null, 0, start, end)
}


BufferList.prototype.copy = function copy (dst, dstStart, srcStart, srcEnd) {
  if (typeof srcStart != 'number' || srcStart < 0)
    srcStart = 0
  if (typeof srcEnd != 'number' || srcEnd > this.length)
    srcEnd = this.length
  if (srcStart >= this.length)
    return dst || new Buffer(0)
  if (srcEnd <= 0)
    return dst || new Buffer(0)

  var copy   = !!dst
    , off    = this._offset(srcStart)
    , len    = srcEnd - srcStart
    , bytes  = len
    , bufoff = (copy && dstStart) || 0
    , start  = off[1]
    , l
    , i

  // copy/slice everything
  if (srcStart === 0 && srcEnd == this.length) {
    if (!copy) { // slice, but full concat if multiple buffers
      return this._bufs.length === 1
        ? this._bufs[0]
        : Buffer.concat(this._bufs, this.length)
    }

    // copy, need to copy individual buffers
    for (i = 0; i < this._bufs.length; i++) {
      this._bufs[i].copy(dst, bufoff)
      bufoff += this._bufs[i].length
    }

    return dst
  }

  // easy, cheap case where it's a subset of one of the buffers
  if (bytes <= this._bufs[off[0]].length - start) {
    return copy
      ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes)
      : this._bufs[off[0]].slice(start, start + bytes)
  }

  if (!copy) // a slice, we need something to copy in to
    dst = new Buffer(len)

  for (i = off[0]; i < this._bufs.length; i++) {
    l = this._bufs[i].length - start

    if (bytes > l) {
      this._bufs[i].copy(dst, bufoff, start)
    } else {
      this._bufs[i].copy(dst, bufoff, start, start + bytes)
      break
    }

    bufoff += l
    bytes -= l

    if (start)
      start = 0
  }

  return dst
}

BufferList.prototype.shallowSlice = function shallowSlice (start, end) {
  start = start || 0
  end = end || this.length

  if (start < 0)
    start += this.length
  if (end < 0)
    end += this.length

  var startOffset = this._offset(start)
    , endOffset = this._offset(end)
    , buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1)

  if (endOffset[1] == 0)
    buffers.pop()
  else
    buffers[buffers.length-1] = buffers[buffers.length-1].slice(0, endOffset[1])

  if (startOffset[1] != 0)
    buffers[0] = buffers[0].slice(startOffset[1])

  return new BufferList(buffers)
}

BufferList.prototype.toString = function toString (encoding, start, end) {
  return this.slice(start, end).toString(encoding)
}

BufferList.prototype.consume = function consume (bytes) {
  while (this._bufs.length) {
    if (bytes >= this._bufs[0].length) {
      bytes -= this._bufs[0].length
      this.length -= this._bufs[0].length
      this._bufs.shift()
    } else {
      this._bufs[0] = this._bufs[0].slice(bytes)
      this.length -= bytes
      break
    }
  }
  return this
}


BufferList.prototype.duplicate = function duplicate () {
  var i = 0
    , copy = new BufferList()

  for (; i < this._bufs.length; i++)
    copy.append(this._bufs[i])

  return copy
}


BufferList.prototype.destroy = function destroy () {
  this._bufs.length = 0
  this.length = 0
  this.push(null)
}


;(function () {
  var methods = {
      'readDoubleBE' : 8
    , 'readDoubleLE' : 8
    , 'readFloatBE'  : 4
    , 'readFloatLE'  : 4
    , 'readInt32BE'  : 4
    , 'readInt32LE'  : 4
    , 'readUInt32BE' : 4
    , 'readUInt32LE' : 4
    , 'readInt16BE'  : 2
    , 'readInt16LE'  : 2
    , 'readUInt16BE' : 2
    , 'readUInt16LE' : 2
    , 'readInt8'     : 1
    , 'readUInt8'    : 1
  }

  for (var m in methods) {
    (function (m) {
      BufferList.prototype[m] = function (offset) {
        return this.slice(offset, offset + methods[m])[m](0)
      }
    }(m))
  }
}())


module.exports = BufferList


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("readable-stream/duplex");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("xtend");

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(74)
var eos = __webpack_require__(30)
var util = __webpack_require__(0)

var Readable = __webpack_require__(4).Readable
var Writable = __webpack_require__(4).Writable
var StringDecoder = __webpack_require__(75).StringDecoder

var headers = __webpack_require__(29)

var DMODE = parseInt('755', 8)
var FMODE = parseInt('644', 8)

var END_OF_TAR = new Buffer(1024)
END_OF_TAR.fill(0)

var noop = function () {}

var overflow = function (self, size) {
  size &= 511
  if (size) self.push(END_OF_TAR.slice(0, 512 - size))
}

function modeToType (mode) {
  switch (mode & constants.S_IFMT) {
    case constants.S_IFBLK: return 'block-device'
    case constants.S_IFCHR: return 'character-device'
    case constants.S_IFDIR: return 'directory'
    case constants.S_IFIFO: return 'fifo'
    case constants.S_IFLNK: return 'symlink'
  }

  return 'file'
}

var Sink = function (to) {
  Writable.call(this)
  this.written = 0
  this._to = to
  this._destroyed = false
}

util.inherits(Sink, Writable)

Sink.prototype._write = function (data, enc, cb) {
  this.written += data.length
  if (this._to.push(data)) return cb()
  this._to._drain = cb
}

Sink.prototype.destroy = function () {
  if (this._destroyed) return
  this._destroyed = true
  this.emit('close')
}

var LinkSink = function () {
  Writable.call(this)
  this.linkname = ''
  this._decoder = new StringDecoder('utf-8')
  this._destroyed = false
}

util.inherits(LinkSink, Writable)

LinkSink.prototype._write = function (data, enc, cb) {
  this.linkname += this._decoder.write(data)
  cb()
}

LinkSink.prototype.destroy = function () {
  if (this._destroyed) return
  this._destroyed = true
  this.emit('close')
}

var Void = function () {
  Writable.call(this)
  this._destroyed = false
}

util.inherits(Void, Writable)

Void.prototype._write = function (data, enc, cb) {
  cb(new Error('No body allowed for this entry'))
}

Void.prototype.destroy = function () {
  if (this._destroyed) return
  this._destroyed = true
  this.emit('close')
}

var Pack = function (opts) {
  if (!(this instanceof Pack)) return new Pack(opts)
  Readable.call(this, opts)

  this._drain = noop
  this._finalized = false
  this._finalizing = false
  this._destroyed = false
  this._stream = null
}

util.inherits(Pack, Readable)

Pack.prototype.entry = function (header, buffer, callback) {
  if (this._stream) throw new Error('already piping an entry')
  if (this._finalized || this._destroyed) return

  if (typeof buffer === 'function') {
    callback = buffer
    buffer = null
  }

  if (!callback) callback = noop

  var self = this

  if (!header.size || header.type === 'symlink') header.size = 0
  if (!header.type) header.type = modeToType(header.mode)
  if (!header.mode) header.mode = header.type === 'directory' ? DMODE : FMODE
  if (!header.uid) header.uid = 0
  if (!header.gid) header.gid = 0
  if (!header.mtime) header.mtime = new Date()

  if (typeof buffer === 'string') buffer = new Buffer(buffer)
  if (Buffer.isBuffer(buffer)) {
    header.size = buffer.length
    this._encode(header)
    this.push(buffer)
    overflow(self, header.size)
    process.nextTick(callback)
    return new Void()
  }

  if (header.type === 'symlink' && !header.linkname) {
    var linkSink = new LinkSink()
    eos(linkSink, function (err) {
      if (err) { // stream was closed
        self.destroy()
        return callback(err)
      }

      header.linkname = linkSink.linkname
      self._encode(header)
      callback()
    })

    return linkSink
  }

  this._encode(header)

  if (header.type !== 'file' && header.type !== 'contiguous-file') {
    process.nextTick(callback)
    return new Void()
  }

  var sink = new Sink(this)

  this._stream = sink

  eos(sink, function (err) {
    self._stream = null

    if (err) { // stream was closed
      self.destroy()
      return callback(err)
    }

    if (sink.written !== header.size) { // corrupting tar
      self.destroy()
      return callback(new Error('size mismatch'))
    }

    overflow(self, header.size)
    if (self._finalizing) self.finalize()
    callback()
  })

  return sink
}

Pack.prototype.finalize = function () {
  if (this._stream) {
    this._finalizing = true
    return
  }

  if (this._finalized) return
  this._finalized = true
  this.push(END_OF_TAR)
  this.push(null)
}

Pack.prototype.destroy = function (err) {
  if (this._destroyed) return
  this._destroyed = true

  if (err) this.emit('error', err)
  this.emit('close')
  if (this._stream && this._stream.destroy) this._stream.destroy()
}

Pack.prototype._encode = function (header) {
  if (!header.pax) {
    var buf = headers.encode(header)
    if (buf) {
      this.push(buf)
      return
    }
  }
  this._encodePax(header)
}

Pack.prototype._encodePax = function (header) {
  var paxHeader = headers.encodePax({
    name: header.name,
    linkname: header.linkname,
    pax: header.pax
  })

  var newHeader = {
    name: 'PaxHeader',
    mode: header.mode,
    uid: header.uid,
    gid: header.gid,
    size: paxHeader.length,
    mtime: header.mtime,
    type: 'pax-header',
    linkname: header.linkname && 'PaxHeader',
    uname: header.uname,
    gname: header.gname,
    devmajor: header.devmajor,
    devminor: header.devminor
  }

  this.push(headers.encode(newHeader))
  this.push(paxHeader)
  overflow(this, paxHeader.length)

  newHeader.size = header.size
  newHeader.type = header.type
  this.push(headers.encode(newHeader))
}

Pack.prototype._read = function (n) {
  var drain = this._drain
  this._drain = noop
  drain()
}

module.exports = Pack


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var once = __webpack_require__(7)
var eos = __webpack_require__(30)
var fs = __webpack_require__(1) // we only need fs to get the ReadStream and WriteStream prototypes

var noop = function () {}

var isFn = function (fn) {
  return typeof fn === 'function'
}

var isFS = function (stream) {
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback)

  var closed = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed = false
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close() // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call = function (fn) {
  fn()
}

var pipe = function (from, to) {
  return from.pipe(to)
}

var pump = function () {
  var streams = Array.prototype.slice.call(arguments)
  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1
    var writing = i > 0
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var Writable = __webpack_require__(4).Writable
var inherits = __webpack_require__(19)

if (typeof Uint8Array === 'undefined') {
  var U8 = __webpack_require__(79).Uint8Array
} else {
  var U8 = Uint8Array
}

function ConcatStream(opts, cb) {
  if (!(this instanceof ConcatStream)) return new ConcatStream(opts, cb)

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts) opts = {}

  var encoding = opts.encoding
  var shouldInferEncoding = false

  if (!encoding) {
    shouldInferEncoding = true
  } else {
    encoding =  String(encoding).toLowerCase()
    if (encoding === 'u8' || encoding === 'uint8') {
      encoding = 'uint8array'
    }
  }

  Writable.call(this, { objectMode: true })

  this.encoding = encoding
  this.shouldInferEncoding = shouldInferEncoding

  if (cb) this.on('finish', function () { cb(this.getBody()) })
  this.body = []
}

module.exports = ConcatStream
inherits(ConcatStream, Writable)

ConcatStream.prototype._write = function(chunk, enc, next) {
  this.body.push(chunk)
  next()
}

ConcatStream.prototype.inferEncoding = function (buff) {
  var firstBuffer = buff === undefined ? this.body[0] : buff;
  if (Buffer.isBuffer(firstBuffer)) return 'buffer'
  if (typeof Uint8Array !== 'undefined' && firstBuffer instanceof Uint8Array) return 'uint8array'
  if (Array.isArray(firstBuffer)) return 'array'
  if (typeof firstBuffer === 'string') return 'string'
  if (Object.prototype.toString.call(firstBuffer) === "[object Object]") return 'object'
  return 'buffer'
}

ConcatStream.prototype.getBody = function () {
  if (!this.encoding && this.body.length === 0) return []
  if (this.shouldInferEncoding) this.encoding = this.inferEncoding()
  if (this.encoding === 'array') return arrayConcat(this.body)
  if (this.encoding === 'string') return stringConcat(this.body)
  if (this.encoding === 'buffer') return bufferConcat(this.body)
  if (this.encoding === 'uint8array') return u8Concat(this.body)
  return this.body
}

var isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]'
}

function isArrayish (arr) {
  return /Array\]$/.test(Object.prototype.toString.call(arr))
}

function isBufferish (p) {
  return typeof p === 'string' || isArrayish(p) || (p && typeof p.subarray === 'function')
}

function stringConcat (parts) {
  var strings = []
  var needsToString = false
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i]
    if (typeof p === 'string') {
      strings.push(p)
    } else if (Buffer.isBuffer(p)) {
      strings.push(p)
    } else if (isBufferish(p)) {
      strings.push(new Buffer(p))
    } else {
      strings.push(new Buffer(String(p)))
    }
  }
  if (Buffer.isBuffer(parts[0])) {
    strings = Buffer.concat(strings)
    strings = strings.toString('utf8')
  } else {
    strings = strings.join('')
  }
  return strings
}

function bufferConcat (parts) {
  var bufs = []
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i]
    if (Buffer.isBuffer(p)) {
      bufs.push(p)
    } else if (isBufferish(p)) {
      bufs.push(new Buffer(p))
    } else {
      bufs.push(new Buffer(String(p)))
    }
  }
  return Buffer.concat(bufs)
}

function arrayConcat (parts) {
  var res = []
  for (var i = 0; i < parts.length; i++) {
    res.push.apply(res, parts[i])
  }
  return res
}

function u8Concat (parts) {
  var len = 0
  for (var i = 0; i < parts.length; i++) {
    if (typeof parts[i] === 'string') {
      parts[i] = new Buffer(parts[i])
    }
    len += parts[i].length
  }
  var u8 = new U8(len)
  for (var i = 0, offset = 0; i < parts.length; i++) {
    var part = parts[i]
    for (var j = 0; j < part.length; j++) {
      u8[offset++] = part[j]
    }
  }
  return u8
}


/***/ }),
/* 79 */
/***/ (function(module, exports) {

var undefined = (void 0); // Paranoia

// Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to
// create, and consume so much memory, that the browser appears frozen.
var MAX_ARRAY_LENGTH = 1e5;

// Approximations of internal ECMAScript conversion functions
var ECMAScript = (function() {
  // Stash a copy in case other scripts modify these
  var opts = Object.prototype.toString,
      ophop = Object.prototype.hasOwnProperty;

  return {
    // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
    Class: function(v) { return opts.call(v).replace(/^\[object *|\]$/g, ''); },
    HasProperty: function(o, p) { return p in o; },
    HasOwnProperty: function(o, p) { return ophop.call(o, p); },
    IsCallable: function(o) { return typeof o === 'function'; },
    ToInt32: function(v) { return v >> 0; },
    ToUint32: function(v) { return v >>> 0; }
  };
}());

// Snapshot intrinsics
var LN2 = Math.LN2,
    abs = Math.abs,
    floor = Math.floor,
    log = Math.log,
    min = Math.min,
    pow = Math.pow,
    round = Math.round;

// ES5: lock down object properties
function configureProperties(obj) {
  if (getOwnPropNames && defineProp) {
    var props = getOwnPropNames(obj), i;
    for (i = 0; i < props.length; i += 1) {
      defineProp(obj, props[i], {
        value: obj[props[i]],
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
}

// emulate ES5 getter/setter API using legacy APIs
// http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
// (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but
// note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)
var defineProp
if (Object.defineProperty && (function() {
      try {
        Object.defineProperty({}, 'x', {});
        return true;
      } catch (e) {
        return false;
      }
    })()) {
  defineProp = Object.defineProperty;
} else {
  defineProp = function(o, p, desc) {
    if (!o === Object(o)) throw new TypeError("Object.defineProperty called on non-object");
    if (ECMAScript.HasProperty(desc, 'get') && Object.prototype.__defineGetter__) { Object.prototype.__defineGetter__.call(o, p, desc.get); }
    if (ECMAScript.HasProperty(desc, 'set') && Object.prototype.__defineSetter__) { Object.prototype.__defineSetter__.call(o, p, desc.set); }
    if (ECMAScript.HasProperty(desc, 'value')) { o[p] = desc.value; }
    return o;
  };
}

var getOwnPropNames = Object.getOwnPropertyNames || function (o) {
  if (o !== Object(o)) throw new TypeError("Object.getOwnPropertyNames called on non-object");
  var props = [], p;
  for (p in o) {
    if (ECMAScript.HasOwnProperty(o, p)) {
      props.push(p);
    }
  }
  return props;
};

// ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)
// for index in 0 ... obj.length
function makeArrayAccessors(obj) {
  if (!defineProp) { return; }

  if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError("Array too large for polyfill");

  function makeArrayAccessor(index) {
    defineProp(obj, index, {
      'get': function() { return obj._getter(index); },
      'set': function(v) { obj._setter(index, v); },
      enumerable: true,
      configurable: false
    });
  }

  var i;
  for (i = 0; i < obj.length; i += 1) {
    makeArrayAccessor(i);
  }
}

// Internal conversion functions:
//    pack<Type>()   - take a number (interpreted as Type), output a byte array
//    unpack<Type>() - take a byte array, output a Type-like number

function as_signed(value, bits) { var s = 32 - bits; return (value << s) >> s; }
function as_unsigned(value, bits) { var s = 32 - bits; return (value << s) >>> s; }

function packI8(n) { return [n & 0xff]; }
function unpackI8(bytes) { return as_signed(bytes[0], 8); }

function packU8(n) { return [n & 0xff]; }
function unpackU8(bytes) { return as_unsigned(bytes[0], 8); }

function packU8Clamped(n) { n = round(Number(n)); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

function packI16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackI16(bytes) { return as_signed(bytes[0] << 8 | bytes[1], 16); }

function packU16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackU16(bytes) { return as_unsigned(bytes[0] << 8 | bytes[1], 16); }

function packI32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackI32(bytes) { return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packU32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackU32(bytes) { return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packIEEE754(v, ebits, fbits) {

  var bias = (1 << (ebits - 1)) - 1,
      s, e, f, ln,
      i, bits, str, bytes;

  function roundToEven(n) {
    var w = floor(n), f = n - w;
    if (f < 0.5)
      return w;
    if (f > 0.5)
      return w + 1;
    return w % 2 ? w + 1 : w;
  }

  // Compute sign, exponent, fraction
  if (v !== v) {
    // NaN
    // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
    e = (1 << ebits) - 1; f = pow(2, fbits - 1); s = 0;
  } else if (v === Infinity || v === -Infinity) {
    e = (1 << ebits) - 1; f = 0; s = (v < 0) ? 1 : 0;
  } else if (v === 0) {
    e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
  } else {
    s = v < 0;
    v = abs(v);

    if (v >= pow(2, 1 - bias)) {
      e = min(floor(log(v) / LN2), 1023);
      f = roundToEven(v / pow(2, e) * pow(2, fbits));
      if (f / pow(2, fbits) >= 2) {
        e = e + 1;
        f = 1;
      }
      if (e > bias) {
        // Overflow
        e = (1 << ebits) - 1;
        f = 0;
      } else {
        // Normalized
        e = e + bias;
        f = f - pow(2, fbits);
      }
    } else {
      // Denormalized
      e = 0;
      f = roundToEven(v / pow(2, 1 - bias - fbits));
    }
  }

  // Pack sign, exponent, fraction
  bits = [];
  for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = floor(f / 2); }
  for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = floor(e / 2); }
  bits.push(s ? 1 : 0);
  bits.reverse();
  str = bits.join('');

  // Bits to bytes
  bytes = [];
  while (str.length) {
    bytes.push(parseInt(str.substring(0, 8), 2));
    str = str.substring(8);
  }
  return bytes;
}

function unpackIEEE754(bytes, ebits, fbits) {

  // Bytes to bits
  var bits = [], i, j, b, str,
      bias, s, e, f;

  for (i = bytes.length; i; i -= 1) {
    b = bytes[i - 1];
    for (j = 8; j; j -= 1) {
      bits.push(b % 2 ? 1 : 0); b = b >> 1;
    }
  }
  bits.reverse();
  str = bits.join('');

  // Unpack sign, exponent, fraction
  bias = (1 << (ebits - 1)) - 1;
  s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
  e = parseInt(str.substring(1, 1 + ebits), 2);
  f = parseInt(str.substring(1 + ebits), 2);

  // Produce number
  if (e === (1 << ebits) - 1) {
    return f !== 0 ? NaN : s * Infinity;
  } else if (e > 0) {
    // Normalized
    return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
  } else if (f !== 0) {
    // Denormalized
    return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
  } else {
    return s < 0 ? -0 : 0;
  }
}

function unpackF64(b) { return unpackIEEE754(b, 11, 52); }
function packF64(v) { return packIEEE754(v, 11, 52); }
function unpackF32(b) { return unpackIEEE754(b, 8, 23); }
function packF32(v) { return packIEEE754(v, 8, 23); }


//
// 3 The ArrayBuffer Type
//

(function() {

  /** @constructor */
  var ArrayBuffer = function ArrayBuffer(length) {
    length = ECMAScript.ToInt32(length);
    if (length < 0) throw new RangeError('ArrayBuffer size is not a small enough positive integer');

    this.byteLength = length;
    this._bytes = [];
    this._bytes.length = length;

    var i;
    for (i = 0; i < this.byteLength; i += 1) {
      this._bytes[i] = 0;
    }

    configureProperties(this);
  };

  exports.ArrayBuffer = exports.ArrayBuffer || ArrayBuffer;

  //
  // 4 The ArrayBufferView Type
  //

  // NOTE: this constructor is not exported
  /** @constructor */
  var ArrayBufferView = function ArrayBufferView() {
    //this.buffer = null;
    //this.byteOffset = 0;
    //this.byteLength = 0;
  };

  //
  // 5 The Typed Array View Types
  //

  function makeConstructor(bytesPerElement, pack, unpack) {
    // Each TypedArray type requires a distinct constructor instance with
    // identical logic, which this produces.

    var ctor;
    ctor = function(buffer, byteOffset, length) {
      var array, sequence, i, s;

      if (!arguments.length || typeof arguments[0] === 'number') {
        // Constructor(unsigned long length)
        this.length = ECMAScript.ToInt32(arguments[0]);
        if (length < 0) throw new RangeError('ArrayBufferView size is not a small enough positive integer');

        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;
      } else if (typeof arguments[0] === 'object' && arguments[0].constructor === ctor) {
        // Constructor(TypedArray array)
        array = arguments[0];

        this.length = array.length;
        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;

        for (i = 0; i < this.length; i += 1) {
          this._setter(i, array._getter(i));
        }
      } else if (typeof arguments[0] === 'object' &&
                 !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
        // Constructor(sequence<type> array)
        sequence = arguments[0];

        this.length = ECMAScript.ToUint32(sequence.length);
        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;

        for (i = 0; i < this.length; i += 1) {
          s = sequence[i];
          this._setter(i, Number(s));
        }
      } else if (typeof arguments[0] === 'object' &&
                 (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
        // Constructor(ArrayBuffer buffer,
        //             optional unsigned long byteOffset, optional unsigned long length)
        this.buffer = buffer;

        this.byteOffset = ECMAScript.ToUint32(byteOffset);
        if (this.byteOffset > this.buffer.byteLength) {
          throw new RangeError("byteOffset out of range");
        }

        if (this.byteOffset % this.BYTES_PER_ELEMENT) {
          // The given byteOffset must be a multiple of the element
          // size of the specific type, otherwise an exception is raised.
          throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
        }

        if (arguments.length < 3) {
          this.byteLength = this.buffer.byteLength - this.byteOffset;

          if (this.byteLength % this.BYTES_PER_ELEMENT) {
            throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
          }
          this.length = this.byteLength / this.BYTES_PER_ELEMENT;
        } else {
          this.length = ECMAScript.ToUint32(length);
          this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        }

        if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
          throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
        }
      } else {
        throw new TypeError("Unexpected argument type(s)");
      }

      this.constructor = ctor;

      configureProperties(this);
      makeArrayAccessors(this);
    };

    ctor.prototype = new ArrayBufferView();
    ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
    ctor.prototype._pack = pack;
    ctor.prototype._unpack = unpack;
    ctor.BYTES_PER_ELEMENT = bytesPerElement;

    // getter type (unsigned long index);
    ctor.prototype._getter = function(index) {
      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");

      index = ECMAScript.ToUint32(index);
      if (index >= this.length) {
        return undefined;
      }

      var bytes = [], i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        bytes.push(this.buffer._bytes[o]);
      }
      return this._unpack(bytes);
    };

    // NONSTANDARD: convenience alias for getter: type get(unsigned long index);
    ctor.prototype.get = ctor.prototype._getter;

    // setter void (unsigned long index, type value);
    ctor.prototype._setter = function(index, value) {
      if (arguments.length < 2) throw new SyntaxError("Not enough arguments");

      index = ECMAScript.ToUint32(index);
      if (index >= this.length) {
        return undefined;
      }

      var bytes = this._pack(value), i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        this.buffer._bytes[o] = bytes[i];
      }
    };

    // void set(TypedArray array, optional unsigned long offset);
    // void set(sequence<type> array, optional unsigned long offset);
    ctor.prototype.set = function(index, value) {
      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
      var array, sequence, offset, len,
          i, s, d,
          byteOffset, byteLength, tmp;

      if (typeof arguments[0] === 'object' && arguments[0].constructor === this.constructor) {
        // void set(TypedArray array, optional unsigned long offset);
        array = arguments[0];
        offset = ECMAScript.ToUint32(arguments[1]);

        if (offset + array.length > this.length) {
          throw new RangeError("Offset plus length of array is out of range");
        }

        byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
        byteLength = array.length * this.BYTES_PER_ELEMENT;

        if (array.buffer === this.buffer) {
          tmp = [];
          for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
            tmp[i] = array.buffer._bytes[s];
          }
          for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
            this.buffer._bytes[d] = tmp[i];
          }
        } else {
          for (i = 0, s = array.byteOffset, d = byteOffset;
               i < byteLength; i += 1, s += 1, d += 1) {
            this.buffer._bytes[d] = array.buffer._bytes[s];
          }
        }
      } else if (typeof arguments[0] === 'object' && typeof arguments[0].length !== 'undefined') {
        // void set(sequence<type> array, optional unsigned long offset);
        sequence = arguments[0];
        len = ECMAScript.ToUint32(sequence.length);
        offset = ECMAScript.ToUint32(arguments[1]);

        if (offset + len > this.length) {
          throw new RangeError("Offset plus length of array is out of range");
        }

        for (i = 0; i < len; i += 1) {
          s = sequence[i];
          this._setter(offset + i, Number(s));
        }
      } else {
        throw new TypeError("Unexpected argument type(s)");
      }
    };

    // TypedArray subarray(long begin, optional long end);
    ctor.prototype.subarray = function(start, end) {
      function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

      start = ECMAScript.ToInt32(start);
      end = ECMAScript.ToInt32(end);

      if (arguments.length < 1) { start = 0; }
      if (arguments.length < 2) { end = this.length; }

      if (start < 0) { start = this.length + start; }
      if (end < 0) { end = this.length + end; }

      start = clamp(start, 0, this.length);
      end = clamp(end, 0, this.length);

      var len = end - start;
      if (len < 0) {
        len = 0;
      }

      return new this.constructor(
        this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);
    };

    return ctor;
  }

  var Int8Array = makeConstructor(1, packI8, unpackI8);
  var Uint8Array = makeConstructor(1, packU8, unpackU8);
  var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
  var Int16Array = makeConstructor(2, packI16, unpackI16);
  var Uint16Array = makeConstructor(2, packU16, unpackU16);
  var Int32Array = makeConstructor(4, packI32, unpackI32);
  var Uint32Array = makeConstructor(4, packU32, unpackU32);
  var Float32Array = makeConstructor(4, packF32, unpackF32);
  var Float64Array = makeConstructor(8, packF64, unpackF64);

  exports.Int8Array = exports.Int8Array || Int8Array;
  exports.Uint8Array = exports.Uint8Array || Uint8Array;
  exports.Uint8ClampedArray = exports.Uint8ClampedArray || Uint8ClampedArray;
  exports.Int16Array = exports.Int16Array || Int16Array;
  exports.Uint16Array = exports.Uint16Array || Uint16Array;
  exports.Int32Array = exports.Int32Array || Int32Array;
  exports.Uint32Array = exports.Uint32Array || Uint32Array;
  exports.Float32Array = exports.Float32Array || Float32Array;
  exports.Float64Array = exports.Float64Array || Float64Array;
}());

//
// 6 The DataView View Type
//

(function() {
  function r(array, index) {
    return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
  }

  var IS_BIG_ENDIAN = (function() {
    var u16array = new(exports.Uint16Array)([0x1234]),
        u8array = new(exports.Uint8Array)(u16array.buffer);
    return r(u8array, 0) === 0x12;
  }());

  // Constructor(ArrayBuffer buffer,
  //             optional unsigned long byteOffset,
  //             optional unsigned long byteLength)
  /** @constructor */
  var DataView = function DataView(buffer, byteOffset, byteLength) {
    if (arguments.length === 0) {
      buffer = new exports.ArrayBuffer(0);
    } else if (!(buffer instanceof exports.ArrayBuffer || ECMAScript.Class(buffer) === 'ArrayBuffer')) {
      throw new TypeError("TypeError");
    }

    this.buffer = buffer || new exports.ArrayBuffer(0);

    this.byteOffset = ECMAScript.ToUint32(byteOffset);
    if (this.byteOffset > this.buffer.byteLength) {
      throw new RangeError("byteOffset out of range");
    }

    if (arguments.length < 3) {
      this.byteLength = this.buffer.byteLength - this.byteOffset;
    } else {
      this.byteLength = ECMAScript.ToUint32(byteLength);
    }

    if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
      throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
    }

    configureProperties(this);
  };

  function makeGetter(arrayType) {
    return function(byteOffset, littleEndian) {

      byteOffset = ECMAScript.ToUint32(byteOffset);

      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
        throw new RangeError("Array index out of range");
      }
      byteOffset += this.byteOffset;

      var uint8Array = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),
          bytes = [], i;
      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
        bytes.push(r(uint8Array, i));
      }

      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
        bytes.reverse();
      }

      return r(new arrayType(new exports.Uint8Array(bytes).buffer), 0);
    };
  }

  DataView.prototype.getUint8 = makeGetter(exports.Uint8Array);
  DataView.prototype.getInt8 = makeGetter(exports.Int8Array);
  DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);
  DataView.prototype.getInt16 = makeGetter(exports.Int16Array);
  DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);
  DataView.prototype.getInt32 = makeGetter(exports.Int32Array);
  DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);
  DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);

  function makeSetter(arrayType) {
    return function(byteOffset, value, littleEndian) {

      byteOffset = ECMAScript.ToUint32(byteOffset);
      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
        throw new RangeError("Array index out of range");
      }

      // Get bytes
      var typeArray = new arrayType([value]),
          byteArray = new exports.Uint8Array(typeArray.buffer),
          bytes = [], i, byteView;

      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
        bytes.push(r(byteArray, i));
      }

      // Flip if necessary
      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
        bytes.reverse();
      }

      // Write them
      byteView = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
      byteView.set(bytes);
    };
  }

  DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);
  DataView.prototype.setInt8 = makeSetter(exports.Int8Array);
  DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);
  DataView.prototype.setInt16 = makeSetter(exports.Int16Array);
  DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);
  DataView.prototype.setInt32 = makeSetter(exports.Int32Array);
  DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);
  DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);

  exports.DataView = exports.DataView || DataView;

}());


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(2).extend,
  Exec = __webpack_require__(31),
  util = __webpack_require__(2);

/**
 * Represents a Container
 * @param {Object} modem docker-modem
 * @param {String} id    Container's ID
 */
var Container = function(modem, id) {
  this.modem = modem;
  this.id = id;

  this.defaultOptions = {
    top: {},
    start: {},
    commit: {},
    stop: {},
    pause: {},
    unpause: {},
    restart: {},
    resize: {},
    attach: {},
    remove: {},
    copy: {},
    kill: {},
    exec: {},
    rename: {},
    log: {},
    stats: {},
    getArchive: {},
    infoArchive: {},
    putArchive: {},
    update: {}
  };
};

Container.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Options}  opts     Options (optional)
 * @param  {Function} callback Callback, if supplied will query Docker.
 * @return {Object}            ID only and only if callback isn't supplied.
 */
Container.prototype.inspect = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/' + this.id + '/json?',
    method: 'GET',
    options: args.opts,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    }
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Rename
 * @param  {Object}   opts     Rename options
 * @param  {Function} callback Callback
 */
Container.prototype.rename = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.rename);

  var optsf = {
    path: '/containers/' + this.id + '/rename?',
    method: 'POST',
    statusCodes: {
      200: true,
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Update
 * @param  {Object}   opts     Update options
 * @param  {Function} callback Callback
 */
Container.prototype.update = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.update);

  var optsf = {
    path: '/containers/' + this.id + '/update',
    method: 'POST',
    statusCodes: {
      200: true,
      204: true,
      400: 'bad parameter',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Top
 * @param  {Object}   Options like 'ps_args' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.top = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.top);

  var optsf = {
    path: '/containers/' + this.id + '/top?',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Containers changes
 * @param  {Function} callback Callback
 */
Container.prototype.changes = function(callback) {
  var self = this;
  var optsf = {
    path: '/containers/' + this.id + '/changes',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Checkpoints list
 * @param  {Object}   opts     List checkpoints options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.listCheckpoint = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/' + this.id + '/checkpoints?',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Delete checkpoint
 * @param  {Object}   opts     Delete checkpoint options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.deleteCheckpoint = function(checkpoint, opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/' + this.id + '/checkpoints/' + checkpoint + '?',
    method: 'DELETE',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Create checkpoint
 * @param  {Object}   opts     Create checkpoint options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.createCheckpoint = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/containers/' + this.id + '/checkpoints',
    method: 'POST',
    allowEmpty: true,
    statusCodes: {
      200: true, //unofficial, but proxies may return it
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Export
 * @param  {Function} callback Callback with the octet-stream.
 */
Container.prototype.export = function(callback) {
  var self = this;
  var optsf = {
    path: '/containers/' + this.id + '/export',
    method: 'GET',
    isStream: true,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Start
 * @param  {Object}   opts     Container start options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.start = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.start);

  var optsf = {
    path: '/containers/' + this.id + '/start',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      304: 'container already started',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Pause
 * @param  {Object}   opts     Pause options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.pause = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.pause);

  var optsf = {
    path: '/containers/' + this.id + '/pause',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Unpause
 * @param  {Object}   opts     Unpause options (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.unpause = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.unpause);

  var optsf = {
    path: '/containers/' + this.id + '/unpause',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Setup an exec call to a running container
 *
 * @param {object} opts
 * @param {function} callback
 */
Container.prototype.exec = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.exec);

  var optsf = {
    path: '/containers/' + this.id + '/exec',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };


  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(new Exec(self.modem, data.Id));
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, new Exec(self.modem, data.Id));
    });
  }
};

/**
 * Commit
 * @param  {Object}   opts     Commit options like 'Hostname' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.commit = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.commit);

  args.opts.container = this.id;

  var optsf = {
    path: '/commit?',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Stop
 * @param  {Object}   opts     Container stop options, like 't' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.stop = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.stop);

  var optsf = {
    path: '/containers/' + this.id + '/stop?',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      304: 'container already stopped',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Restart
 * @param  {Object}   opts     Container restart options, like 't' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.restart = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.restart);

  var optsf = {
    path: '/containers/' + this.id + '/restart',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Kill
 * @param  {Object}   opts     Container kill options, like 'signal' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.kill = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.kill);

  var optsf = {
    path: '/containers/' + this.id + '/kill?',
    method: 'POST',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Container resize
 * @param  {[type]}   opts     Resize options. (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.resize = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.resize);

  var optsf = {
    path: '/containers/' + this.id + '/resize?',
    method: 'POST',
    statusCodes: {
      200: true,
      400: 'bad parameter',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Attach
 * @param  {Object}   opts     Attach options, like 'logs' (optional)
 * @param  {Function} callback Callback with stream.
 */
Container.prototype.attach = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.attach);

  var optsf = {
    path: '/containers/' + this.id + '/attach?',
    method: 'POST',
    isStream: true,
    hijack: args.opts.hijack,
    openStdin: args.opts.stdin,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, stream) {
        if (err) {
          return reject(err);
        }
        resolve(stream);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, stream) {
      args.callback(err, stream);
    });
  }
};

/**
 * Waits for a container to end.
 * @param  {Function} callback Callback
 */
Container.prototype.wait = function(callback) {
  var self = this;
  var optsf = {
    path: '/containers/' + this.id + '/wait',
    method: 'POST',
    statusCodes: {
      200: true,
      400: 'bad parameter',
      404: 'no such container',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Removes a container
 * @param  {Object}   opts     Remove options, like 'force' (optional)
 * @param  {Function} callback Callback
 */
Container.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.remove);

  var optsf = {
    path: '/containers/' + this.id + '?',
    method: 'DELETE',
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      400: 'bad parameter',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Copy (WARNING: DEPRECATED since RAPI v1.20)
 * @param  {Object}   opts     Copy options, like 'Resource' (optional)
 * @param  {Function} callback Callback with stream.
 */
Container.prototype.copy = function(opts, callback) {
  var self = this;
  console.log('container.copy is deprecated since Docker v1.8.x');
  var args = util.processArgs(opts, callback, this.defaultOptions.copy);

  var optsf = {
    path: '/containers/' + this.id + '/copy',
    method: 'POST',
    isStream: true,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * getArchive
 * @param  {Object}   opts     Archive options, like 'path'
 * @param  {Function} callback Callback with stream.
 */
Container.prototype.getArchive = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.getArchive);

  var optsf = {
    path: '/containers/' + this.id + '/archive?',
    method: 'GET',
    isStream: true,
    statusCodes: {
      200: true,
      400: 'client error, bad parameters',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * infoArchive
 * @param  {Object}   opts     Archive options, like 'path'
 * @param  {Function} callback Callback with stream.
 */
Container.prototype.infoArchive = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.infoArchive);

  var optsf = {
    path: '/containers/' + this.id + '/archive?',
    method: 'HEAD',
    isStream: true,
    statusCodes: {
      200: true,
      400: 'client error, bad parameters',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * putArchive
 * @param  {Object}   opts     Archive options, like 'path'
 * @param  {Function} callback Callback with stream.
 */
Container.prototype.putArchive = function(file, opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.putArchive);

  var optsf = {
    path: '/containers/' + this.id + '/archive?',
    method: 'PUT',
    file: file,
    isStream: true,
    statusCodes: {
      200: true,
      400: 'client error, bad parameters',
      403: 'client error, permission denied',
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Container logs
 * @param  {Object}   opts     Logs options. (optional)
 * @param  {Function} callback Callback with data
 */
Container.prototype.logs = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.log);

  var optsf = {
    path: '/containers/' + this.id + '/logs?',
    method: 'GET',
    isStream: true,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Container stats
 * @param  {Object}   opts     Stats options. (optional)
 * @param  {Function} callback Callback with data
 */
Container.prototype.stats = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.stats);
  var isStream = true;
  if (args.opts.stream === false) {
    isStream = false;
  }
  var optsf = {
    path: '/containers/' + this.id + '/stats?',
    method: 'GET',
    isStream: isStream,
    statusCodes: {
      200: true,
      404: 'no such container',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

module.exports = Container;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an image
 * @param {Object} modem docker-modem
 * @param {String} name  Image's name
 */
var Image = function(modem, name) {
  this.modem = modem;
  this.name = name;
};

Image.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Image.prototype.inspect = function(callback) {
  var self = this;

  var opts = {
    path: '/images/' + this.name + '/json',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such image',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      if (err) return callback(err, data);
      callback(err, data);
    });
  }
};

/**
 * Distribution
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Image.prototype.distribution = function(callback) {
  var self = this;

  var opts = {
    path: '/distribution/' + this.name + '/json',
    method: 'GET',
    statusCodes: {
      200: true,
      401: 'no such image',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      if (err) return callback(err, data);
      callback(err, data);
    });
  }
};

/**
 * History
 * @param  {Function} callback Callback
 */
Image.prototype.history = function(callback) {
  var self = this;
  var opts = {
    path: '/images/' + this.name + '/history',
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such image',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      if (err) return callback(err, data);
      callback(err, data);
    });
  }
};

/**
 * Get
 * @param  {Function} callback Callback with data stream.
 */
Image.prototype.get = function(callback) {
  var self = this;
  var opts = {
    path: '/images/' + this.name + '/get',
    method: 'GET',
    isStream: true,
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      if (err) return callback(err, data);
      callback(err, data);
    });
  }
};

/**
 * Push
 * @param  {Object}   opts     Push options, like 'registry' (optional)
 * @param  {Function} callback Callback with stream.
 * @param  {Object}   auth     Registry authentication
 */
Image.prototype.push = function(opts, callback, auth) {
  var self = this;
  var args = util.processArgs(opts, callback);
  var isStream = true;
  if (args.opts.stream === false) {
    isStream = false;
  }
  var optsf = {
    path: '/images/' + this.name + '/push?',
    method: 'POST',
    options: args.opts,
    authconfig: args.opts.authconfig || auth,
    isStream: isStream,
    statusCodes: {
      200: true,
      404: 'no such image',
      500: 'server error'
    }
  };

  delete optsf.options.authconfig;

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Tag
 * @param  {Object}   opts     Tag options, like 'repo' (optional)
 * @param  {Function} callback Callback
 */
Image.prototype.tag = function(opts, callback) {
  var self = this;
  var optsf = {
    path: '/images/' + this.name + '/tag?',
    method: 'POST',
    options: opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      201: true,
      400: 'bad parameter',
      404: 'no such image',
      409: 'conflict',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Removes the image
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Image.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);


  var optsf = {
    path: '/images/' + this.name + '?',
    method: 'DELETE',
    statusCodes: {
      200: true,
      404: 'no such image',
      409: 'conflict',
      500: 'server error'
    },
    options: args.opts
  };


  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

module.exports = Image;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents a volume
 * @param {Object} modem docker-modem
 * @param {String} name  Volume's name
 */
var Volume = function(modem, name) {
  this.modem = modem;
  this.name = name;
};

Volume.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Volume.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/volumes/' + this.name,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such volume',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Removes the volume
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Volume.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/volumes/' + this.name,
    method: 'DELETE',
    statusCodes: {
      204: true,
      404: 'no such volume',
      409: 'conflict',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

module.exports = Volume;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an network
 * @param {Object} modem docker-modem
 * @param {String} id  Network's id
 */
var Network = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Network.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Id only if callback isn't specified.
 */
Network.prototype.inspect = function(callback) {
  var self = this;

  var opts = {
    path: '/networks/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such network',
      500: 'server error'
    }
  };


  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(opts, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(opts, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Removes the network
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Network.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/networks/' + this.id,
    method: 'DELETE',
    statusCodes: {
      200: true,
      204: true,
      404: 'no such network',
      409: 'conflict',
      500: 'server error'
    },
    options: args.opts
  };


  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Connects a container to a network
 * @param  {[Object]}   opts     Connect options (optional)
 * @param  {Function} callback Callback
 */
Network.prototype.connect = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/networks/' + this.id + '/connect',
    method: 'POST',
    statusCodes: {
      200: true,
      201: true,
      404: 'network or container is not found',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Disconnects a container from a network
 * @param  {[Object]}   opts     Disconnect options (optional)
 * @param  {Function} callback Callback
 */
Network.prototype.disconnect = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/networks/' + this.id + '/disconnect',
    method: 'POST',
    statusCodes: {
      200: true,
      201: true,
      404: 'network or container is not found',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};




module.exports = Network;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an Service
 * @param {Object} modem docker-modem
 * @param {String} id    Service's ID
 */
var Service = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Service.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Query Docker for service details.
 *
 * @param {function} callback
 */
Service.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/services/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such service',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Delete Service
 *
 * @param {function} callback
 */
Service.prototype.remove = function(callback) {
  var self = this;
  var optsf = {
    path: '/services/' + this.id,
    method: 'DELETE',
    statusCodes: {
      200: true,
      204: true,
      404: 'no such service',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Update service
 *
 * @param {object} options
 * @param {function} callback
 */
Service.prototype.update = function(auth, opts, callback) {
  var self = this;
  if (!callback) {
    var t = typeof opts;
    if(t === 'function'){
      callback = opts;
      opts = auth;
      auth = opts.authconfig || undefined;
    } else if (t === 'undefined'){
      opts = auth;
      auth = opts.authconfig || undefined;
    }
  }

  var optsf = {
    path: '/services/' + this.id + '/update?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'no such service',
      500: 'server error'
    },
    authconfig: auth,
    options: opts
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};



/**
 * Service logs
 * @param  {Object}   opts     Logs options. (optional)
 * @param  {Function} callback Callback with data
 */
Service.prototype.logs = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, {});

  var optsf = {
    path: '/services/' + this.id + '/logs?',
    method: 'GET',
    isStream: true,
    statusCodes: {
      200: true,
      404: 'no such service',
      500: 'server error',
      503: 'node is not part of a swarm'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};



module.exports = Service;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents a plugin
 * @param {Object} modem docker-modem
 * @param {String} name  Plugin's name
 */
var Plugin = function(modem, name, remote) {
  this.modem = modem;
  this.name = name;
  this.remote = remote || name;
};

Plugin.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Plugin.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/plugins/' + this.name,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'plugin is not installed',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Removes the plugin
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '?',
    method: 'DELETE',
    statusCodes: {
      200: true,
      404: 'plugin is not installed',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      if (err) return args.callback(err, data);
      args.callback(err, data);
    });
  }
};

/**
 * get privileges
 * @param  {Function} callback Callback
 * @return {Object}            Name only if callback isn't specified.
 */
Plugin.prototype.privileges = function(callback) {
  var self = this;
  var optsf = {
    path: '/plugins/privileges?',
    method: 'GET',
    options: {
      'remote': this.remote
    },
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


/**
 * Installs a new plugin
 * @param {Object}   opts     Create options
 * @param {Function} callback Callback
 */
Plugin.prototype.pull = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  if(args.opts._query && !args.opts._query.name) {
    args.opts._query.name = this.name;
  }
  if(args.opts._query && !args.opts._query.remote) {
    args.opts._query.remote = this.remote;
  }

  var optsf = {
    path: '/plugins/pull?',
    method: 'POST',
    isStream: true,
    options: args.opts,
    statusCodes: {
      200: true, // unofficial, but proxies may return it
      204: true,
      500: 'server error'
    }
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Enable
 * @param  {Object}   opts     Plugin enable options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.enable = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/enable?',
    method: 'POST',
    statusCodes: {
      200: true,
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Disable
 * @param  {Object}   opts     Plugin disable options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.disable = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/disable',
    method: 'POST',
    statusCodes: {
      200: true,
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * Push
 * @param  {Object}   opts     Plugin push options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.push = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/push',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'plugin not installed',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};

/**
 * COnfigure
 * @param  {Object}   opts     Plugin configure options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.configure = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/set',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'plugin not installed',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


/**
 * Upgrade plugin
 *
 * @param {object} options
 * @param {function} callback
 */
Plugin.prototype.upgrade = function(auth, opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = auth;
    auth = opts.authconfig || undefined;
  }

  var optsf = {
    path: '/plugins/' + this.name + '/upgrade?',
    method: 'POST',
    statusCodes: {
      200: true,
      204: true,
      404: 'plugin not installed',
      500: 'server error'
    },
    authconfig: auth,
    options: opts
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


module.exports = Plugin;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents a secret
 * @param {Object} modem docker-modem
 * @param {String} id  Secret's id
 */
var Secret = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Secret.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Secret.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/secrets/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'secret not found',
      406: 'node is not part of a swarm',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Update a secret.
 *
 * @param {object} options
 * @param {function} callback
 */
Secret.prototype.update = function(opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
  }

  var optsf = {
    path: '/secrets/' + this.id + '/update?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'secret not found',
      500: 'server error'
    },
    options: opts
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


/**
 * Removes the secret
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Secret.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/secrets/' + this.id,
    method: 'DELETE',
    statusCodes: {
      200: true,
      204: true,
      404: 'secret not found',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};



module.exports = Secret;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents a config
 * @param {Object} modem docker-modem
 * @param {String} id  Config's id
 */
var Config = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Config.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Config.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/configs/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'config not found',
      500: 'server error',
      503: 'node is not part of a swarm'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Update a config.
 *
 * @param {object} options
 * @param {function} callback
 */
Config.prototype.update = function(opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
  }

  var optsf = {
    path: '/configs/' + this.id + '/update?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'config not found',
      500: 'server error',
      503: 'node is not part of a swarm'
    },
    options: opts
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


/**
 * Removes the config
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Config.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/configs/' + this.id,
    method: 'DELETE',
    statusCodes: {
      200: true,
      204: true,
      404: 'config not found',
      500: 'server error',
      503: 'node is not part of a swarm'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};



module.exports = Config;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an Task
 * @param {Object} modem docker-modem
 * @param {String} id    Task's ID
 */
var Task = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Task.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Query Docker for Task details.
 *
 * @param {object} options
 * @param {function} callback
 */
Task.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/tasks/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'unknown task',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};

/**
 * Task logs
 * @param  {Object}   opts     Logs options. (optional)
 * @param  {Function} callback Callback with data
 */
Task.prototype.logs = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback, this.defaultOptions.log);

  var optsf = {
    path: '/tasks/' + this.id + '/logs?',
    method: 'GET',
    isStream: args.opts.follow || false,
    statusCodes: {
      101: true,
      200: true,
      404: 'no such container',
      500: 'server error',
      503: 'node is not part of a swarm'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


module.exports = Task;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2);

/**
 * Represents an Node
 * @param {Object} modem docker-modem
 * @param {String} id    Node's ID
 */
var Node = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

Node.prototype[__webpack_require__(0).inspect.custom] = function() { return this; };

/**
 * Query Docker for Node details.
 *
 * @param {object} options
 * @param {function} callback
 */
Node.prototype.inspect = function(callback) {
  var self = this;

  var optsf = {
    path: '/nodes/' + this.id,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'no such node',
      500: 'server error'
    }
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


/**
 * Update a node.
 *
 * @param {object} options
 * @param {function} callback
 */
Node.prototype.update = function(opts, callback) {
  var self = this;
  if (!callback && typeof opts === 'function') {
    callback = opts;
  }

  var optsf = {
    path: '/nodes/' + this.id + '/update?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'no such node',
      406: 'node is not part of a swarm',
      500: 'server error'
    },
    options: opts
  };

  if(callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        self.output = data;
        resolve(self);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }
};


/**
 * Remove a Node.
 * Warning: This method is not documented in the API.
 *
 * @param {object} options
 * @param {function} callback
 */
Node.prototype.remove = function(opts, callback) {
  var self = this;
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/nodes/' + this.id + '?',
    method: 'DELETE',
    statusCodes: {
      200: true,
      404: 'no such node',
      500: 'server error'
    },
    options: args.opts
  };

  if(args.callback === undefined) {
    return new this.modem.Promise(function(resolve, reject) {
      self.modem.dial(optsf, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } else {
    this.modem.dial(optsf, function(err, data) {
      args.callback(err, data);
    });
  }
};


module.exports = Node;


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_yarn_install__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_yarn_install___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_yarn_install__);


/**
 * scaffold - Scaffold action
 *
 * @async
 * @param {clippedConfig} [config={}]
 *
 */
var scaffold = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig();
    var type, scaffoldPath;
    return __WEBPACK_IMPORTED_MODULE_0__home_iniz_nvm_versions_node_v8_7_0_lib_node_modules_clipped_clips_npm_wrapper_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = config.type;

            // Copy scaffold into folder and install dependencies

            _context.next = 3;
            return getClipPath(type, 'scaffold');

          case 3:
            scaffoldPath = _context.sent;
            _context.next = 6;
            return ncp(scaffoldPath, cwd);

          case 6:
            _context.next = 8;
            return __WEBPACK_IMPORTED_MODULE_1_yarn_install___default()({ cwd: cwd });

          case 8:

            console.log('\n    Scaffolding is done!\n    npm run dev # or npm run build\n  ');

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function scaffold() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var _require = __webpack_require__(6),
    cwd = _require.cwd;

var _require2 = __webpack_require__(10),
    ncp = _require2.ncp;

var _require3 = __webpack_require__(8),
    getConfig = _require3.getConfig,
    getClipPath = _require3.getClipPath;

/* harmony default export */ __webpack_exports__["a"] = (scaffold);

/***/ })
/******/ ]);
//# sourceMappingURL=index.map