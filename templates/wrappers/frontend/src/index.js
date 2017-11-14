// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})

// import React from 'react'
// import ReactDOM from 'react-dom'
//
// const App = () => (
//   <h1>App</h1>
// )
//
// ReactDOM.render(<App />, document.getElementById('app'))
