import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

// Default State values
export const DEFAULT_STATE = {
  token: null,
  user: {
    profile: {
      fullname: null
    }
  },
  is_logged: false,
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: DEFAULT_STATE.token,
    user: DEFAULT_STATE.user,
    is_logged: DEFAULT_STATE.is_logged,
  },
  mutations: {
    ['SET_TOKEN'] (state, token) {
      state.token = token

    },
    ['SET_USER'] (state, user) {
      state.user = user
    },
    ['SET_ISLOGGED'] (state, is_logged) {
      state.is_logged = is_logged
    },
  },
  actions: {
    setToken (context, token) {
      context.commit('SET_TOKEN', token)
    },
    setUser (context, user) {
      context.commit('SET_USER', user)
    },
    setIsLogged(context, is_logged) {
      context.commit('SET_ISLOGGED', is_logged)
    },
    setLogOut(context) {
      context.commit('SET_TOKEN', DEFAULT_STATE.token)
      context.commit('SET_USER', DEFAULT_STATE.user)
      context.commit('SET_ISLOGGED', DEFAULT_STATE.is_logged)
    },
  }
})
