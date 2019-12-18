const i = {
  loginOn: { url: 'portal/login' },
  logOut: { url: 'portal/logout' },
  changePwd: { url: 'gateway/system/system/user/updatePassword' },
  // 用户管理
  getUserInfo: { url: 'gateway/admin/admin/adminUser/queryAllUserWithPage' }, // 分页获取用户数据
  editUserInfo: { url: 'gateway/admin/admin/adminUser/updateUser' },
  addUserInfo: { url: 'gateway/admin/admin/adminUser/insertUser' },
  deleteUserInfo: { url: 'gateway/admin/admin/adminUser/deleteUser' },
  // 模块管理
  getModuleInfo: { url: 'gateway/admin/admin/module/queryModuleListPage' },
  addModuleInfo: { url: 'gateway/admin/admin/module/saveModule' },
  editModuleInfo: { url: 'gateway/admin/admin/module/updateModule' },
  deleteModuleInfo: { url: 'gateway/admin/admin/module/deleteModuleById' },
  // 功能管理
  getPluginInfo: { url: 'gateway/admin/admin/plugin/queryPluginListPage' },
  addPluginInfo: { url: 'gateway/admin/admin/plugin/savePlugin' }
}

export default i
