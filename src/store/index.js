import Vue from 'vue'
import Vuex from 'vuex'
import { setUser, getUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化直接从本地存储获取用户信息
    user: getUser()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      setUser(user)
    }
  },
  actions: {

  }
})
