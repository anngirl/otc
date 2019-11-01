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
            <label v-for="(item, index) in types" :key="index" :class="item.value == 0 ? 'nopointer' : ''">
              <img :src="checkedValue === item.text ? checked : check" alt="">
              <input v-model="checkedValue" type="radio" name="Q3" :value="item.text"/>
              <span>{{item.text}}</span>
            </label>
          </div>
        </div>
        <div v-show="checkedValue === '银行卡'" class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款银行：</span>
          </p>
          <input type="text" v-model="bank" placeholder="请输入收款银行">
        </div>
        <div v-show="checkedValue === '银行卡'" class="sale_pay_item">
          <p>
            <span class="red">*</span>
            <span>收款卡号：</span>
          </p>
          <input type="text" v-model="card" placeholder="请输入收款银行卡号">
        </div>
        <div v-show="checkedValue === '微信' || checkedValue === '支付宝'" class="sale_pay_item sale_pay_upload">
          <p>
            <span class="red">*</span>
            <span>上传二维码：</span>
          </p>
          <div class="upload">
            <input type="file" @change="addImg" multiple=false ref="inputer" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
            <img :src="imgSrc !== '' ? imgSrc : upload" alt="">
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
import request from "@/utils/request";
import upload from "@/assets/upload.png";
export default {
  name: 'salePay',
  data () {
    return {
      name: '',
      bank: '',
      card: '',
      types: [],
      checkedValue: '',
      checked,
      check,
      imgSrc: '',
      upload
    }
  },
  watch:{
    checkedValue () {
      this.imgSrc = ''
    },
  },
  mounted () {
    this.types = [{
      text: '银行卡',
      value: localStorage.getItem('bank')
    }
    // , {
    //   text: '支付宝',
    //   value: localStorage.getItem('zfb')
    // }, {
    //   text: '微信',
    //   value: localStorage.getItem('wx')
    // }
    ]
    if (parseInt(localStorage.getItem('bank')) === 1) {
      this.checkedValue = '银行卡'
    }
  },
  methods: {
    addImg (event) {
      const inputDOM = this.$refs.inputer.files[0]
      let formData = new FormData()
      formData.append('file', inputDOM)
      formData.append('folderId', inputDOM.name)
      formData.append('softType', inputDOM.type)
      const config = { headers: { 'Content-Type': 'multipart/form-data'}}
      request.post('/api/v2/user/uploadPic', formData, config).then((res) => {
        if (res.code === 1) {
          this.imgSrc = res.obj.pic
        } else {
          this.$message({
            type: 'warning',
            message: res.msg,
            center: true
          })
        }
      })
    },
    confirm () {
      if (this.checkedValue === '') {
        this.$message({
          message: '请选择收款方式',
          type: 'warning',
          canter: true
        })
        return false
      }
      if (this.checkedValue === '银行卡') {
        if (this.validate1() === false) return;
        this.$emit('confirmSale', this.name, this.bank, this.card)
      } else if (this.checkedValue === '支付宝' || this.checkedValue === '微信') {
      }
    },
    validate1 () {
      this.name = this.name.trim()
      this.bank = this.bank.trim()
      this.card = this.card.trim()
      const re=/[^\u4e00-\u9fa5]/;
      // this.name = this.name.replace(/[\u4E00-\u9FA5\uF900-\uFA2D]/g, '')
      if (re.test(this.name)) {
        this.$message({
          message: '请输入中文姓名',
          type: 'warning',
          canter: true
        })
        return false
      }
      if ((this.bank).length < 1) {
        this.$message({
          message: '请输入收款银行',
          type: 'warning',
          canter: true
        })
        return false
      }
      this.card = this.card.replace(/[^\d\.]/g, '')
      if (this.card.length < 16  || this.card.length > 19) {
        this.$message({
          message: '银行卡号不正确',
          type: 'warning',
          canter: true
        })
        return false
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
              &.nopointer{
                pointer-events: none;
                opacity: 0.7;
              }
            }

          }
        }
        .sale_pay_upload{
          .upload{
            position: relative;
            margin-top: 15px;
            img{
              width: 100px;
              height: 100px;
              cursor: pointer;
            }
            p{
              color: #999999;
              font-size: 14px;
              line-height: 18px;
              height: 18px;
            }
            input{
              cursor: pointer;
              position: absolute;
              left: 0;
              top: 0;
              width: 100px;
              height: 100px;
              opacity: 0;
              padding: 0;
            }
          }
        }
      }
      .btn{
        cursor: pointer;
        width: 230px;
        height: 50px;
        font-size: 20px;
        border-radius: 8px;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background-color: #2D85F0;
        margin: 2.8vh auto 0;
        display: block;
      }
    }
  }
</style>
