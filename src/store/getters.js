const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  userLogin: state => state.user.userLogin,
  userRole: state => state.user.role,
  roleId: state => state.user.roleId,
  moduleList: state => state.user.moduleList,
  opened: state => state.app.opened,
  currentModule: state => state.app.currentModule
}
export default getters
