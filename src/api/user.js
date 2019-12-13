import Http from 'common/js/request'

export function getUserList (userInfo) {
  const data = {
    pageSize: userInfo.pageSize,
    pageNo: userInfo.pageCurrent
  }
  return Http.postRequest(userInfo.url, data)
}

export function editUserItem (editParams) {
  const data = {
    dm: editParams.dm,
    mm: editParams.mm,
    mc: editParams.mc,
    zt: editParams.zt,
    yhjsid: editParams.yhjsid,
    yhid: editParams.yhid
  }
  return Http.postRequest(editParams.url, data)
}
