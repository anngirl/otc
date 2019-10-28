<template>
  <div class="buy_order">
    <div class="title">
      <img src="@/assets/chuizi.png" alt="">
      <span>购买 USDT</span>
    </div>
    <ul class="lists">
      <li class="price">
        <p>总价：</p>
        <p>{{details.cnyAmount}}CNY</p>
      </li>
      <li>
        <p>数量：</p>
        <p>{{details.nums}}88USDT</p>
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
    <div class="order_status_pay" v-if="customerId && details.payWay == 3">
      <p>请务必使用本人（{{customerId}}） 的支付方式向一下账号自行转账</p>
    </div>
    <div class="order_status_pay" v-if=" customerId && (details.payWay == 2 || details.payWay == 1)">
      <p>请使用<span v-text="details.payWay == 2 ? '微信账号' : '支付宝手机号/姓名'" />（{{customerId}}）向以下账户自行转账</p>
    </div>
    <ul class="pay_info" v-if="details.payWay == 3">
      <li class="pay_type">银行卡</li>
      <li class="pay_name">{{details.name}}</li>
      <li class="card_info">{{ details.cardNo }} ， {{details.bankName}}</li>
    </ul>
    <ul class="pay_info pay_info2" v-if="details.payWay == 1">
      <li class="pay_type2">收款人：<span>{{details.name}}</span></li>
      <!-- <li class="pay_name2">支付宝手机号/账号：<span>13718391141</span></li> -->
      <li class="card_info2">支付宝收款码：
        <img src="@/assets/icon.png" class="icon" alt="">
        <img class="code" @click="showImg = true" :src="details.imgUrl" alt="">
      </li>
    </ul>
    <ul class="pay_info3" v-if="details.payWay == 2">
      <img :src="details.imgUrl" @click="showImg = true" alt="">
      <span>{{details.name}}</span>
    </ul>
    <div class="confirm_pay">
      <div class="confirm_pay_left">
        <div class="confirm_pay_left_top">
          <p>待转账，请向对方转账</p>
          <p><span>{{firstTime}}</span>:<span>{{lastTime}}</span></p>
        </div>
        <p class="confirm_pay_left_bottom">{{details.cnyAmount}}<span>CNY</span></p>
      </div>
      <div class="confirm_pay_right">
        <button class="confirm" @click="complete" :disabled="disabled">我已完成转账</button>
        <button class="cancle" @click="showLayer = true">取消订单</button>
      </div>
    </div>
    <ul class="notice">
      <li>
        <p class="question">OTC交易会自动扣款吗？</p>
        <p class="answer">OTC交易不会自动扣款，您需要按照卖方（在此笔订单提供）的支付方式，通过网银、支付宝等自行转账给卖方，转账时，请务必认真核对卖方提供的收款方式。</p>
      </li>
      <li>
        <p class="question">转款注意事项</p>
        <p class="answer">请勿在转账时使用“比特币”、“BTC”、“USDT”等与虚拟货币相关的词汇，以免您的银行卡遭受冻结</p>
      </li>
      <li>
        <p class="question">转款注意事项</p>
        <p class="answer">若交易金额大于50,000 CNY，法定假日或工作日17:00点以后汇款到银行卡可能造成到账不及时，请分批支付保证及时到账，若未及时到账，卖方有权拒绝成交。</p>
        <p class="answer">您购买的USDT已在平台系统完成托管锁定，确保您的资金安全</p>
      </li>
    </ul>
    <div v-if="showImg">
      <Code :imgUrl="details.imgUrl" @close="showImg = false" />
    </div>
    <div v-if="showLayer">
      <CancleOrder @cancle="showLayer = false" @confirmCancle="confirmCancle" />
    </div>
  </div>
</template>
<script>
import CancleOrder from '@/components/cancleOrder'
import Code from '@/components/Code'
import dess from '@/utils/dess'
import util from '@/utils/util'
import request from '@/utils/request'
import api from '@/utils/api'
let timer = null
export default {
  name: 'saleOrder',
  data () {
    return {
      showLayer: false,
      details: {},
      cnyToUsdt: '',
      firstTime: '00',
      lastTime: '00',
      customerId: '',
      disabled: false,
      showCode: false,
      showImg: false
    }
  },
  components: {
    CancleOrder,
    Code
  },
  mounted () {
    const _this = this
    const theRequest = util.decodeURI(dess.decryptByDESModeEBC(this.$route.params.info))

    let customerId = theRequest.customerId
    if(customerId) {
      if (customerId.length == 4) {
        this.customerId = customerId.substring(0,1)+"**"+customerId.substring(2,3)
      } else if (customerId.length == 3) {
        this.customerId = customerId.substring(0,1)+ "*" + customerId.substring(2,customerId.length)
      } else if (customerId.length == 2) {
        this.customerId = "*" + customerId.substring(1,customerId.length)
      } else if (customerId.length > 4) {
        this.customerId = customerId.substring(0, 1) + "****";
      }
    }
    
    this.cnyToUsdt = localStorage.getItem('cnyToUsdt')
    request.post(`/third/v1/otc/tradeStatus/${theRequest.orderId}`).then((res) => {
      this.details = res.obj
      this.$cookies.set('times', res.obj.countDown)
      timer = setInterval(() => {
        _this.antitime()
      }, 1000)
      if (res.obj.status === "付款超时或用户取消" || res.obj.status === "商家取消") {
        const userId = this.$cookies.get('userId')
        const outuid = this.$cookies.get('outuid')
        const buyOrderStatus = dess.encryptByDESModeCBC(`userId=${userId}&outuid=${outuid}&orderNo=${theRequest.orderId}&cnyAmount=${theRequest.orderAmount}&usdtAmount=${theRequest.nums}`)
        this.$router.replace({
          path: `/buyCancle/${this.$route.params.info}`
        })
      } else if (res.obj.status === "交易完成") {
        this.$router.replace({
          path: '/'
        })
      }
    })
  },
  beforeDestroy () {
    const _this = this
    clearInterval(timer)
  },
  methods: {
    confirmCancle () {
      // 取消购买
      this.showLayer = false
      api.cancleBuy(this.$route.params.info)
    },
    complete () {
      this.disabled = true
      const _this = this
      api.completeBuy(this.$route.params.info)
      setTimeout(() => {
        _this.disabled = false
      }, 5000)
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    antitime() {
      const _this = this;
      var timess=this.$cookies.get("times");
      var time = this.timestampToTime(timess);
      var to = new Date(time.replace(/-/g,"/"));
      var now = new Date();
      var deltaTime = to.getTime() - now.getTime();
      if (deltaTime <= 0) {
        clearInterval(_this.antitime());
        return;
      }
      var d= deltaTime / (1000 * 60 * 60 * 24);
      var h = Math.floor(deltaTime / 1000 / 60 / 60 % 24);
      var m = Math.floor(deltaTime / 1000 / 60 % 60);
      var s = Math.floor(deltaTime / 1000 % 60);
      var timeStr = "" + (m/10>=1?m=m:m="0"+m) + (s/10>=1?s=s:s="0"+s)
      if(parseInt(timeStr) < 3) {
        this.$router.replace({
          path: `/buyCancle/${this.$route.params.info}`
        })
      }
      this.firstTime = timeStr.substr(0, 2)
      this.lastTime = timeStr.substr(2, 2)
    }
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
      width: 1140px;
      height: 54px;
      line-height: 54px;
      background-color: #FDF9F2;
      border: solid 1px #F4DAA9;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      margin: 0 auto;
      p{
        padding-left: 2.8vw;
      }
    }
    .pay_info{
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      width: 1140px;
      border-bottom: solid 1px #D8D8D8;
      margin: 3.3vh auto 0;
      padding-bottom: 3vh;
      margin-top: 6.1vh;
      li{
        list-style: none;
        &.pay_type{
          font-size: 14px;
          color: #FAAD14;
          font-family: PingFangSC-Regular;
          border: solid 1px #F2F3FA;
          width: 70px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 1.4vw;
        }
        &.pay_name{
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #495666;
          margin-right: 4.5vw;
        }
        &.card_info{
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #495666;
        }
      }
    }
    .pay_info2{
      li{
        list-style: none;
        font-size: 14px;
        color: #282633;
        margin-right: 120px;
        span{
          margin-left: 13px;
          color: #686770;
        }
        &.card_info2{
          display: flex;
          align-items: center;
          .icon{
            width: 63px;
            height: 19px;
            margin-left: 13px;
            margin-right: 4px;
          }
          .code{
            cursor: pointer;
            width: 28px;
            height: 28px;
          }
          font-family: PingFangSC-Regular;
        }
      }
    }
    .pay_info3{
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        margin-top: 1.9vh;
        margin-bottom: 0.7vh;
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
      span{
        line-height: 30px;
        height: 30px;
        color: #000000;
        font-size: 14px;
        padding-bottom: 0.7vh;
      }
    }
    .confirm_pay{
      background-color: rgba(#2D85F0 , 0.1);
      width: 1226px;
      height: 124px;
      display: flex;
      justify-content: space-between;
      .confirm_pay_left{
        padding-left: 1.5vw;
        .confirm_pay_left_top{
          display: flex;
          height: 34px;
          align-items: center;
          line-height: 34px;
          padding-top: 2.6vh;
          margin-bottom: 0.7vh;
          p:nth-child(1) {
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #333333;
            margin-right: 0.7vw;
          }
          p:nth-child(2){
            font-family: PingFangSC-Medium;
            font-size: 22px;
            color: #FA6400;
            span{
              border: 1px solid #FA6400;
              border-radius: 3px;
              width: 32px;
              height: 22px;
              text-align: center;
              line-height: 22px;
              display: inline-block;
            }
          }
        }
        .confirm_pay_left_bottom{
          height: 40px;
          line-height: 40px;
          color: #2D85F0;
          font-family: PingFangSC-Medium;
          font-size: 28px;
          span{
            padding-left: 0.7vw;
            font-size: 18px;
          }
        }
      }
      .confirm_pay_right{
        button{
          height: 50px;
          line-height: 50px;
          color: #ffffff;
          border-radius: 4px;
          position: relative;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 18px;
          cursor: pointer;
          &.confirm{
            background-color: #2D85F0;
            margin-right: 1vw;
            width: 231px;
          }
          &.cancle{
            background-color: rgba(#212C68, 0.37);
            margin-right: 3.2vw;
            width: 130px;
          }
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
