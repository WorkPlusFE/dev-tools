const state = {
    dark: true,
    isZhCnLng: true,
};
  
const mutations = {
    CHANGE_DARK(state,value) {
        state.dark = value;
    },
    CHANGE_LANGUAGE(state,value) {
        state.isZhCnLng = value;
    }
};

const actions = {
    changedark({ commit },value) {
        commit('CHANGE_DARK',value);
    },
    changeLanguage({ commit },value) {
        commit('CHANGE_LANGUAGE',value);
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions,
};