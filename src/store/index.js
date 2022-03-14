import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    flashed: { message: 'Welcome to Wo Pien!', success: true },
    sessions: null,
    groups: [{ name: 'Saufqwdwqen', members: ['Fredo', 'Ole', 'Tim'] }, { name: 'Dickus pIenuadadaw', members: ['Fredo', 'Ole', 'Tim'] },
      { name: 'Saufen', members: ['Fredo', 'Ole', 'Tim'] }, { name: 'Saufen', members: ['Fredo', 'Ole', 'Tim'] }]
  },
  mutations: {
    user (state, user) {
      state.user = user
    },
    flashed (state, flashed) {
      state.flashed = flashed
    },
    sessions (state, sessions) {
      state.sessions = sessions
    },
    groups (state, groups) {
      state.groups = groups
    }
  },
  actions: {
    user (context, user) {
      context.commit('user', user)
    },
    flashed (context, flashed) {
      context.commit('flashed', flashed)
    },
    sessions (context, sessions) {
      context.commit('sessions', sessions)
    },
    groups (context, groups) {
      context.commit('groups', groups)
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    flashed: (state) => {
      return state.flashed
    },
    sessions: (state) => {
      return state.sessions
    },
    groups: (state) => {
      return state.groups
    }
  }
})
