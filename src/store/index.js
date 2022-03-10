import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    flashed: { message: 'Welcome to Wo Pien!', success: true },
    sessions: null
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
    }
  }
})
