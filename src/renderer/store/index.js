import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [new VuexPersistence({
    reducer: state => ({
      Application: state.Application,
      Role: state.Role,
      Setting: state.Setting
    })
  }).plugin],
  strict: process.env.NODE_ENV !== 'production',
});
