import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      user: null,
      env: {}
    },
    mutations: {
      setAny(state, params) {
        Object.assign(state, params)
      }
    },
    actions: {
      login({state}) {
        const path = this.$router.currentRoute.path
        window.location.href = `${state.env.publicUrl}/api/session/login?redirect=${state.env.publicUrl}${path}?id_token=`
      },
      async logout({commit}) {
        await this.$axios.post('api/session/logout')
        commit('setAny', {user: null})
        this.$router.push('/')
      },
      nuxtServerInit({commit, dispatch}, {req, env}) {
        commit('setAny', {env, user: req.user})
      }
    }
  })
}
