import Vue from 'vue'
import App from './App'
import './assets/reset.css'
import 'whatwg-fetch'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
