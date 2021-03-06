const i = {
  loginOn: { url: 'portal/loginAdmin' },
  logOut: { url: 'portal/logout' },
  changePwd: { url: 'gateway/system/system/user/updatePassword' },
  getPluginList: { url: 'gateway/admin/admin/plugin/showGn' }, // 获取菜单导航列表
  uploadImg: { url: 'gateway/admin/admin/file/upImage' }, // 图片上传
  getPowerList: { url: 'gateway/admin/admin/plugin/userRoute' }, // 用户的权限列表
  // 用户管理
  getUserTree: { url: 'gateway/admin/admin/adminUser/queryAllUser' },
  getUserInfo: { url: 'gateway/admin/admin/adminUser/queryAllUserWithPage' }, // 分页获取用户数据
  getUserById: { url: 'gateway/admin/admin/adminUser/queryUserById' },
  editUserInfo: { url: 'gateway/admin/admin/adminUser/updateUser' },
  addUserInfo: { url: 'gateway/admin/admin/adminUser/insertUser' },
  deleteUserInfo: { url: 'gateway/admin/admin/adminUser/deleteUser' },
  deleteUsers: { url: 'gateway/admin/admin/adminUser/deleteUsers' },
  getUserRole: { url: 'gateway/admin/admin/adminUser/showUserRole' }, // 获取当前用户的角色列表
  // 模块管理
  getModuleTree: { url: 'gateway/admin/admin/module/queryModuleList' },
  getModuleInfo: { url: 'gateway/admin/admin/module/queryModuleListPage' },
  getModuleById: { url: 'gateway/admin/admin/module/queryModuleById' },
  addModuleInfo: { url: 'gateway/admin/admin/module/saveModule' },
  editModuleInfo: { url: 'gateway/admin/admin/module/updateModule' },
  deleteModuleInfo: { url: 'gateway/admin/admin/module/deleteModuleById' },
  getUserModule: { url: 'gateway/admin/admin/module/queryModuleByUserId' }, // 获取当前用户的模块列表
  // 功能管理
  getPluginTree: { url: 'gateway/admin/admin/plugin/moudlePluginTree' },
  getPluginInfo: { url: 'gateway/admin/admin/plugin/queryPluginListPage' },
  getPluginById: { url: 'gateway/admin/admin/plugin/queryPluginById' },
  addPluginInfo: { url: 'gateway/admin/admin/plugin/savePlugin' },
  editPluginInfo: { url: 'gateway/admin/admin/plugin/updatePlugin' },
  deletePluginInfo: { url: 'gateway/admin/admin/plugin/deletePluginById' },
  // 角色管理
  getRoleTree: { url: 'gateway/admin/admin/role/queryRoleList' },
  getRoleInfo: { url: 'gateway/admin/admin/role/queryRoleListPage' },
  getRoleById: { url: 'gateway/admin/admin/role/queryRoleById' },
  addRoleInfo: { url: 'gateway/admin/admin/role/saveRole' },
  editRoleInfo: { url: 'gateway/admin/admin/role/updateRole' },
  deleteRoleInfo: { url: 'gateway/admin/admin/role/deleteRoleById' },
  // 日志管理
  getLogInfo: { url: 'gateway/admin/admin/log/queryLogListPage' },
  // 单位管理
  getUnitInfo: { url: 'gateway/admin/admin/unit/queryAllCompanyWithPage' },
  getUnitById: { url: 'gateway/admin/admin/unit/queryCompanyById' },
  getUnitPluginTree: { url: 'gateway/system/system/plugin/moudlePluginTree' },
  getUnitList: { url: 'gateway/admin/admin/unit/queryAllCompany' }, // 获取所有单位
  addUnitInfo: { url: 'gateway/admin/admin/unit/unitInsert' },
  editUnitInfo: { url: 'gateway/admin/admin/unit/unitUpdate' },
  deleteUnitInfo: { url: 'gateway/admin/admin/unit/deleteUnit' },
  // 通知公告
  getNoticeInfo: { url: 'gateway/admin/admin/notice/queryNoticeListPage' },
  getNoticeById: { url: 'gateway/admin/admin/notice/queryNoticeById' },
  addNoticeInfo: { url: 'gateway/admin/admin/notice/saveNoticeInfo' },
  editNoticeInfo: { url: 'gateway/admin/admin/notice/updateNotice' },
  deleteNoticeInfo: { url: 'gateway/admin/admin/notice/deleteNoticeById' },
  // 轮播管理
  getCarouselInfo: { url: 'gateway/admin/admin/carousel/queryCarouselListPage' },
  getCarouselById: { url: 'gateway/admin/admin/carousel/queryCarouselById' },
  addCarouselInfo: { url: 'gateway/admin/admin/carousel/saveCarouselInfo' },
  editCarouselInfo: { url: 'gateway/admin/admin/carousel/updateCarousel' },
  deleteCarouselInfo: { url: 'gateway/admin/admin/carousel/deleteCarouselById' },
  getCarouselList: { url: 'gateway/admin/admin/carousel/queryCarouselList' } // 登录页轮播图片
}

export default i
