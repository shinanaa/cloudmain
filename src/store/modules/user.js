import * as types from '../mutation-types'
import {ERR_CODE} from 'common/js/config'
import {loginByUsername, logout} from '@/api/login'
import {getRouter, setRouter, removeRouter, getUserLogin, setUserLogin, removeUserLogin, setUserName, getUserName, removeUserName} from 'common/js/cache'

const user = {
  state: {
    roles: '平台管理员',
    routerList: getRouter(),
    userLogin: getUserLogin(),
    userName: getUserName()
  },
  mutations: {
    [types.SET_USER_LOGIN] (state, userLogin) {
      state.userLogin = userLogin
    },
    [types.SET_USER_NAME] (state, mc) {
      state.userName = mc
    },
    [types.SET_ROUTER] (state, routerList) {
      state.routerList = routerList
    }
  },
  actions: {
    LoginByUsername ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then((res) => {
          console.log(111)
          console.log(res)
          console.log(222)
          const data = res
          if (data.errcode === ERR_CODE) {
            commit(types.SET_USER_LOGIN, data.authorization)
            // setToken(data.authorization)
            commit(types.SET_USER_NAME, data.mc)
            commit(types.SET_ROUTER, data.dz)
            commit(types.SET_USER_LOGIN, data.dm)
            setRouter(data.dz)
            setUserLogin(data.dm)
            setUserName(data.mc)
            // 还需提交用户的当前角色,后端未开发功能
          }
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logOut ({commit, state}, url) {
      return new Promise((resolve, reject) => {
        logout(url).then((res) => {
          console.log(res)
          commit(types.SET_ROUTER, [])
          commit(types.SET_USER_NAME, '')
          commit(types.SET_USER_LOGIN, '')
          removeRouter()
          removeUserLogin()
          removeUserName()
          resolve()
        })
      })
    }
  }
}

export default user
