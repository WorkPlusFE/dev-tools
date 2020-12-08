const state = () => ({
  roles: [],
});

const mutations = {
  create(state, role) {
    state.roles = [role];
  },

  delete(state, roleId) {
    const index = state.roles.findIndex(role => role.id === roleId);
    state.roles.splice(index, 1);
  },

  update(state, role) {
    const index = state.roles.findIndex(role => role.id === role.id);
    state.roles.splice(index, 1, role);
  },
};

const actions = {
  create(context, role) {
    context.commit('create', role);
  },

  delete(context, roleId) {
    context.commit('delete', roleId);
  },

  update(context, role) {
    context.commit('update', role);
  },
};

const getters = {
  roles: (state) => state.roles,

  isEmpty: (state) => state.roles.length === 0,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

