const state = {
  dark: true,
  isZhCnLng: true,
  createRoleFirst: false,
};

const mutations = {
  CHANGE_DARK(state, value) {
    state.dark = value;
  },
  CHANGE_LANGUAGE(state, value) {
    state.isZhCnLng = value;
  },
  CHANGE_CREATE_ROLE_FIRST(state, value) {
    state.createRoleFirst = value;
  }
};

const actions = {
  changedark({ commit }, value) {
    commit('CHANGE_DARK', value);
  },
  changeLanguage({ commit }, value) {
    commit('CHANGE_LANGUAGE', value);
  },
  changeCreateRoleFirst({ commit }, value) {
    commit('CHANGE_CREATE_ROLE_FIRST', value);
  },
};

const getters = {
  createRoleFirst: (state) => state.createRoleFirst,
  isZhCnLng: (state) => state.isZhCnLng,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
