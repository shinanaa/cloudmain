const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  userLogin: state => state.user.userLogin,
  userRole: state => state.user.role,
  moduleList: state => state.user.moduleList,
  opened: state => state.app.opened
}
export default getters
