import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/reset.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueResource from 'vue-resource'
//import http from '@/api/config'

Vue.config.productionTip = false
//Vue.prototype.$http = http
Vue.use(vueResource)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
