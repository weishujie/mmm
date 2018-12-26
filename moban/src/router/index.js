import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout/layout'
// 设置
// import Introduction from '@/views/introduction/index'
import Introduction1 from '@/views/introduction/index1'
// import rank from '@/views/introduction/rank'
import Introduction4 from '@/views/introduction/index4'
// 管理类
// import nested from '@/views/nested/nested'
import nested2 from '@/views/nested/nested2'
import menu1 from '@/views/nested/menu1'
//import leader from '@/views/nested/leader'

// 日志类
// import logindex from '@/views/rizhi/logindex'
import threelog from '@/views/rizhi/threelog'
import xiaoshoulog from '@/views/rizhi/xiaoshoulog'
import merchantlog from '@/views/rizhi/merchantlog'
import garmlog from '@/views/rizhi/garmlog'

// 统计
// import statistics from '@/views/statistics/statistics'
import statistics1 from '@/views/statistics/statistics1'
import statistics2 from '@/views/statistics/statistics2'
// import information from '@/views/user/information'
import tableNumber from '@/views/number-tables/number-tab'

//查询
import playersearch from '@/views/playersearch/playersearch'
import playerInfo from '@/views/playersearch/playerInfo'
import chargesearch from '@/views/playersearch/chargesearch'

//审核
import drawMoney from '@/views/audit/drawMoney'
// 提现列表
import drawMoneyList from '@/views/audit/drawMoneyList'
//赠送玩家金币
import addMoney from '@/views/audit/addMoney'
//赠送玩家金币列表
import addMoneyList from '@/views/audit/addMoneyList'
import payMoney from '@/views/audit/payMoney'
import payMoneyList from '@/views/audit/payMoneyList'

// 大区经理权限
import setLeader from '@/views/fixedRview/daqu-manager/setLeader'
import setAgent from '@/views/base/setAgent'

// 大区总监权限
import Director from '@/views/fixedRview/daqu-director/director'//大区总监home
import profit from '@/views/fixedRview/daqu-director/profit'//推广二维码
import directlyAgentList from '@/views/fixedRview/daqu-director/directlyAgentList'//直属会员列表
import agentList from '@/views/fixedRview/daqu-director/agentList'//下级会员列表
import myArea from '@/views/fixedRview/daqu-director/myArea'//我的大区
import Personal from '@/views/fixedRview/daqu-director/personal'//我的权益
import PersonDetail from '@/views/fixedRview/daqu-director/personDetail'//个人信息管理
// 权限为银商的
import yinshang from '@/views/fixedRview/yinshang/yinshang1'
import yinshang2 from '@/views/fixedRview/yinshang/yinshang2'
import yinshang3 from '@/views/fixedRview/yinshang/yinshang3'

// 代理权限
import Proxy1 from '@/views/fixedRview/proxy/proxy1'
import Proxy2 from '@/views/fixedRview/proxy/proxy2'
import ProxyChild1 from '@/views/fixedRview/proxy/proxy-child1'
import ProxyChild2 from '@/views/fixedRview/proxy/proxy-child2'
import ProxyChild3 from '@/views/fixedRview/proxy/proxy-child3'

Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/homepage/homepage'),
        meta: {title: '首页'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    alwaysShow: true,
    meta: {
      title: '表格',
      icon: 'edit'
    },
    children: [
      {
        path: 'export-excel',
        name: '导出表格',
        component: () => import('@/views/excel/export-excel'),
        meta: {icon: 'arrow-left', title: 'exportExcel'}
      },
      {
        path: 'upload-excel',
        name: '上传表格',
        component: () => import('@/views/excel/upload-excel'),
        meta: {icon: 'minus', title: 'uploadExcel'}
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'index',
    meta: {
      icon: 'document',
      title: '剪切板'
    },
    children: [
      {
        path: 'index',
        name: 'clipBoard',
        component: () => import('@/views/clipboard'),
        meta: {title: '剪切板示例', icon: 'document'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '个人中心'}
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '修改头像'}
      }
    ]
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: Layout,
    redirect: '/introduction/index',
    meta: {
      icon: 'setting',
      title: '系统设置'
    },
    children: [
      { path: 'index4', component: Introduction4, meta: { title: '账号设置' } },
      { path: 'index1', component: Introduction1, meta: { title: '跑马灯设置' } },
      // { path: 'rank', component: rank, meta: { title: '排行榜设置' } },
    ]
  },
  {
    path: '/nested',
    component: Layout,
    meta: {
      icon: 'menu',
      title: '管理'
    },
    children: [
      {
        path: 'menu1',
        component: menu1,
        meta: { title: '大区管理' }
      }
    ]
  },
  {
    path: '/logindex',
    component: Layout,
    redirect: '/rizhi/logindex',
    meta: {
      icon: 'tickets',
      title: '日志'
    },
    children: [
      { path: 'threelog', component: threelog, meta: { title: '三级返利日志' } },
      { path: 'xiaoshoulog', component: xiaoshoulog, meta: { title: '销售日志' } },
      //{ path: 'merchantlog', component: merchantlog, meta: { title: '银商日志' } },
      { path: 'garmlog', component: garmlog, meta: { title: '游戏消耗日志' } }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/statistics',
    meta: {
      icon: 'tickets',
      title: '统计'
    },
    children: [
      // { path: 'statistics', component: statistics, meta: { title: '抽水统计' } },
      { path: 'statistics1', component: statistics1, meta: { title: '抽水统计' } },
      { path: 'statistics2', component: statistics2, meta: { title: '台费统计' } },
      { path: 'playersearch', component: playersearch, meta: { title: '玩家房费记录' } },

    ]
  },
  {
    path: '/number-tab',
    component: Layout,
    redirect: '/number-tables/number-tab',
    meta: {
      icon: 'rank',
      title: '游戏桌数排名'
    },
    children: [
      { path: 'number-tab', component: tableNumber, meta: { title: '游戏桌数排名' } }
    ]
  },
  {
    path: '/playersearch',
    component: Layout,
    redirect: '/playersearch/playersearch',
    meta: {
      icon: 'menu',
      title: '玩家管理'
    },
    children: [
      { path: 'playerInfo', component: playerInfo, meta: { title: '玩家信息' } },
      { path: 'drawMoney', component: drawMoney, meta: { title: '提现审批' } },
      { path: 'drawMoneyList', component: drawMoneyList, meta: { title: '提现记录' } },
      { path: 'addMoney',component: addMoney,meta: { title: '金币赠送' }},
      { path: 'addMoneyList',component: addMoneyList,meta: { title: '金币赠送记录' }},
      { path: 'payMoney',component: payMoney,meta: { title: '后台金币充值' }},
      { path: 'payMoneyList',component: payMoneyList,meta: { title: '后台金币充值记录' }},
      { path: 'chargesearch', component: chargesearch, meta: { title: '金币充值记录' } },
    ]
  },
  {
    path: '/daqu-manager',
    component: Layout,
    redirect: '/daqu-manager/manager',
    meta: {
      icon: 'menu',
      title: '大区经理'
    },
    children: [
      {
        path: 'personal', component: Director, meta: { title: '我的权益' },
        children: [
          {
            path: 'personal',
            component: Personal,
            meta: { title: '个人信息' }
          },
          {
            path: 'personDetail',
            component: PersonDetail,
            meta: { title: '信息管理' }
          }
        ]
      },
      {
        path: 'profit',
        component: profit,
        meta: { title: '提升收益' }
      },
      {
        path: 'directlyAgentList',
        component: directlyAgentList,
        meta: { title: '直属会员列表' }
      },
      {
        path: 'agentList',
        component: agentList,
        meta: { title: '下级会员列表' }
      },
      {
        path: 'myArea',
        component: myArea,
        meta: { title: '我的大区' }
      },
      {
        path: 'setLeader',
        component: setLeader,
        meta: { title: '设置总监' }
      },
      {
        path: 'setAgent',
        component: setAgent,
        meta: { title: '设置代理' }
      }
    ]
  },
  {
    path: '/director',
    component: Layout,
    redirect: '/director',
    meta: { icon: 'menu', title: '大区总监' },
    children: [
      {
        path: 'personal', component: Director, meta: { title: '我的权益' },
        children: [
          {
            path: 'personal',
            component: Personal,
            meta: { title: '个人信息' }
          },
          {
            path: 'personDetail',
            component: PersonDetail,
            meta: { title: '信息管理' }
          }
        ]
      },
      {
        path: 'profit',
        component: profit,
        meta: { title: '提升收益' }
      },
      {
        path: 'directlyAgentList',
        component: directlyAgentList,
        meta: { title: '直属会员列表' }
      },
      {
        path: 'myArea',
        component: myArea,
        meta: { title: '我的大区' }
      },
      {
        path: 'setAgent',
        component: setAgent,
        meta: { title: '设置代理' }
      }
    ]
  },
  {
    path: '/yinshang',
    component: Layout,
    redirect: '/playersearch/yinshang1',
    meta: {
      icon: 'menu',
      title: '银商'
    },
    children: [
      { path: 'yinshang1', component: yinshang, name: '银商', meta: { title: '银商' } },
      { path: 'yinshang2', component: yinshang2, name: '银商', meta: { title: '上分管理' } },
      { path: 'yinshang3', component: yinshang3, name: '查看日志', meta: { title: '查看日志' } }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    meta: {
      icon: 'menu',
      title: '代理'
    },
    children: [
      {
        path: 'proxy1',
        component: Proxy1,
        meta: { title: '我的推广' }
      },
      {
        path: 'proxy2',
        component: Proxy2,
        meta: { title: '我的权益' },
        children: [
          {
            path: 'proxy-child1',
            component: ProxyChild1,
            meta: { title: '我的信息' }
          },
          {
            path: 'proxy-child3',
            component: ProxyChild3,
            meta: { title: '信息管理' }
          }
        ]
      },
      {
        path: 'proxy-child2',
        meta: { title: '下级会员列表' },
        component: ProxyChild2
      }
    ]
  }
]