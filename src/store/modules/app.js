import * as types from '../mutation-types'

const app = {
  state: {
    opened: true
  },
  mutations: {
    [types.SET_TOGGLE_SIDEBAR] (state) {
      state.opened = !state.opened
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit(types.SET_TOGGLE_SIDEBAR)
    }
  }
}

export default app
