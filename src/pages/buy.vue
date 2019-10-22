<template>
  <div class="index">
    <p class="title">购买 USDT</p>
    <p class="border" />
    <ul class="order">
      <li class="price">
        <p>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</p>
        <p>￥200</p>
      </li>
      <li>
        <p>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</p>
        <p>￥7.13/USDT</p>
      </li>
      <li>
        <p>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</p>
        <p>28.05 USDT</p>
      </li>
      <li>
        <p>购买方式：</p>
        <div class="radio">
          <label v-for="(item, index) in types" :key="index">
            <img :src="checkedValue === index ? item.selectIcon : item.icon" class="icon" alt="">
            <input v-model="checkedValue" type="radio" name="Q3" :value="index"/>
            <span :class="checkedValue === index ? 'active' : ''">{{item.text}}</span>
            <img :src="checkedValue === index ? checked : check" class="check" alt="">
          </label>
        </div>
      </li>
      <li v-show="checkedValue === 0">
        <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</p>
        <div>
          <input type="text" v-model="name" class="input" placeholder="请输入付款账号姓名">
          <p class="red">* 请输入您用于转账的银行卡对应的姓名，并确保所输姓名与实际付款账户一致，否则将导致您的资金损失</p>
        </div>
      </li>
      <li v-show="checkedValue === 1 || checkedValue === 2">
        <p>付&nbsp;款&nbsp;码：</p>
        <img src="@/assets/upload.png" class="upload" alt="">
      </li>
    </ul>
    <button class="btn" @click="submit">提交订单</button>
    <ul class="notice">
      <li>1.USDT到账数量以实际交割为准</li>
      <li>2.如有大额交易需求可直接联系客服微信：swftcoin2。</li>
      <li>3.OTC交易时间为北京时间9：00——22：00</li>
      <li>4.所有承兑商均通过wallet c2c认证并抵押保证金，请放心兑换</li>
      <li>5.根据中国法律规定，虚拟货币不具有法偿性与强制性等货币属性，购买代表中国用户已知晓相关法律问题，愿自担相关风险。</li>
    </ul>
  </div>
</template>

<script>
import checked from '@/assets/checked.png';
import check from '@/assets/check.png'
import card from '@/assets/card.png'
import wechat from '@/assets/wechat.png'
import alipay from '@/assets/alipay.png'
import card2 from '@/assets/card2.png'
import wechat2 from '@/assets/wechat2.png'
import alipay2 from '@/assets/alipay2.png'
export default {
  name: 'Buy',
  data () {
    return {
      types: [{
        text: '银行卡',
        icon: card,
        selectIcon: card2
        }, {
        text: '微信',
        icon: wechat,
        selectIcon: wechat2
      }, {
        text: '支付宝',
        icon: alipay,
        selectIcon: alipay2
      }],
      checkedValue: 0,
      checked,
      check,
      name: '',
    }
  },
  watch:{
    checkedValue:function(){
      console.log(this.checkedValue);
    }
  },
  methods: {
    validate () {
      if (this.name.length < 1) {
        this.$message({
          message: '请输入收款人姓名',
          type: 'warning',
          center: true
        })
        return false
      }
    },
    submit() {
      if (this.validate() === false) return;
      this.$router.push({
        path: '/buyConfirm'
      })
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
        display: flex;
        &.price{
          p:nth-child(2){
            color: #EC5F45;
            font-size: 32px;
          }
        }
        p:nth-child(1){
          width: 90px;
          // display: inline-block;
          // text-align-last:justify;
          // text-align:justify;
          // text-justify:distribute-all-lines; // 兼容IE浏览器
          color: #333333;
          font-size: 18px;
          font-family: PingFangSC-Regular;
          margin-right: 1vw;
        }
        p:nth-child(2){
          color: #999999;
          font-size: 18px;
          font-family: PingFangSC-Regular;
        }
        .radio{
          display: flex;
          align-items: center;
          justify-content: space-between;
          label{
            display: flex;
            align-items: center;
            margin-right: 2vw;
            .icon{
              display: inline-block;
              width: 18px;
              height: auto;
            }
            input{
              opacity: 0;
              width: 0;
              height: 0;
            }
            span{
              margin-right: 0.4vw;
              margin-left: .4vw;
              color: #999999;
              &.active{
                color: #2D85F0;
              }
            }
            .check{
              width: 16px;
              height: 16px;
              
              display: block;
            }
          }
        }
        .input{
          width: 273px;
          height: 50px;
          border: solid 1px #D4D4D4;
          border-radius: 4px;
          padding-left: 0.7vw;
        }
        .red{
          color: #EC5F45 !important;
          font-size: 14px;
          font-family: PingFangSC-Regular;
        }
      }
    }
    .btn{
      cursor: pointer;
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
