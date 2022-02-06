import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Test',
    counter: 3
  },
  mutations: {
    user (state, user) {
      state.user = user
    }
  },
  actions: {
    user (context, user) {
      context.commit('user', user)
    }
  },
  getters: {
    user: (state) => {
      return state.user
    }
  }
})
