import Http from 'common/js/request'

export function getPluginList (pluginInfo) {
  const data = {
    pageSize: pluginInfo.pageSize,
    pageNo: pluginInfo.pageCurrent
  }
  return Http.postRequest(pluginInfo.url, data)
}

export function editModuleItem (editParams) {
  const data = {
    mc: editParams.mc,
    dm: editParams.dm,
    tb: editParams.tb,
    xh: editParams.xh,
    zt: editParams.zt,
    mkid: editParams.mkid
  }
  return Http.postRequest(editParams.url, data)
}

export function addPluginItem (addParams) {
  const data = {
    mcjc: addParams.mcjc,
    dm: addParams.dm,
    mcqc: addParams.mcqc,
    dz: addParams.dz,
    tb: addParams.tb,
    xh: addParams.xh,
    zt: addParams.zt
  }
  return Http.postRequest(addParams.url, data)
}

export function deleteModuleItem (deleteParams) {
  const data = {
    mkid: deleteParams.mkid
  }
  return Http.postRequest(deleteParams.url, data)
}
