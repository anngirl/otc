// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$axios = axios;
// element
import { Message } from 'element-ui';
Vue.prototype.$message = Message
Vue.component(Message.name, Message)

// vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
