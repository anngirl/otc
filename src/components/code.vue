<template>
  <div class="sale_pay">
    <div class="layer">
      <div class="sale_pay_title">
        <span>填写收款信息</span>
        <img @click="close" src="@/assets/close.png" alt="">
      </div>
      <img :src="imgUrl" class="code" alt="">
    </div>
  </div>
</template>

<script>
import checked from '@/assets/checked.png';
import check from '@/assets/check.png'
import request from "@/utils/request";
import upload from "@/assets/upload.png";
export default {
  name: 'salePay',
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  methods: {
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
      height: 480px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
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
      .code{
        width: 300px;
        height: 300px;
        display: block;
        margin: 60px auto 100px;
      }
    }
  }
</style>
