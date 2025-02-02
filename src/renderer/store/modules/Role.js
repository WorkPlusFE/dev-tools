const state = () => ({
  roles: [],
});

const mutations = {
  create(state, role) {
    state.roles.unshift(role);
  },

  delete(state, roleId) {
    const index = state.roles.findIndex(role => role.id === roleId);
    state.roles.splice(index, 1);
  },

  update(state, data) {
    const index = state.roles.findIndex(role => role.id === data.id);
    state.roles.splice(index, 1, data);
  },

  sort(state) {
    state.roles.sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
  },
};

const actions = {
  create(context, role) {
    context.commit('create', role);
    context.commit('sort');
  },

  delete(context, roleId) {
    context.commit('delete', roleId);
    context.commit('sort');
  },

  update(context, role) {
    context.commit('update', role);
    context.commit('sort');
  },
};

const getters = {
  getRoleByName: (state) => (name) => state.roles.find((role) => role.name === name),
  getRoleById: (state) => (id) => state.roles.find((role) => role.id === id),
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

