import _ from 'lodash';
import{ v4 } from 'uuid'
const state = () => ({
    orgs: [],
    token: '',
    role: {},
    random:v4(),
    selectContact: []
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
    },
    changeSelectContact(state,obj) {
      const { data,isAdd,isArr } = obj;
      if(isArr){
        if(isAdd){
          state.selectContact = state.selectContact.concat(data);
        }else{
          _.forEach(data,(item) => {
            const index = _.findIndex(state.selectContact,(o)=>o.user_id == item.user_id);
            if(index != -1){
              state.selectContact.splice(index,1);
            }
          })
        }
      }else{
        if(isAdd){
          state.selectContact.push(data);
        }else{
          const index = _.findIndex(state.selectContact,(o)=>o.user_id == data.user_id);
          if(index != -1){
            state.selectContact.splice(index,1);
          }
        }
      }
    },
    delectSelectContact(state) {
      state.selectContact = [];
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
    },
    changeSelectContact({ commit },obj){
      commit('changeSelectContact',obj);
    },
    delectSelectContact({commit}) {
      commit('delectSelectContact');
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
  
  