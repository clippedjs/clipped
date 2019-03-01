import test from 'ava'
import {createChainable, nestChainable} from './src'

test ('path', t => {
  const deepObject = createChainable({
    a: {
      b: {
        c: {
          d: 1,
          f: ['a', 'b'],
          g: 3
        }
      }
    }
  })

  deepObject['a.b.c.j'] = 2

  deepObject.update('a.b.c.g', v => v+1)

  deepObject.delete('a.b.c.d')

  deepObject.set('a.b.c.f.z', 100)

  class ABC {}

  deepObject.prepend('a.b.c.f', 20)

  deepObject.use('a.b.c.f.q', ABC, [{aa: 'cc', f: 1000}])

  deepObject.update('a.b.c.f.q.args', args => [...args, {c: 'd'}])
  t.pass()
})

test('rollup', t => {
  const rollupChain = createChainable({
    input: 'src/index.js',
    external: ['d3'],
    output: [],
    plugins: [],
    globals: {abc: 'abx'},
    sourcemap: true,
    watch: {
      include: ['abc'],
      exclude: []
    }
  })

  function ABC (a, b) {
    return a + b
  }

  rollupChain
    .mark()
      .globals
        .set('$', 'jQuery')
        .set('vue', 'vue/dist/vue.js')
        .set('d3', 'dd')
        .set('css', {
          test: /.css$/,
          loader: 'css-loaer',
          options: {
            plugins: ['abc']
          }
        })
          .css.options.plugins.set('eee', 'qqq')
    .back()
      .watch
      .mark()
        .include
        .add('qq', 'bb')
      .back()
        .exclude
        .add('xx', 'zz')
    .back()
  .back()
    .plugins
      .use('define', ABC, [{gg: 'gsg'}])
      .use('defidne', ABC, [{gg: 'gg'}])

  rollupChain.input = 'zzz'

  rollupChain.globals.abc = 'ddd'

  rollupChain.add('z', {
    dd: 'oo',
    qq: {
      cc: 'dd'
    }
  })
    .z.qq.set('dd', 'ee')

  rollupChain.plugins.define
    .modify('args', args => [...args, {qq: 'ss'}])

  rollupChain.update('plugins.define.args', args => [...args, {zz: 'aa'}])

  // console.log(JSON.stringify(rollupChain.plugins.define.args, null, 2))

  t.pass()
})

test('context', t => {
  const chain = createChainable({
    a: {
      b: {
        c: 10
      }
    }
  })

  t.is(chain['a.b'].set('c', 11)._id, chain['a'].b._id)
})

test('webpack', t => {
  const config = createChainable({})

  config.src = 'src'
  config.context = 'context'
  config.dist = 'dist'

  config['webpack'] = {
    context: config.context,
    entry: {
      index: [config.src + 'index.js']
    },
    output: {
      pathinfo: true,
      path: config.dist
    },
    externals: {
      // react-native and nodejs socket excluded to make skygear work
      'react-native': 'undefined',
      'websocket': 'undefined'
    },
    resolveLoader: {
      modules: [
        'node_modules'
      ]
    },
    resolve: {
      alias: {
        '@': config.src,
        '~': config.src
      },
      extensions: ['*', '.js', '.vue', '.jsx', '.json', '.marko', '.ts', '.tsx'],
      modules: [
        'node_modules'
      ]
    },
    performance: {
      hints: false
    },
    devtool: false,
    plugins: [],
    module: {
      rules: []
    }
  }

  config.webpack.plugins.push('a')

  config.webpack.plugins.use('clean', () => {}, [['dist'], {
    root: 'toor'
  }])

  config.webpack
    .module
      .rules
        .set('js', {
          test: /\.jsx?$/,
          include: ['src'],
          exclude: /(node_modules|bower_components)/,
          use: []
        })
          ['js.use']
            .push('qq')

  config.webpack
    .set('module.rules.js.include', ['somesrc'])
    ['output']
      .set('path', 'somewhere')
      .delete('filename')

  t.truthy(typeof config.webpack['module.rules.js'].use.set === 'function')
})

test('key-value', t => {
  const config = createChainable({
    rules: [{
      key: 'babel',
      value: 'babel-loader'
    }]
  })

  t.is(config['rules.babel'], 'babel-loader')
})

test('alias', t => {
  const config = createChainable({
    abc: {},
    qq: 'dd'
  })

  config.alias('abc.xyz', () => config.qq)
  t.is(config['abc.xyz'].toConfig(), 'dd')
})

test('when', t => {
  const config = createChainable({
    abc: {},
    qq: 'dd'
  })

  config.$when(() => true, () => config.abc = '10')
  t.is(config.toConfig().abc, '10')
})

test('fallback to first element', t => {
  const config = createChainable({
    abc: [{
      cd: 'ff'
    }, {
      jk: 47
    }],
    qq: 'dd'
  })

  t.is(config.abc.cd, 'ff')

  config.abc.cd = 100

  t.is(config.abc.cd, 100)
  console.log(config.abc.toConfig())
})
