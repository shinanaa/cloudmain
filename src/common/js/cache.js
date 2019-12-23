import storage from 'good-storage'

// 用户信息
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

// 可访问路由
const ROUTER_KEY = 'router-list'
export function setRouter (token) {
  return storage.set(ROUTER_KEY, token)
}
export function getRouter () {
  return storage.get(ROUTER_KEY)
}
export function removeRouter () {
  storage.remove(ROUTER_KEY)
  return []
}
