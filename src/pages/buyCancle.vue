<template>
  <div class="buy_order">
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
    <div class="order_status">
      <p>卖家收款方式</p>
      <p></p>
    </div>
    <div class="order_status_pay">
      <img src="@/assets/empty.png" alt="">
      <p>{{status}}</p>
    </div>
    <div class="confirm_pay">
      <div class="confirm_pay_left">
        <img src="@/assets/close.png" alt="">
      </div>
      <div class="confirm_pay_right">
        <p>订单已取消</p>
        <p>如有问题请联系客服微信：swftcoin2。</p>
      </div>
    </div>
    <ul class="notice">
      <li>
        <p class="question">我的订单自动取消了怎么办？</p>
        <p class="answer">若已完成转账，超过15分钟未标记已转账，系统将自动取消该笔订单。</p>
      </li>
      <li>
        <p class="question">多次取消订单对我有什么影响？</p>
        <p class="answer">如果24小时内主动取消或超时取消有三笔以上（含三笔）订单，将限制OTC买入功能</p>
      </li>
    </ul>
  </div>
</template>
<script>
import util from '@/utils/util'
import dess from '@/utils/dess'
import request from '@/utils/request'
export default {
  name: 'buyCancle',
  data () {
    return {
      theRequest: {},
      cnyToUsdt: '',
      status: '订单已取消，不可查看支付方式'
    }
  },
  mounted () {
    const _this = this;
    const theRequest = util.decodeURI(dess.decryptByDESModeEBC(this.$route.params.info))
    this.theRequest = theRequest
    this.cnyToUsdt = localStorage.getItem('cnyToUsdt')
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
  .buy_order{
    padding-top: 3.3vh;
    padding-bottom: 4vh;
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
    .order_status{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1140px;
      margin: 0 auto;
      padding-top: 4vh;
      padding-bottom: 1.5vh;
      p:nth-child(1) {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #9AA5B5;
        line-height: 30px;
        height: 30px;
        margin-right: 0.9vw;
      }
      p:nth-child(2) {
        width: 980px;
        height: 1px;
        background-color: rgba(#D8D8D8, 1);
      }
    }
    .order_status_pay{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30vh;
      img{
        width: 81px;
        height: 99px;
        margin-right: 0.7vw;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #9AA5B5;
      }
    }
    .confirm_pay{
      background-color: rgba(#2D85F0 , 0.1);
      width: 1226px;
      height: 124px;
      display: flex;
      align-items: center;
      .confirm_pay_left{
        padding-left: 1.9vw;
        padding-right: 1.3vw;
        img{
          width: 54px;
          height: 54px;
        }
      }
      .confirm_pay_right{
        p:nth-child(1) {
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #333333;
        }
        p:nth-child(2) {
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #9AA5B5;
        }
      }
    }
    .notice{
      margin-top: 1.9vh;
      li{
        list-style: none;
        padding-left: 0.9vw;
        .question{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 28px;
        }
        .answer{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          line-height: 28px;
        }
      }
      
    }
  }
</style>
