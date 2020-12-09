import Vue from 'vue';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import messages from './i18n';

Vue.prototype.$store = store;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale:'zh-CN',
  messages,
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>',
}).$mount('#app');
