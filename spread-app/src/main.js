import Vue from 'vue'
import App from './App'
import axios from 'axios'
import './main.scss'
import { router } from './routes.js'
import './plugins/moment.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
const opts = {}
export default new Vuetify(opts)

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  vuetify: new Vuetify(),
  poll: true,
  components: { App },
  render: h => h(App)
})
