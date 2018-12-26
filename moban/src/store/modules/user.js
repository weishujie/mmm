import { login, userInfo, logout, pawlogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/common/auth'
// import { init } from '@/common/comm'
import { Message } from 'element-ui';
const SET_TOKEN = 'SET_TOKEN'
const SET_NICKNAME = 'SET_NAME'
const SET_AGE = 'SET_AGE'
const SET_HEADINGURL = 'SET_AVATAR'
const SET_PERMISSIONS = 'SET_PERMISSIONS'
const SET_UID = 'SET_UID'
const SET_LEVEL = 'SET_LEVEL'
const Permissiones = {
  9: "/nested,/logindex,/statistics,/number-tab,/playersearch,/audit,/base", //管理员
  1: "/proxy",  //半代理
  2: "/proxy",  //代理
  3: "/director,/base", //大区总监
  4: "/daqu-manager,/base", //大区经理
  7: "/yinshang", //银商
}

const user = {
  state: {
    token: getToken(),
    nickname: '',
    age: 0,
    headimgurl: '',
    permissions: '',
    uid: "",
    level: 1
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_NICKNAME](state, nickname) {
      state.nickname = nickname
    },
    [SET_AGE](state, age) {
      state.age = age
    },
    [SET_HEADINGURL](state, headimgurl) {
      state.headimgurl = headimgurl
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    },
    [SET_UID](state, uid) {
      state.uid = uid
    },
    [SET_LEVEL](state, level) {
      state.level = level
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(resp => {
          let data = resp.data
          // console.log(data, 'login1')
          setToken(data.accessToken)
          commit(SET_TOKEN, data.accessToken)
          // commit(SET_NAME, data.name)
          // commit(SET_AGE, data.age)
          // commit(SET_AVATAR, data.avatar)
          // commit(SET_PERMISSIONS, data.permissions)
          return resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 密码
    pawlogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        pawlogin(userInfo).then(resp => {

          if (resp.status == 200) {
            if (resp.data.code == 200) {
              let data = resp.data
              console.log(data, 'login2')
              setToken(data.user.accessToken)
              commit(SET_TOKEN, data.user.accessToken)
              // commit(SET_NAME, data.name)
              // commit(SET_AGE, data.age)
              // commit(SET_AVATAR, data.avatar)
              // commit(SET_PERMISSIONS, data.permissions)
              return resolve()
              // }
            }
            // if (resp.data.code == 404) {
            //  Message.warning({message: resp.data.msg||'用户名或密码错误',center: true,duration:2000});
            //   this.$router.push({ path: "/login" });
            // } 
            else {
              Message.warning({message: resp.data.msg||'用户名或密码错误',center: true,duration:2000});
            }
          } else {
            Message.warning({message: resp.data.msg||'与服务器通讯异常',center: true,duration:2000});
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 拉取用户信息
    pullUserInfo({ commit }, info) {
      console.log("it will pull userinfo")
      return new Promise((resolve, reject) => {
        userInfo(info).then(resp => {
          // message.warning({message: resp.data.msg||'暂无数据',center: true,duration:2000});
          console.log("aaaaa", resp.data.code)
          if (resp.status == 200) {
            if (resp.data.code == 200) {
              if (resp.data.level == null) {
                Message.warning({message: resp.data.msg||'该用户没有权限',center: true,duration:2000});
                this.$router.push({ path: "/login" });
              } else {
                let data = resp.data
                console.log("userinfo: ", data)
                commit(SET_NICKNAME, data.nickname)
                commit(SET_AGE, data.age)
                commit(SET_HEADINGURL, data.headimgurl)
                commit(SET_PERMISSIONS, Permissiones[data.level])//data.permissions)
                commit(SET_UID, data.uid)
                commit(SET_LEVEL, data.level)
                return resolve(data)
              }
            } if (resp.data.code == 404) {
              Message.warning({message: resp.data.msg||'用户名或密码错误',center: true,duration:2000});
              this.$router.push({ path: "/login" });
            } else if (resp.data.code == 401) {
              Message.warning({message: resp.data.msg||'该用户没有权限',center: true,duration:2000});
              this.$router.push({ path: "/login" });
            } else {
              Message.warning({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
            }
          } else {
            Message.warning({message: '与服务器通讯异常',center: true,duration:2000});
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 用户退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(resp => {
          removeToken()
          commit(SET_TOKEN, '')
          commit(SET_NICKNAME, '')
          localStorage.clear()
          return resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    }
  },
  getters: {
    token: state => state.token,
    name: state => unescape(state.nickname.replace(/\\/g, "%")),
    age: state => state.age,
    avatar: state => state.headimgurl,
    permissions: state => state.permissions,
    level: state => state.level,
    uid: state => state.uid
  }
}

export default user