import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'

export function login(userInfo) {
  userInfo.accessToken = store.getters.token
  return headers.post('/auth2/mobile', Qs.stringify(userInfo))
}
// export function loginCode(userInfo) {
//   return axios.get(`192.168.2.115:6480/auth2/moble?mobile=${userInfo.mobile}&country=cn`)
// }
export function userInfo(info) {
  info.accessToken = store.getters.token
  // alert(info.info, 'infoinfoo')
  return headers.get(`/auth2/userinfo?accessToken=${info.info}`)
}

// 密码
export function pawlogin(userInfo) {
  // userInfo.accessToken = store.getters.token
  console.log("interface login param:",userInfo)
  return headers.post('/auth2/user', Qs.stringify(userInfo))
}

export function logout() {
  return axios.post('/login/logout', Qs.stringify())
}