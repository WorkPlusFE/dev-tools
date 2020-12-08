const state = {
  apps: [],
};

const mutations = {
  create(state, app) {
    state.apps.push(app);
  },

  delete(state, appId) {
    const index = state.apps.findIndex(app => app.id === appId);
    state.apps.splice(index, 1);
  },

  update(state, app) {
    const index = state.apps.findIndex(app => app.id === app.id);
    state.apps.splice(index, 1, app);
  },
};

const actions = {
  create(context, app) {
    context.commit('create', app);
  },

  delete(context, appId) {
    context.commit('delete', appId);
  },

  update(context, app) {
    context.commit('update', app);
  },
};

const getters = {
  searchByQuery: (state) => (query) => state.apps.find(app => app.name.indexOf(query) > -1),

  apps: (state) => state.apps,

  isEmpty: (state) => state.apps.length === 0,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

