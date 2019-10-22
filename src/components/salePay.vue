<template>
  <div class="sale_pay">
    <div class="layer">
      <div class="sale_pay_title">
        <span>填写收款信息</span>
        <img @click="close" src="@/assets/close.png" alt="">
      </div>
      <div class="sale_pay_lists">
        <div class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款姓名：</span>
          </p>
          <input type="text" v-model="name" placeholder="请输入收款人姓名">
        </div>
        <div class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款方式：</span>
          </p>
          <div class="radio">
            <label v-for="(item, index) in types" :key="index">
              <img :src="checkedValue === index ? checked : check" alt="">
              <input v-model="checkedValue" type="radio" name="Q3" :value="index"/>
              <span>{{item}}</span>
            </label>
          </div>
        </div>
        <div v-show="checkedValue === 0" class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款银行：</span>
          </p>
          <input type="text" v-model="bank" placeholder="请输入收款银行">
        </div>
        <div v-show="checkedValue === 0" class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款卡号：</span>
          </p>
          <input type="text" v-model="card" placeholder="请输入收款银行卡号">
        </div>
        <div v-show="checkedValue === 1 || checkedValue === 2" class="sale_pay_item sale_pay_upload">
          <p>
            <span class="red">*</span>
            <span>上传二维码：</span>
          </p>
          <div class="upload">
            <img src="@/assets/upload.png" alt="">
            <p>请上传收款二维码</p>
          </div>
        </div>
      </div>
      <button class="btn" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
import checked from '@/assets/checked.png';
import check from '@/assets/check.png'
export default {
  name: 'salePay',
  data () {
    return {
      name: '',
      bank: '',
      card: '',
      types: ['银行卡', '微信', '支付宝'],
      checkedValue: 0,
      checked,
      check
    }
  },
  watch:{
    checkedValue:function(){
      console.log(this.checkedValue);
    }
  },
  components: {
  },
  methods: {
    validate () {
      if (this.bank.length < 1) {
        this.$message({
          message: '请输入收款银行',
          type: 'warning',
          canter: true
        })
      }
      if (this.card.length < 1) {
        this.$message({
          message: '请输入银行卡号',
          type: 'warning',
          canter: true
        })
      }
    },
    confirm () {
      if (this.name.length < 1) {
        this.$message({
          message: '请输入收款人姓名',
          type: 'warning',
          canter: true
        })
      }
      if (this.checkedValue === 0) {
        if (this.validate() === false) return;
        this.$router.push({
          path: '/saleConfirm'
        })
      } else if (this.checkedValue === 1) {
        this.$message('其他支付方式')
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
  .sale_pay{
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
      .sale_pay_title{
        padding-top: 1.9vh;
        display: flex;
        justify-content: space-between;
        span{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #2D85F0;
          margin-left: 1.3vw;
        }
        img{
          width: 18px;
          height: 18px;
          margin-right: 1vw;
          cursor: pointer;
        }
      }
      .sale_pay_lists{
        padding-left: 1.5vw;
        margin-top: 3vh;
        .sale_pay_item{
          display: flex;
          margin-bottom: 1.9vh;
          p{
            height: 46px;
            line-height: 46px;
            color: #151515;
            font-size: 18px;
            margin-right: 0.5vw;
            .red{
              color: #FF4830;
            }
          }
          input{
            padding-left: 0.7vw;
            width: 273px;
            height: 46px;
            font-size: 18px;
            border: solid 1px #D4D4D4;
            border-radius: 4px;
            color: #151515;
          }
          .radio{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 273px;
            label{
              display: flex;
              align-items: center;
              input{
                opacity: 0;
                width: 0;
                height: 0;
              }
              img{
                width: 16px;
                height: 16px;
                margin-right: 0.2vw;
                display: block;
              }
            }
          }
        }
        .sale_pay_upload{
          .upload{
            margin-top: 15px;
            img{
              width: 100px;
              height: 100px;
            }
            p{
              color: #999999;
              font-size: 14px;
              line-height: 18px;
              height: 18px;
            }
          }
        }
      }
      .btn{
        cursor: pointer;
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
    }
  }
</style>
