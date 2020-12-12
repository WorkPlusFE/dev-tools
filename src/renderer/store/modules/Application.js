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

  sort(state) {
    state.apps.sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
  },
};

const actions = {
  create(context, app) {
    context.commit('create', app);
    context.commit('sort');
  },

  delete(context, appId) {
    context.commit('delete', appId);
    context.commit('sort');
  },

  update(context, app) {
    context.commit('update', app);
    context.commit('sort');
  },
};

const getters = {
  searchByQuery: (state) => (query) => {
    if (query.trim() === '') return state.apps;
    return state.apps.filter(app => app.name.indexOf(query) > -1);
  },

  getAppByName: (state) => (name) => {
    return state.apps.find((app) => app.name === name);
  },

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

