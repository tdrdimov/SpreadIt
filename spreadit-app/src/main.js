import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import './plugins/moment';
import { router } from './routes.js'
import './assets/main.scss'

Vue.config.productionTip = false

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333/api'

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
