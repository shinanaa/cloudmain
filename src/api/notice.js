import Http from 'common/js/request'
import axios from 'axios'

export function getNoticeInfo (unitInfo) {
  const data = {
    lx: unitInfo.type,
    bt: unitInfo.title,
    zt: unitInfo.state,
    pageSize: unitInfo.pageSize,
    pageNo: unitInfo.pageNo
  }
  return Http.postRequest(unitInfo.url, data)
}

export function addNoticeItem (addParams) {
  const data = {
    lx: addParams.type,
    bt: addParams.title,
    ly: addParams.ly,
    nr: addParams.content,
    tpwj: addParams.imageUrl,
    fjwj: addParams.fjwj,
    zt: addParams.state
  }
  return Http.postRequest(addParams.url, data)
}

export function editNoticeItem (editParams) {
  const data = {
    lx: editParams.type,
    bt: editParams.title,
    ly: editParams.source,
    nr: editParams.content,
    tpwj: editParams.images,
    fjwj: editParams.appendix,
    zt: editParams.state,
    units: editParams.units,
    yhid: editParams.userId,
    tzggid: editParams.noticeId
  }
  return Http.postRequest(editParams.url, data)
}

export function deleteNoticeItem (deleteParams) {
  const data = {
    tzggid: deleteParams.noticeId
  }
  return Http.postRequest(deleteParams.url, data)
}

export function getNoticeItem (getInfo) {
  const data = {
    tzggid: getInfo.noticeId
  }
  return Http.postRequest(getInfo.url, data)
}

export function uploadImg (info, url) {
  const config = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data: info,
    timeout: 20000
  }
  console.log(config)
  return axios(config)
}
