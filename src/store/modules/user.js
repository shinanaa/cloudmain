import * as types from '../mutation-types'
import {ERR_CODE} from 'common/js/config'
import {loginByUsername} from '@/api/login'
const user = {
  state: {
    mc: '',
    roles: '平台管理员',
    token: ''
  },
  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_USER_NAME] (state, mc) {
      state.mc = mc
    }
  },
  actions: {
    LoginByUsername ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then((res) => {
          console.log(res)
          const data = res
          if (data.errcode === ERR_CODE) {
            commit(types.SET_TOKEN, data.authorization)
            commit(types.SET_USER_NAME, data.mc)
            // 还需提交用户的当前角色,后端未开发功能
          }
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        commit(types.SET_TOKEN, '')
        commit(types.SET_USER_NAME, '')
        resolve()
      })
    }
  }
}

export default user
