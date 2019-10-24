<template>
  <div class="cancle_pay">
    <div class="layer">
      <div class="cancle_pay_title">
        <span>确定取消交易</span>
        <img @click="cancle" src="@/assets/close.png" alt="">
      </div>
      <p class="cancle_pay_notice">如果您已经向卖家付款，请千万不要取消交易</p>
      <p class="cancle_pay_rule">取消规则：买家当日累计3笔取消，会限制当日买入功能</p>
      <div class="cancle_pay_check"  @click="isChecked = !isChecked">
        <img :src="isChecked ? checked : check" alt="">
        <p :class="showRed ? 'red' : ''">我确认还没有付款给对方</p>
      </div>
      <div class="btn_wrap">
        <button class="confirm" @click="cancle">我再想想</button>
        <button :class="isChecked ? 'cancle' : 'pointer cancle'" :disabled="disabled" @click="confirm">确定</button>
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
      isChecked: false,
      showRed: false,
      disabled: false
    }
  },
  methods: {
    cancle () {
      this.$emit('cancle')
    },
    confirm () {
      const _this = this
      if (!(this.isChecked)) {
        this.showRed = true
        return false
      } else {
        this.showRed = false
        this.disabled = true
        setTimeout(() => {
          _this.disabled = false
        }, 5000)
      }
      this.$emit('confirmCancle')
    }
  }
}
</script>
<style lang="less" scoped>
  .cancle_pay{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    .layer{
      width: 446px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      padding-bottom: 2.9vh;
      .cancle_pay_title{
        padding-top: 1.9vh;
        display: flex;
        justify-content: space-between;
        span{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #2D85F0;
          margin-left: 1.2vw;
        }
        img{
          width: 18px;
          height: 18px;
          margin-right: 1vw;
          cursor: pointer;
        }
      }
      .cancle_pay_notice{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FA6400;
        padding-left: 1.2vw;
        margin-top: 0.9vh;
      }
      .cancle_pay_rule{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9AA5B5;
        padding-left: 1.2vw;
        height: 60px;
        line-height: 60px;
      }
      .cancle_pay_check{
        display: flex;
        height: 20px;
        align-items: center;
        padding-left: 1.2vw;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #282633;
        img{
          width: 16px;
          height: 16px;
          margin-right: 0.4vw;
        }
      }
      .btn_wrap{
        margin-top: 3vh;
        text-align: right;
        button{
          margin-right: 1vw;
          height: 44px;
          line-height: 44px;
          width: 120px;
          text-align: center;
          border-radius: 4px;
          color: #2D85F0;
          border: solid 1px #2D85F0;
          cursor: pointer;
          &.confirm{
            background-color: #2D85F0;
            color: #ffffff;
          }
          &.cancle{
            background-color: #ffffff;
            color: #2D85F0;
            cursor: pointer;
            &.pointer{
              color: #999999;
              border: solid 1px #999999;
            }
          }
        }
      }
      .btn{
        width: 230px;
        height: 65px;
        font-size: 24px;
        border-radius: 8px;
        text-align: center;
        line-height: 65px;
        color: #ffffff;
        background-color: #2D85F0;
        margin: 2.8vh auto 0;
        display: block;
      }
      .red{
        color: #EC5F45 !important;
      }
    }
  }
</style>
