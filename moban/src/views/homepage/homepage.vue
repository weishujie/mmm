<template>
  <div class="homepage-container">
    <template v-if="level==3">
      <InitDire/>
    </template>
    <template  v-if="level==4">
      <Initman/>
    </template>
     <template  v-if="level!=3&&level!=4">
        首页
    </template>
  </div>
</template>
<script>
import InitDire from "./home-component/init-director";
import Initman from "./home-component/init-manager";
import store from "@/store/index";
// import CountUp from 'countup.js'
// import {getHomeTotal, getHomeDetailItem, getRank} from '@/api/homepage'//获取首页的数据
// import ColorLine from '@/components/color-line'
// import NearSixMonth from '@/views/homepage/near-six-month'
// import BScroll from 'better-scroll'
// import InvestmentPie from '@/views/homepage/investment-pie'
// import FinancingPie from '@/views/homepage/financing-pie'
export default {
  components: {
    InitDire,
    Initman
  },
  data() {
    return {
      level: store.getters.level
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.home-total {
  width: 100%;
  min-width: 800px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 0 15px 0;
  .home-total-item {
    box-sizing: border-box;
    display: inline-block;
    width: 25%;
    height: 100%;
    padding: 15px 0;
    vertical-align: top;
    .wrapper-item {
      height: 100%;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      text-align: center;
      .title {
        margin: 0px 0;
      }
      .value {
        margin: 5px 0;
        font-size: 26px;
      }
    }
    &:last-child {
      .wrapper-item {
        border: none;
      }
    }
  }
}
</style>