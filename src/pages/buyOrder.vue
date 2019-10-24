<template>
  <div class="sale_order">
    <div class="title">
      <img src="@/assets/chuizi.png" alt="">
      <span>购买 USDT</span>
    </div>
    <ul class="lists">
      <li class="price">
        <p>总价：</p>
        <p>{{theRequest.orderAmount}}CNY</p>
      </li>
      <li>
        <p>数量：</p>
        <p>{{theRequest.nums}}USDT</p>
      </li>
      <li>
        <p>单价：</p>
        <p>{{cnyToUsdt}}CNY</p>
      </li>
    </ul>
    <div class="order_num">
      <p>订单号：</p>
      <p>{{theRequest.orderId}}</p>
    </div>
    <div class="order_status">
      <p>订单状态</p>
      <p></p>
    </div>
    <div class="order_status_icon">
      <img src="@/assets/zhuanzhang.png" alt="">
      <p>商家确认中，请稍候</p>
    </div>
    <button class="btn" @click="toRecord">查看订单</button>
    <p class="notice">您的订单已经收到；等待承兑商确认收款。如在交易高峰期，请您耐心等待，若为及时到账，请咨询wallet c2c客服微信：swftcoin2。</p>
  </div>
</template>

<script>
import util from '@/utils/util'
import dess from '@/utils/dess'
import api from '@/utils/api'
export default {
  name: 'buyOrder',
  data () {
    return {
      theRequest: {},
      cnyToUsdt: ''
    }
  },
  components: {
  },
  mounted () {
    const theRequest = util.decodeURI(dess.decryptByDESModeEBC(this.$route.params.info))
    this.theRequest = theRequest
    this.cnyToUsdt = localStorage.getItem('cnyToUsdt')
  },
  methods: {
    toRecord () {
      api.orderList()
    }
  }
}
</script>
<style lang="less" scoped>
  .sale_order{
    padding-top: 3.3vh;
    padding-bottom: 2vh;
    width: 1226px;
    margin: 5.6vh auto 5.8vh;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.03);
    .title{
      padding-left: 1.9vw;
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #167CF0;
      img{
        width: 32px;
        height: 32px;
        margin-right: 0.5vw;
      }
    }
    .lists{
      padding-left: 2.2vw;
      display: flex;
      padding-top: 4vh;
      li{
        width: 300px;
        list-style: none;
        p:nth-child(1) {
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #9AA5B5;
          line-height: 30px;
          height: 30px;
        }
        p:nth-child(2) {
          line-height: 40px;
          height: 40px;
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #1C242C;
        }
        &.price{
          p:nth-child(2) {
            color: #EC5F45;
          }
        }
      }
    }
    .order_num{
      padding-top: 2vh;
      padding-left: 2.2vw;
      p:nth-child(1) {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #9AA5B5;
        line-height: 30px;
        height: 30px;
      }
      p:nth-child(2) {
        line-height: 40px;
        height: 40px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #1C242C;
      }
    }
    .order_status{
      display: flex;
      align-items: center;
      padding-left: 2.2vw;
      padding-top: 2vh;
      p:nth-child(1) {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #9AA5B5;
        line-height: 30px;
        height: 30px;
        margin-right: 0.9vw;
      }
      p:nth-child(2) {
        width: 1050px;
        height: 1px;
        background-color: rgba(#D8D8D8, 1);
      }
    }
    .order_status_icon{
      margin-top: 13vh;
      margin-bottom: 8.7vh;
      height: 115px;
      line-height: 115px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      color: #9AA5B5;
      img{
        width: 115px;
        height: 89px;
        margin-right: 1.4vw;
      }
    }
    .btn{
      cursor: pointer;
      background-color: #2D85F0;
      color: #ffffff;
      width: 156px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      border-radius: 4px;
      display: block;
      margin: 0 auto 8.9vh;
      font-size: 18px;
      font-family: PingFangSC-Medium;
    }
    .notice{
      text-align: center;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #9AA5B5;
    }
  }
</style>
