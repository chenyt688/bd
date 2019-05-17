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
import echarts from 'echarts'

import verifyCode from "../static/js/VerifyCode.js"
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.use(verifyCode);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;    //将echarts注册成Vue的全局属性
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'

});
router.beforeEach((to, from, next) => {     //权限拦截，非管理员不能访问志愿者信息管理界面
  if(to.path =='/userManager'){
    if(store.state.roleId == '2'){
      next();
    }else {
      next({path:'/'});
    }
  }else {
    next();
  }
});

