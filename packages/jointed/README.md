# Jointed

> Modify configurations like a boss

```js
config = createChainable({
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: []
  }
})

config
  .set('module.rules.js', {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {}
      }
    ]
  })

config
  ['module.rules']
    .set('js.include', ['somesrc'])
    .delete('js.exclude')
```
