<template>
  <el-container class="login-container">
    <!-- <el-switch v-model="toggleParticles" inactive-color="#ff4949">></el-switch> -->
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <img src="../../assets/image/login-logo.png" alt>
        <!-- <h2 class="login-title">{{$t('login.title')}}</h2> -->
        <div class="passw">
          <el-button type="primary" @click="logintypes(1)">{{$t('login.pawlogin')}}</el-button>
          <!-- <el-button type="primary" disabled @click="logintypes(2)">{{$t('login.yamlogin')}}</el-button> -->
        </div>
      </div>
      <template v-if="index==2">
        <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="20%">
          <el-form-item :label="$t('login.account')" prop="mobile" style="position:relative">
            <el-input type="text" v-model="loginForm.mobile" @keyup.enter.native="goToPwdInput"></el-input>
            <span class="svg-container svg-container_user">
              <icon-svg icon-class="user"/>
            </span>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item :label="$t('login.code')" prop="code">
            <el-input
              type="text"
              class="yzmInput"
              v-model="loginForm.code"
              @keyup.enter.native="onLogin"
              ref="code"
            ></el-input>
            <span class="svg-container svg-container_password">
              <icon-svg icon-class="password"/>
            </span>
            <el-button type="primary" class="getyzm" @click="dx_yzm_bt">{{code.text}}</el-button>
          </el-form-item>
          <el-form-item :label="$t('login.remember')" label-width="80px">
            <el-switch v-model="remember"></el-switch>
          </el-form-item>
          <el-button
            type="primary"
            @click="onLogin('loginForm')"
            :loading="loading"
          >{{$t('login.login')}}</el-button>
        </el-form>
      </template>

      <template v-if="index==1">
        <el-form :rules="rules" :model="loginForm1" ref="loginForm1" label-width="20%">
          <el-form-item :label="$t('login.account')" prop="username" style="position:relative">
            <el-input type="text" v-model="loginForm1.username" @keyup.enter.native="goToPwdInput"></el-input>
            <span class="svg-container svg-container_user">
              <icon-svg icon-class="user"/>
            </span>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item :label="$t('login.password')" prop="pwd">
            <el-input
              type="password"
              v-model="loginForm1.pwds"
              @keyup.enter.native="onLogin1"
              ref="pwd"
            ></el-input>
            <span class="svg-container svg-container_password">
              <icon-svg icon-class="password"/>
            </span>
            <!-- </el-form-item> -->
            <!-- <el-form-item :label="$t('login.remember')" label-width="80px"> -->
            <!-- <el-switch v-model="remember"></el-switch> -->
          </el-form-item>
          <el-button
            type="primary"
            class="login-primary"
            @click="onLogin1('loginForm1')"
          >{{$t('login.login')}}</el-button>
        </el-form>
      </template>
    </el-card>
    <!-- particles.js container -->
    <div id="particles"></div>
    <toast v-model="toa.show" type="text">{{toa.text}}</toast>
  </el-container>
</template>
<script>
import { saveToLocal, loadFromLocal } from "@/common/local-storage";
import { mapActions } from "vuex";
import axios from "axios";
import Crypto from "@/crypto";
/* eslint-disable*/
import { Toast } from "vux";
import particles from "particles.js";
let flag = true;
export default {
  components: {
    Toast
  },
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };

    // username 验证
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    // pwd 验证
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      // 粒子开关
      index: "1",
      toggleParticles: false,
      logintype: false,
      toa: {
        show: false,
        text: ""
      },
      code: {
        text: "获取验证码"
      },
      //验证码密码
      loginForm: {
        mobile: "",
        country: "cn",
        code: ""
      },
      //账号密码
      loginForm1: {
        username: "",
        pwds: ""
      },
      remember: false,
      loading: false,
      rules: {}
    };
  },
  created() {
    // 初始化时读取localStorage用户信息
    if (loadFromLocal("remember", false)) {
      this.loginForm.mobile = loadFromLocal("mobile", "");
      this.loginForm.code = loadFromLocal("code", "");
      //  this.loginForm.username = loadFromLocal("username", "");
      // this.loginForm.pwd = loadFromLocal("pwd", "");
    } else {
      this.loginForm.mobile = "";
      this.loginForm.code = "";
      // this.loginForm.username = "";
      // this.loginForm.pwd = "";
    }
  },
  methods: {
    ...mapActions(["login", "pawlogin"]),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.code.$el.getElementsByTagName("input")[0].focus();
    },
    myDecode(c, e) {
      if (!(null == c || 8 > c.length))
        if (!(null == e || 0 >= e.length)) {
          for (var a = "", b = 0; b < e.length; b++)
            a += e.charCodeAt(b).toString();
          var d = Math.floor(a.length / 5),
            d = parseInt(
              a.charAt(d) +
                a.charAt(2 * d) +
                a.charAt(3 * d) +
                a.charAt(4 * d) +
                a.charAt(5 * d)
            ),
            h = Math.round(e.length / 2),
            f = Math.pow(2, 31) - 1,
            b = parseInt(c.substring(c.length - 8, c.length), 16);
          c = c.substring(0, c.length - 8);
          for (a += b; 10 < a.length; )
            a = (
              parseInt(a.substring(0, 10)) + parseInt(a.substring(10, a.length))
            ).toString();
          for (
            var a = (d * a + h) % f, k = "", g = "", b = 0;
            b < c.length;
            b += 2
          )
            (k = parseInt(
              parseInt(c.substring(b, b + 2), 16) ^ Math.floor(255 * (a / f))
            )),
              (g += String.fromCharCode(k)),
              (a = (d * a + h) % f);
          return g;
        }
    },
    init() {
      var str = this.$route.query.accesstoken;
      if (str) {
        if (str == "") {
          console.log("str is empty");
          this.$router.push("/");
        }
        //alert("str: "+str);
        var st = this.myDecode(str, "hellowweb");
        var s = st.split("|");
        var uid = s[0] || "";
        var mPass = s[1] || "";
        //var da=parseInt(s[2])*1000||"";
        //this.loading = true;
        var parm = { username: uid, pwd: escape(Crypto.set(mPass)) };
        //alert("parm: "+ JSON.stringify(parm));
        console.log("login on url");
        this.pawlogin(parm)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.$message.error({
              message: "登录失败",
              center: true,
              duration: 2000
            });
            // this.loading = false;
          });
      } else {
        console.log("No login on url,cannot get accesstoken value");
      }
    },
    // 登录操作
    onLogin() {
      this.$refs.code.$el.getElementsByTagName("input")[0].blur();
      // this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
      this.$refs.loginForm.validate(valid => {
        console.log(valid, "zasx");
        if (valid) {
          console.log(valid);
          this.loading = true;
          this.login(this.loginForm)
            .then(() => {
              // console.log(this.loginForm, "aaaxx");
              // console.log(this.loginForm);
              // 保存账号
              if (this.remember) {
                saveToLocal("mobile", this.loginForm.mobile);
                saveToLocal("code", this.loginForm.code);
                //  saveToLocal("password", this.loginForm.pwd);
                saveToLocal("remember", true);
              } else {
                saveToLocal("mobile", "");
                saveToLocal("code", "");
                //  saveToLocal("password", "");
                saveToLocal("remember", false);
              }
              this.$router.push("/");
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    onLogin1() {
      console.log(this.$refs.loginForm1);
      this.$refs.loginForm1.validate(valid => {
        console.log(valid, "zasx");
        if (valid) {
          this.loading = true;
          var parm = { username: this.loginForm1.username, pwd: "" };
          parm.pwd = escape(Crypto.set(this.loginForm1.pwds));
          console.log(parm, "parm");
          console.log(this.loginForm1.pwds, "pwds");
          this.pawlogin(parm)
            .then(() => {
              if (this.remember) {
                saveToLocal("username", this.loginForm1.username);
                saveToLocal("password", this.loginForm1.pwd);
                saveToLocal("remember", true);
              } else {
                saveToLocal("username", "");
                saveToLocal("password", "");
                saveToLocal("usernanme", false);
              }
              this.$router.push("/");
            })
            .catch(() => {
              this.$message.error({
                message: "登录失败",
                center: true,
                duration: 2000
              });
              // this.loading = false;
            });
        } else {
          return false;
        }
      });
    },

    dx_yzm_bt() {
      if (flag) {
        var _this = this;
        var num = 60;
        axios
          .get(`/auth2/mobile?mobile=${this.loginForm.mobile}&country=cn`)
          .then(function(response) {
            console.log(response);
            if (response.status == 200) {
              _this.toa = {
                show: true,
                text: "发送成功"
              };
            }
          })
          .catch(function(response) {
            console.log(response);
            _this.toa = {
              show: true,
              text: "发送失败"
            };
          });
        let interval = setInterval(function() {
          num--;
          _this.code.text = `${num}秒后重新获取`;
          flag = false;
          if (num == 0) {
            _this.code.text = `重新获取验证码`;
            flag = true;
            clearInterval(interval);
          }
        }, 1000);
      }
    },
    logintypes(index) {
      this.index = index;
    }
  },
  // 没实质作用 开关控制是否显示小星星
  watch: {},
  mounted() {
    var _this = this;
    _this.init();
  }
};
</script>
<style>
.el-form-item {
  padding-right: 26px;
}
</style>

<style scoped lang="scss">
$dark_gray: #889aa4;
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#d6d4db, #424b50) url("../../assets/image/login-bg.jpg")
    center no-repeat;
  background-size: cover;
  overflow: hidden;
  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px 0 0 -200px;
    width: 400px;
    height: 400px;
    background: #fff;

    .el-card-header {
      text-align: center;
      padding: 20px 20px;
    }
    .login-title {
      margin: 0;
      text-align: center;
    }
    .el-input /deep/ .el-input__inner {
      text-indent: 12px;
    }
    .svg-container {
      position: absolute;
      top: 0;
      left: 5px;
      color: $dark_gray;
      &_user {
        font-size: 20px;
      }
      &_password {
        left: 7px;
        font-size: 16px;
      }
    }
    .el-button--primary {
      width: 30%;
      padding: 10px 10px;
    }
    .login-primary {
      margin: 0 126px;
    }
    .yzmInput {
      width: 50%;
    }
    .getyzm {
      width: auto;
      // height:20px;
      font-size: 12px;
      margin-left: 10px;
      text-align: center;
    }
    .passw {
      .el-button {
        width: auto;
        height: 20px;
        font-size: 12px;
        line-height: 0px;
        float: right;
        margin-left: 5px;
      }
    }
  }
}
#particles {
  width: 100%;
  height: 100%;
  /*background-color: #b61924;*/
  /*background-color: #23ae88;*/
  background-color: transparent;
  // background-image: url('/static/image/login-bg.jpg');
  /*background-image: url('../img/bg_particles.png');*/
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
</style>