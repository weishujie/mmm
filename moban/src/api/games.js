// import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'

export function NumberOfgram(info) {
  info.accessToken = store.getters.token
  return headers.post('/admin/playTable', Qs.stringify(info))
}
export function InitOfgram() {
  return headers.post('/admin/playTable', Qs.stringify({ 'accessToken': store.getters.token }))
}