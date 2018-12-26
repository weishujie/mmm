// import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'
// 大区管理
// 三级返利
export function Logthree(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/agencyIncome', Qs.stringify(info))
}
// 销售日志
export function Xiaoshou(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/saleLog', Qs.stringify(info))
}

// 银商日志
export function Yingshang(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/loadDealerLog', Qs.stringify(info))
}

// 游戏消耗

export function Gram(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/playConsumeLog', Qs.stringify(info))
}
