import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    flashed: { message: 'Welcome to Wo Pien!', success: true },
    sessions: [
      {
        name: 'Test'
      },
      {
        name: 'Test2'
      }
    ]
  },
  mutations: {
    user (state, user) {
      state.user = user
    },
    flashed (state, flashed) {
      state.flashed = flashed
    }
  },
  actions: {
    user (context, user) {
      context.commit('user', user)
    },
    flashed (context, flashed) {
      context.commit('flashed', flashed)
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    sessions: (state) => {
      return state.sessions
    },
    flashed: (state) => {
      return state.flashed
    }

  }
})
