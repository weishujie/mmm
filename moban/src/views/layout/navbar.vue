<template>
  <el-menu class="navbar" mode="horizontal" text-color="#fff" active-text-color="#fff">
    <router-link to="/home">
      <el-menu-item index="1">{{$t('navbar.title')}}</el-menu-item>
    </router-link>

    <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom" v-if="left">
      <!-- <screenfull class="screenfull right-menu-item"></screenfull><el-button round @click="showleft">{{text}}菜单</el-button> -->
    </el-tooltip>

    <!-- <lang-select class="right-menu-item"></lang-select> -->
    <!-- <div class="imgIcon"><i imgIcon class="el-icon-more"></i></div> -->
    <div class="imgDiv">
      <img
        class="imgIcon"
        src="../../assets/image/resizeApi.png"
        alt
        @click="showleft"
        v-if="_isMobile() "
      >
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar">
        <div class="username-wrapper">
          <span class="user-name">{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <router-link class='inlineBlock' to="/user/information">
          <el-dropdown-item>
            个人中心
          </el-dropdown-item>
        </router-link>
        <router-link class='inlineBlock' to="/user/profile">
          <el-dropdown-item>
            修改头像
        </el-dropdown-item>-->
        <!-- </router-link> -->
        <!-- <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
          <el-dropdown-item>
            项目地址
          </el-dropdown-item>
        </a>-->
        <el-dropdown-item @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LangSelect from "@/components/langselect";
import Screenfull from "@/components/screenfull";
export default {
  name: "",
  props: ["left", "text"],
  components: {
    LangSelect,
    Screenfull
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    logout() {
      this.userLogout()
        .then(rel => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
          // this.$router.push({ path: "/login" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    showleft() {
      // 传递父组件 showleft事件
      this.$emit("showleft");
    }
  }
};
</script>
<style>
.imgDiv {
  position: absolute;
  top: 0px;
  left: 0px;
  width:50px;
  height:100%;
  padding: 16px;
   z-index: 9999999999999999;
    outline: none;
}
.imgIcon {
  display: inline-block;
  width: 26px;
  height: 26px;
  outline: none;
}
.el-menu-item {
  padding-left: 50px;
}
</style>

<style scoped lang="scss">
.navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  background: {
    image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#1278f6),
      to(#00b4aa)
    );
    image: -webkit-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
    image: -moz-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
    image: linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
  }
}
.navbar /deep/ .el-menu-item {
  &:hover {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
}
.navbar /deep/ .screenfull {
  position: absolute;
  top: 20px;
  right: 190px;
}
.right-menu-item {
  position: absolute;
  top: 20px;
  right: 150px;
  color: #fff;
}
.avatar-container {
  position: absolute;
  top: 15px;
  right: 40px;
  color: #fff;
  .avatar-wrapper {
    cursor: pointer;
    // .user-avatar {
    //   width: 30px;
    //   height: 30px;
    //   border-radius: 50%;
    //   vertical-align: middle;
    // }
    .username-wrapper {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
<style>
.el-button.is-round {
  position: absolute;
  left: 140px;
  top: 22px;
  padding: 0;
  border-radius: 3px;
  width: 60px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
}
</style>
