<template>
  <div class="confirm_pay">
    <div class="layer">
      <div class="confirm_pay_title">
        <span>确认支付</span>
        <img @click="cancle" src="@/assets/close.png" alt="">
      </div>
      <p class="confirm_pay_notice">500 CNY</p>
      <div class="confirm_pay_status">
        <p>请确认转账账户</p>
        <p></p>
      </div>
      <div class="confirm_pay_check">
        <div class="confirm_pay_check_left">
          <img :src="isChecked ? checked : check" alt="">
          <span>银行卡支付</span>
        </div>
        <div class="confirm_pay_check_right">
          <span>王浩然</span>
          <span>15812345678</span>
        </div>
      </div>
      <div class="btn_wrap">
        <button class="confirm" @click="cancle">还未付款</button>
        <button class="cancle" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import checked from '@/assets/checked.png';
import check from '@/assets/check.png'
export default {
  name: 'CancleOrder',
  data () {
    return {
      checked,
      check,
      isChecked: true
    }
  },
  components: {
  },
  methods: {
    cancle () {
      this.$emit('cancle')
    },
    confirm () {
      this.$emit('confirmBuy')
    }
  }
}
</script>
<style lang="less" scoped>
  .confirm_pay{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    .layer{
      width: 466px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      padding-bottom: 2.9vh;
      .confirm_pay_title{
        padding-top: 1.9vh;
        display: flex;
        justify-content: space-between;
        span{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          margin-left: 1.2vw;
        }
        img{
          width: 18px;
          height: 18px;
          margin-right: 1vw;
          cursor: pointer;
        }
      }
      .confirm_pay_notice{
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #2D85F0;
        padding-left: 1.2vw;
        margin-top: 0.9vh;
      }
      .confirm_pay_status{
        display: flex;
        width: 427px;
        height: 70px;
        margin: 0 auto;
        color: #9AA5B5;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p:nth-child(2){
          width: 260px;
          height: 1px;
          background-color: #D8D8D8;
        }
      }
      .confirm_pay_check{
        width: 427px;
        margin: 0 auto 2.8vh;
        border: solid 1px #F4DAA9;
        background-color: #FDF9F2;
        display: flex;
        height: 54px;
        align-items: center;
        justify-content: space-between;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #282633;
        .confirm_pay_check_left{
          display: flex;
          align-items: center;
          img{
            width: 16px;
            height: 16px;
            margin-right: 0.7vw;
            margin-left: 1.2vw;
          }
          span{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #2D85F0;
          }
        }
        .confirm_pay_check_right{
          margin-right: 1.6vw;
          span{
            margin-right: 1vw;
          }
        }
      }
      .btn_wrap{
        margin-top: 3vh;
        text-align: right;
        width: 427px;
        margin: 0 auto;
        button{
          height: 44px;
          line-height: 44px;
          width: 120px;
          text-align: center;
          border-radius: 4px;
          color: #2D85F0;
          cursor: pointer;
          &.confirm{
            color: #333333;
          }
          &.cancle{
            background-color: #2D85F0;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
