/* eslint-disable */
import Vue from 'vue'
import './plugins/bootstrap-vue';
import App from './App.vue'
import router from './router'
import store from './store'

import ApiClient from './mixins/ApiClient';

// Logging
import VueLogger from 'vuejs-logger/dist';
const loggingOptions = {
  isEnabled: true,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  showLogLevel: true,
  showMethodName: true,
  showConsoleColors: true,
};
Vue.use(VueLogger, loggingOptions);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
