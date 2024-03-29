import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state) => ({
      user: state.user,
      all_users: state.all_users,
      groups: state.groups
    })
  })],
  state: {
    user: null,
    flashed: { message: 'Welcome to Wo Pien!', success: true },
    sessions: null,
    groups: [{ name: 'Saufen', members: ['Fredo', 'Ole', 'Tim'] }, { name: 'Piener Verein', members: ['S9, Frodo, Nils, Luca'] }],
    all_users: null
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
    },
    all_users (state, allUsers) {
      state.all_users = allUsers
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
    },
    all_users (context, allUsers) {
      context.commit('all_users', allUsers)
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
    },
    all_users: (state) => {
      return state.all_users
    }
  }
})
