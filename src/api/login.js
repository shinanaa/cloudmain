import Http from 'common/js/request'

export function loginByUsername (userInfo) {
  const data = {
    userName: userInfo.userName,
    password: userInfo.password
  }
  console.log(userInfo.url)
  return Http.postRequest(userInfo.url, data)
}
