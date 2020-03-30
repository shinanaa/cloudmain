import * as types from '../mutation-types'
import {ERR_CODE} from 'common/js/config'
import {loginByUsername, logout} from '@/api/login'
import {setToken, getToken, removeToken, getUserLogin, setUserLogin, removeUserLogin, setUserName, getUserName, removeUserName, setUserRole, getUserRole, setUserRoleId, removeUserRoleId, getUserRoleId, removeUserRole, removePluginList} from 'common/js/cache'

const user = {
  state: {
    token: getToken(),
    role: getUserRole(),
    roleId: getUserRoleId(),
    userLogin: getUserLogin(),
    userName: getUserName()
  },
  mutations: {
    [types.SET_USER_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_USER_LOGIN] (state, userLogin) {
      state.userLogin = userLogin
    },
    [types.SET_USER_NAME] (state, mc) {
      state.userName = mc
    },
    [types.SET_ROUTER] (state, moduleList) {
      state.moduleList = moduleList
    },
    [types.SET_USER_ROLE] (state, role) {
      state.role = role
    },
    [types.SET_USER_ROLE_ID] (state, roleId) {
      state.roleId = roleId
    }
  },
  actions: {
    changeRole ({commit}, role) {
      commit(types.SET_USER_ROLE_ID, role.jsid)
      commit(types.SET_USER_ROLE, role.mc)
      setUserRole(role.mc)
      setUserRoleId(role.jsid)
    },
    LoginByUsername ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then((res) => {
          console.log(res)
          const data = res
          if (data.errcode === ERR_CODE) {
            commit(types.SET_USER_TOKEN, data.authorization)
            commit(types.SET_USER_NAME, data.mc)
            commit(types.SET_USER_LOGIN, data.yhid)
            commit(types.SET_USER_ROLE, data.jsmc)
            commit(types.SET_USER_ROLE_ID, data.jsid)
            setToken(data.authorization)
            setUserLogin(data.yhid)
            setUserName(data.mc)
            setUserRole(data.jsmc)
            setUserRoleId(data.jsid)
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
          commit(types.SET_USER_ROLE, '')
          removeToken()
          removeUserLogin()
          removeUserName()
          removeUserRole()
          removeUserRoleId()
          removePluginList()
          resolve()
        })
      })
    }
  }
}

export default user
