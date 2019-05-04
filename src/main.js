// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
import $ from 'jquery'
import store from './store'

import verifyCode from "../static/js/VerifyCode.js"
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.use(verifyCode);
Vue.use(ElementUI);
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'

})
