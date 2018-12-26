<template>
  <!-- <div class="app-wrapper">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="main-container">
      <tabs-view></tabs-view>
      <app-main></app-main>
    </div>
  </div>-->
 
    <el-container class="contenterss" @touchstart="touchstart()">
      <!-- showleft 绑定点击展开菜单栏事件 -->
      <el-header>
        <navbar :left="left" :text="text" @showleft="showleft"></navbar>
      </el-header>
      <template v-if="!modile">
       <div v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwiperight" class="vtouch" ref="vtouch">
      <el-container class="contabs" ref="contabs" >
        <div class="touchstart"  @touchstart="touchstart()" @touchmove="touchmove()">
        <!-- modile 判断pc显示 移动端隐藏 菜单栏‘
        -->
        <!-- <el-aside width="200" v-if="modile">
          <sidebar></sidebar>
        </el-aside> -->
        <!-- <el-aside> -->
        <!-- show vux 控制菜单栏显示隐藏 -->
         <el-aside width="0">
        <div v-transfer-dom>
          <popup v-model="show" position="left" @on-hide="hide" :show-mask="false">
            <div class="position-horizontal-demo">
              <sidebar></sidebar>
            </div>
          </popup>
        </div>
        </el-aside>
        <!-- </el-aside> -->
        <el-main class="vipgon" ref="vipgon">
          <tabs-view></tabs-view>
          <app-main></app-main>
        </el-main>
        </div>
      </el-container>
      </div>
      </template> 
      <template v-if="modile">
         <el-container class="contabs">
        <!-- modile 判断pc显示 移动端隐藏 菜单栏‘
        -->
        <el-aside width="150">
          <sidebar></sidebar>
        </el-aside>
        <el-main class="vipgon" ref="vipgon">
          <tabs-view></tabs-view>
          <app-main></app-main>
        </el-main>
      </el-container> 
      </template>
    </el-container>
</template>
<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import TabsView from "./tabs-view";
import AppMain from "./app-main";
import { TransferDom, Popup } from "vux";
import BScroll from "better-scroll"
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Navbar,
    Sidebar,
    TabsView,
    AppMain
  },
  data() {
    return {
      modile: false,
      left: false,
      show: false,
      text: "展开",
      startX:"",
      startY:"",
      moveEndX:"",
      moveEndY:"",
      X:"",
      Y:""
    };
  },
  mounted() {
   
    if (this._isMobile()) {
      //移动端
      this.left = true;
      // this.$refs.vipgon.$el.style.overflow = "inherit";
      // this.$refs.vipgon.$el.style.width = "100%";
      // this.$refs.vtouch.$el.style.position = "absolute";
      // this.$refs.vtouch.$el.style.top = "50px";
      // this.$refs.vtouch.$el.style.left = "0";
      // this.$refs.vtouch.$el.style.width = "100%";
      // this.$refs.vtouch.$el.style.height = "100%";
          // this.$refs.contabs.$el.style.zIndex = "-1";

    } else {
      //不是移动端pc
      this.modile = true;
    }
  },
  methods: {
      touchstart() {
      var e = window.event;
      // e.preventDefault();
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
    },
    touchmove() {
      var e = window.event; // e.preventDefault(); // 阻止浏览器默认事件
      this.moveEndX = e.targetTouches[0].pageX;
      this.moveEndY = e.targetTouches[0].pageY;
      this.X = this.moveEndX - this.startX;
      this.Y = this.moveEndY - this.startY;
      if (
        Math.abs(this.X) > 20 &&
        Math.abs(this.X) > Math.abs(this.Y) &&
        this.X > 0
      ) {
        // console.log("aa");
        if (this.show == false) {
          // console.log("右滑事件");
          this.show = true;
        }
      } else if (
        Math.abs(this.X) > 20 &&
        Math.abs(this.X) > Math.abs(this.Y) &&
        this.X < 0
      ) {
        if (this.show == true) {
          //           for(var i=0;i<this.item.length;i++){
          //             if(this.show[i].deleteShow == true){
          //               this.show[i].deleteShow = false;
          //             }
          //           };
          // console.log("左滑事件");
          this.show = false;
        }
      }
    },
    
    onSwipeLeft() {
      console.log("left");
      this.show = false;
      // this.text = "关闭";
      
    },
    onSwiperight() {
      console.log("left");
      this.show = true;
      // this.text = "展开";
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },

    showleft() {
      this.show = !this.show;
      // if (this.show) {
      //   this.text = "关闭";
      // } else {
      //   this.text = "展开";
      // }
    },
    hide() {
      this.text = "展开";
    }
  }
};
</script>

<style>
.el-header {
  padding: 0;
}
.el-main{
  padding: 0;
}
.is-vertical{
  position: relative;
  width: 100%;
  height: 100%;
}
.contabs{
  position: absolute;
  width:100%;
  height:100%;
  bottom: 0;
  left: 0;
  right: 0;
  top:60px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 0;
   -webkit-overflow-scrolling:touch!important;
  /* pointer-events:auto; */
}
.contabs .touchstart{
  width:100%;
  height:100%;
}
.vux-popup-dialog.vux-popup-left {
  top: 57px !important;
  z-index: 99999;
  width:150px!important;
   /* overflow-y:inherit */
  overflow: hidden;
}
.vux-popup-dialog.vux-popup-left:focus{
  background-color: transparent;
}
.el-menu-item:focus{
  background-color: transparent;
}
.el-submenu{
  /* width:150px; */
  /* border-right: 1px solid #e6e6e6; */
}
.el-submenu li{
  width:150px!important;
  padding: 0;
}
.position-horizontal-demo {
  width:auto;
  height: 100%;
  position: absolute;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch!important;
}
</style>

<style scoped lang="scss">
// .app-wrapper {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   .main-container {
//     padding-left: 201px;
//     padding-top: 61px;
//   }
// }
</style>