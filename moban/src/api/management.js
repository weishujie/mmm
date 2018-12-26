// import axios from 'axios'
import headers from '@/common/comm'
import store from '@/store/index'
import Qs from 'qs'

// ...银商管理
//获取银商列表
export function Merchant() {
    return headers.post('/admin/dealers', Qs.stringify({ 'accessToken': store.getters.token }))
}

// ...大区管理  
//我的大区
export function getmyDaqu(info) {
    info.accessToken = store.getters.token
    return headers.get(`/area/agencyIncome?accessToken=${info.accessToken}&limit=${info.limit}&skip=${info.skip}`)
}
//获取列表:系统所有大区经理
export function Region(p) {
    p.accessToken = store.getters.token
    return headers.post('/admin/area', Qs.stringify(p))
}
//设置大区经理
export function setManager(p) {
    p.accessToken = store.getters.token
    return headers.put('/admin/area', Qs.stringify(p))
}
//关闭大区经理
export function enableManager(p) {
    // p.accessToken = store.getters.token
    return headers.delete('/admin/area', p)
}
//直属会员列表
export function getAgentList(info) {
    info.accessToken = store.getters.token
    return headers.post('/area/firstChild', Qs.stringify(info))
}
// 所有下级会员列表
export function getMemberList(info) {
    info.accessToken = store.getters.token
    return headers.post('/area/allChild', Qs.stringify(info))
}
//设置代理
export function setAgent(parm) {
    parm.accessToken = store.getters.token
    return headers.put('/admin/agent', Qs.stringify(parm))
}
//所属的代理列表
export function getAgent() {
    return headers.post('/admin/agent', Qs.stringify({ 'accessToken': store.getters.token }))
}
//提现_获取订单数据
export function getOrders(parm) {
    parm.accessToken = store.getters.token
    return headers.post('/admin/order', Qs.stringify(parm))
}
//提现_审批批准
export function setOk(parm) {
    parm.accessToken = store.getters.token
    return headers.put('/admin/order', Qs.stringify(parm))
}
//提现_审批驳回
export function setNo(parm) {
    return headers.delete('/admin/order', parm)
}
//获取url生成推广二维码
export function getProfit() {
    return headers.post('/area/qrCode', Qs.stringify({'accessToken': store.getters.token}))
}
//查询_玩家列表
export function SearchPlayer(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/searchPlayer', Qs.stringify(info))
}
//查询_获取用户信息
export function getPlayerInfo(info) {
    info.accessToken = store.getters.token
    return headers.post('/admin/user', Qs.stringify(info))
}
//查询_玩家个人信息
export function getPersonInfo(parm) {
    parm.accessToken = store.getters.token
    return headers.post('/admin/loadInfo',Qs.stringify(parm))
}
//赠送玩家金币
export function addUserMoney(parm) {
    parm.accessToken = store.getters.token
    return headers.put('/admin/money',Qs.stringify(parm))
}
//赠送玩家金币_记录
export function addUserMoneyLog(parm) {
    parm.accessToken = store.getters.token
    return headers.post('/admin/money',Qs.stringify(parm))
}
//查询_玩家充值记录
export function PlayerChargeList(parm) {
    parm.accessToken = store.getters.token
    return headers.post('/admin/recharge',Qs.stringify(parm))
}
//查询_玩家提现记录
export function drawMoneyLog(parm) {
    parm.accessToken = store.getters.token
    return headers.post('/admin/cashRecord',Qs.stringify(parm))
}
//修改个人手机号
export function userput(parm) {
    parm.accessToken = store.getters.token
    console.log("interface parm:",parm)
    return headers.put('/admin/user', Qs.stringify(parm))
}    
