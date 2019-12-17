import Http from 'common/js/request'

export function getModuleList (userInfo) {
  const data = {
    pageSize: userInfo.pageSize,
    pageNo: userInfo.pageCurrent
  }
  return Http.postRequest(userInfo.url, data)
}
