import storage from 'good-storage'

// token
const TOKEN_KEY = 'user-Token'

export function setToken (token) {
  return storage.set(TOKEN_KEY, token)
}
export function getToken () {
  return storage.get(TOKEN_KEY)
}
export function removeToken () {
  storage.remove(TOKEN_KEY)
  return []
}

// 用户登录信息
const LOGIN_KEY = 'user-Info'

export function setUserLogin (token) {
  return storage.session.set(LOGIN_KEY, token)
}
export function getUserLogin () {
  return storage.session.get(LOGIN_KEY)
}
export function removeUserLogin () {
  storage.session.remove(LOGIN_KEY)
  return []
}

// 用户名
const NAME_KEY = 'user-Name'

export function setUserName (name) {
  return storage.session.set(NAME_KEY, name)
}
export function getUserName () {
  return storage.session.get(NAME_KEY)
}
export function removeUserName () {
  storage.session.remove(NAME_KEY)
  return []
}

// 用户角色
const ROLE_KEY = 'user-Role'

export function setUserRole (name) {
  return storage.session.set(ROLE_KEY, name)
}
export function getUserRole () {
  return storage.session.get(ROLE_KEY)
}
export function removeUserRole () {
  storage.session.remove(ROLE_KEY)
  return []
}

// 头部的模块列表
const MODULE_LIST_KEY = 'router-list'
export function setRouter (list) {
  return storage.session.set(MODULE_LIST_KEY, list)
}
export function getRouter () {
  return storage.session.get(MODULE_LIST_KEY)
}
export function removeRouter () {
  storage.session.remove(MODULE_LIST_KEY)
  return []
}

// 左侧的功能列表
const PLUGIN_LIST_KEY = 'plugin-list'
export function setPluginList (list) {
  return storage.session.set(PLUGIN_LIST_KEY, list)
}
export function getPluginList () {
  return storage.session.get(PLUGIN_LIST_KEY)
}
export function removePluginList () {
  storage.session.remove(PLUGIN_LIST_KEY)
  return []
}
