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

  update(state, data) {
    const index = state.apps.findIndex(app => app.id === data.id);
    state.apps.splice(index, 1, data);
  },

  // 需要注意置顶的排序
  sort(state) {
    state.apps.sort((a, b) => b.lastUpdateTime - a.lastUpdateTime).sort((a, b) => b.top - a.top);
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

  setTop(context, app) {
    app = { ...app, top: 1, lastUpdateTime: Date.now() };
    context.commit('update', app);
    context.commit('sort');
  },

  cancelTop(context, app) {
    app = { ...app, top: 0, lastUpdateTime: Date.now() };
    context.commit('update', app);
    context.commit('sort');
  },
};

const getters = {
  searchByQuery: (state) => (query) => {
    if (query.trim() === '') return state.apps;
    return state.apps.filter(app => app.name.indexOf(query) > -1);
  },

  getAppByName: (state) => (name) => state.apps.find((app) => app.name === name),

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

