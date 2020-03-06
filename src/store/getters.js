const getters = {
  mc: state => state.user.mc,
  roles: state => state.user.roles,
  token: state => state.user.token,
  opened: state => state.app.opened
}
export default getters
