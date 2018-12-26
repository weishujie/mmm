// import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'
// 抽水
export function Pumping(info) {
    info.accessToken=store.getters.token
    return headers.post('/admin/winnerFeeLog', Qs.stringify(info))
}

export function Taiwan(info) {
    info.accessToken=store.getters.token
    return headers.post('/admin/tableFeeLog', Qs.stringify(info))
}
export function NumberOfgram(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/playTable', Qs.stringify(info))
}
export function InitOfgram(info) {
 return headers.post('/admin/playTable', Qs.stringify({ 'accessToken': store.getters.token }))
}