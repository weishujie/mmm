// import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'

// 大区总监home页
export function getHomedirect(info) {
  info.accessToken = store.getters.token
  return headers.post('area/agencyIncome', Qs.stringify(info))
}

// 大区经理home页

export function getHomemanage(info) {
  info.accessToken = store.getters.token
  return headers.post('area/agencyIncome', Qs.stringify(info))
}
// export function getHomeTotal(info) {
//   // return axios.post('/homepage/hometotal')
//   info.accessToken = store.getters.token
//   console.log("interface parm: ",info)
//   return headers.get(`/area/agencyIncome?accessToken=${info.accessToken}&limit=20&skip=0`)
// }

export function getHomeDetailItem() {
  // return axios.post('/homepage/detailItem')
}

export function getRank() {
  // return axios.post('/homepage/investmentRank')
}