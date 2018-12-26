
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'

// 微信账号管理获取
export function Wecharpost() {
  return headers.post('/admin/agentDefined', Qs.stringify({'accessToken': store.getters.token}))
}
// 微信账号管理保存
export function Saveput(info) {
  info.accessToken=store.getters.token
  return headers.put('/admin/agentDefined', Qs.stringify(info))
}
// 跑马灯
export function Paomaden(info) {
  info.accessToken=store.getters.token
  return headers.put('/admin/pushTop', Qs.stringify(info))
}
// 跑马灯回显
export function Paomadeninit(info) {
  info.accessToken=store.getters.token
  return headers.post('/admin/pushTop', Qs.stringify(info))
}
// 排行榜设置获取
export function Setboard() {
  return headers.post('/admin/loadRank', Qs.stringify({'accessToken': store.getters.token}))
}
// 排行榜设置保存
export function setput(info) {
  info.accessToken=store.getters.token
  return headers.put('/admin/loadRank', Qs.stringify(info))
}