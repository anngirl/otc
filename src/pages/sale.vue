<template>
  <div class="index">
    <p class="title">出售 USDT</p>
    <p class="border" />
    <ul class="order">
      <li class="price">
        <span>总价</span>
        <span>￥200</span>
      </li>
      <li>
        <span>单价</span>
        <span>￥7.13/USDT</span>
      </li>
      <li>
        <span>数量</span>
        <span>28.05 USDT</span>
      </li>
    </ul>
    <button class="btn" @click="showLayer = true">提交订单</button>
    <ul class="notice">
      <li>1.USDT到账数量以实际交割为准</li>
      <li>2.如有大额交易需求可直接联系客服微信：swftcoin2。</li>
      <li>3.OTC交易时间为北京时间9：00——22：00</li>
      <li>4.所有承兑商均通过wallet c2c认证并抵押保证金，请放心兑换</li>
      <li>5.根据中国法律规定，虚拟货币不具有法偿性与强制性等货币属性，购买代表中国用户已知晓相关法律问题，愿自担相关风险。</li>
    </ul>
    <div v-if="showLayer">
      <SalePay @close="showLayer = false" @confirm="confirm" />
    </div>
  </div>
</template>

<script>
import SalePay from '@/components/salePay'
export default {
  name: 'Sale',
  data () {
    return {
      showLayer: false
    }
  },
  components: {
    SalePay
  },
  methods: {
    confirm () {
    }
  }
}
</script>
<style lang="less" scoped>
  .index{
    width: 1226px;
    margin: 5.6vh auto;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.03);
    .title{
      color: #167CF0;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      padding-left: 1.8vw;
      padding-top: 3.2vh;
      line-height: 34px;
      height: 34px;
      text-align: left;
    }
    .border{
      width: 76px;
      height: 2px;
      background-color: #2D85F0;
      margin-left: 3vw;
    }
    .order{
      padding-left: 2vw;
      li{
        list-style: none;
        text-align: left;
        line-height: 60px;
      }
      .price{
        span:nth-child(2){
          color: #EC5F45;
          font-size: 32px;
        }
      }
      span:nth-child(1){
        letter-spacing: 30px;
        color: #333333;
        font-size: 18px;
        font-family: PingFangSC-Regular;
      }
      span:nth-child(2){
        color: #999999;
        font-size: 18px;
        font-family: PingFangSC-Regular;
      }
    }
    .btn{
      text-align: center;
      background-color: #2D85F0;
      border-radius: 8px;
      width: 230px;
      height: 65px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #FFFFFF;
      margin-left: 6.7vw;
      margin-top: 1vh;
    }
    .notice{
      margin-top: 3.7vh;
      margin-left: 2vw;
      margin-bottom: 3.3vh;
      li{
        list-style: none;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8B9090;
        letter-spacing: 0;
        line-height: 28px;
      }
    }
  }
</style>
