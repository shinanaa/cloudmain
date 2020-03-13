import storage from 'good-storage'

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

// 可访问路由
const ROUTER_KEY = 'router-list'
export function setRouter (list) {
  return storage.session.set(ROUTER_KEY, list)
}
export function getRouter () {
  return storage.session.get(ROUTER_KEY)
}
export function removeRouter () {
  storage.session.remove(ROUTER_KEY)
  return []
}
