const i = {
  loginOn: { url: 'portal/login' },
  logOut: { url: 'portal/logout' },
  changePwd: { url: 'gateway/system/system/user/updatePassword' },
  getUserInfo: { url: 'gateway/admin/admin/adminUser/queryAllUserWithPage' }, // 分页获取用户数据
  editUserInfo: { url: 'gateway/admin/admin/adminUser/updateUser' },
  addUserInfo: { url: 'gateway/admin/admin/adminUser/insertUser' },
  deleteUserInfo: { url: 'gateway/admin/admin/adminUser/deleteUser' }
}

export default i
