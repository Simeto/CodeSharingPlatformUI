import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Api from './api.js'
import store from './store/store.js'
import Snotify from 'vue-snotify'
import VueTippy, { TippyComponent } from "vue-tippy";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-snotify/styles/material.css'
import "tippy.js/themes/light.css";

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.use(Api, {
  store
})
Vue.use(Snotify)
Vue.use(VueTippy)
Vue.component("tippy", TippyComponent);
export const EventBus = new Vue();
new Vue({
  store,
  router,
  data: {
    isL: false,
    isR: false
  },
  render: h => h(App)
}).$mount('#app')
