const state = {
    token: "token",
};

const mutations = {
    settoken(state, token) {
        state.token = token;
    }
};

const actions = {
    settoken(context, token) {
        context.commit('settoken', token);
    }
};

export default {
    state,
    mutations,
    actions,
};

