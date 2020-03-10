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
