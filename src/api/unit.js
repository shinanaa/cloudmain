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
    dwgnid: addParams.plugins,
    dwid: 'jdsikhd'
  }
  return Http.postRequest(addParams.url, data)
}

export function editUnitItem (editParams) {
  const data = {
    mc: editParams.name,
    dm: editParams.code,
    lxr: editParams.contacts,
    dh: editParams.tel,
    yx: editParams.email,
    dz: editParams.address,
    xh: editParams.order,
    zt: editParams.state,
    dwgnid: editParams.plugins
  }
  return Http.postRequest(editParams.url, data)
}

export function getUnitPluginTree (url) {
  return Http.postRequest(url)
}
