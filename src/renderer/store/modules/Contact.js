import _ from 'lodash';
import{ v4 } from 'uuid'
const state = () => ({
    orgs: [],
    token: '',
    role: {},
    random:v4()
  });
  
  const mutations = {
    setOrgs(state,orgs) {
        state.orgs = orgs;
    },
    setToken(state,token) {
      state.token = token
    },
    setRole(state,role) {
      state.role = role;
    },
    changeOrgs(state,org) {
      const index = _.findIndex(state.orgs,(o)=>o.id == org.id);
      if(index !=- 1){
        state.orgs.splice(index,1,org);
      }else{
        state.random = v4();
      }
    }
  };
  
  const actions = {
    setOrgs({commit},orgs) {
        commit('setOrgs',orgs)
    },
    setToken({commit},token) {
      commit('setToken',token)
    },
    setRole({commit},role) {
      commit('setRole',role);
    },
    changeOrgs({commit},org){
      commit('changeOrgs',org);
    }
  };
  
  const getters = {
    orgsDatas:(state) => {

    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  
  