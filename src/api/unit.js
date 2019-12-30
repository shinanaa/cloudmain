import Http from 'common/js/request'

export function getUnitList (unitInfo) {
  const data = {
    dm: unitInfo.dm,
    mc: unitInfo.mc,
    zt: unitInfo.zt,
    pageSize: unitInfo.pageSize,
    pageNo: unitInfo.pageNo
  }
  return Http.postRequest(unitInfo.url, data)
}

export function addUnitItem (addParams) {
  const data = {
    mc: addParams.name,
    dm: addParams.code,
    lxr: addParams.contacts,
    dh: addParams.tel,
    yx: addParams.email,
    dz: addParams.address,
    xh: addParams.order,
    zt: addParams.state,
    dwgnid: addParams.plugins
  }
  return Http.postRequest(addParams.url, data)
}

export function getUnitPluginTree (url) {
  return Http.postRequest(url)
}
