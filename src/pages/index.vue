<template>
  <div>
    <section class="main">
      <img src="@/assets/img.png" class="logo2" alt="">
      <p class="text">专业的数字货币场外担保交易平台</p>
      <div class="notice">
        <div class="input">
          <input type="text" placeholder="请输入金额" pattern="number" v-on:input="getMoney" v-model="money" />
          <span>CNY</span>
        </div>
        <img src="@/assets/change.png" class="change" alt="">
        <div class="input">
          <input type="text" placeholder="请输入数量" pattern="number" v-on:input="getNumber" v-model="number" />
          <span>USDT</span>
        </div>
        <div class="btn-wrap">
          <div class="btn">
            <span @click="toSale">{{list[curIndex]}}</span>
            <img src="@/assets/bottom.png" @click="showList()" alt="">
          </div>
          <div class="list" v-if="show">
            <p v-for="(item, index) in list" :class="curIndex === index ? 'active' : ''" :key="index" @click="change(index)">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/chuizi.png" class="chuizi" alt="">
        <p v-if="curIndex === 0">最新买入价：{{cnyToUsdt}}CNY/USDT</p>
        <p v-else>最新卖出价：{{usdtToCny}}CNY/USDT</p>
        <p>可用余额: <span>{{balance}}USDT</span></p>
      </div>
    </section>
  </div>
</template>

<script>
import request from '@/utils/request';
import dess from '@/utils/dess';
import api from '@/utils/api';
export default {
  name: 'Index',
  data () {
    return {
      money: '',
      number: '',
      list: ['立即买入', '立即卖出'],
      show: false,
      curIndex: 0,
      usdtToCny: 0,  // 卖
      cnyToUsdt: 0,  // 买
      balance: 0
    }
  },
  mounted () {
    this.balance = this.$cookies.get('balance')
    request.post('/third/v1/otc/getExchangeRate/11604').then((res) => {
      localStorage.setItem('cnyToUsdt', res.obj.cnyToUsdt)
      localStorage.setItem('usdtToCny', res.obj.usdtToCny)
      this.cnyToUsdt = res.obj.cnyToUsdt
      this.usdtToCny = res.obj.usdtToCny
    })
  },
  methods: {
    getMoney () {
      this.money = this.money.replace(/[^\d\.]/g, '')
      this.money = this.filter(this.money)
      if (this.curIndex === 0) {
        this.number = Math.round(parseFloat(this.money) / parseFloat(this.cnyToUsdt) * 100) / 100 || ''
      } else {
        this.number = Math.round(parseFloat(this.money) / parseFloat(this.usdtToCny) * 100) / 100 || ''
      }
    },
    getNumber () {
      this.number = this.number.replace(/[^\d\.]/g, '')
      this.number = this.filter(this.number)
      if (this.curIndex === 0) {
        this.money = Math.round(parseFloat(this.number) * parseFloat(this.cnyToUsdt) * 100) / 100 || ''
      } else {
        this.money = Math.round(parseFloat(this.number) * parseFloat(this.usdtToCny) * 100) / 100 || ''
      }
      if (this.number >= 1386962.41) {
        this.$message({
          type: 'warning',
          message: '单次最高交易额9999999.99元!',
          center: true
        })
      }
    },
    showList () {
      this.show = !this.show
    },
    change (index) {
      this.curIndex = index
      this.show = false
      this.money = ''
      this.number = ''
    },
    toSale () {
      if (this.number.length < 1) {
        this.$message({
          type: 'warning',
          message: '请输入数量或金额',
          center: true
        })
        return false
      }
      if (parseFloat(this.number) >= 1386962.41) {
        this.$message({
          type: 'warning',
          message: '单次最高交易额9999999.99元!',
          center: true
        })
        return false
      }
      if (parseFloat(this.money) < 200) {
        this.$message({
          message: '最低输入200元',
          type: 'warning',
          center: true
        });
        return false
      }
      this.curIndex === 0 ? api.buy(this.money, this.number, this.cnyToUsdt) : api.sale(this.money, this.number, this.usdtToCny)
    },
    filter (number) {
      if (number.indexOf('.') > -1) {
        // 有小数点
        let valueArray = number.split(".");
        if( valueArray.length > 2 ) {
          // 不能出现两个小数点
          number = number.substring(0, number.length - 1);
        }
        if (valueArray[1].length > 2) {
        //小数位数为2，且是数字
          valueArray[1] = valueArray[1].substring(0, 2)
          if (/[^\d]/.test(valueArray[1])) {
            valueArray[1] = valueArray[1].replace(/[^\d]/g,'');
          }
          number = valueArray.join('.');
        }
      } else if (number.indexOf('.') === 0) {
        // 首位不能是小数点
        number = ''
      } else if (number.substring(0, 1) == '0') {
        if (number.substring(1, 2) !== ".") {
          number = 0
        }
      } else if (number.length > 7) {
        // 整数位数小于7
        number = number.substring(0, 7)
      }
      return number
    }
  }
}
</script>
<style lang="less" scoped>
.main{
  .logo2{
    width: 418px;
    height: 60px;
    display: block;
    margin: 23.3vh auto 2.1vh;
  }
  p.text{
    color: #575757;
    letter-spacing: 10px;
    text-align: center;
    font-size: 32px;
    font-family: 'PingFangSC-Regular';
    margin-bottom: 6.4vh;
  }
  .notice{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Regular;
    .input{
      width: 320px;
      height: 65px;
      line-height: 65px;
      border: solid 1px #2589FF;
      border-radius: 8px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      input{
        border: none;
        margin-left: 1vw;
      }
      span{
        margin-right: 0.9vw;
        color: #2D85F0;
      }
    }
    .change{
      width: 32px;
      height: 27px;
      margin-left: 1vw;
      margin-right: 1vw;
    }
    .btn-wrap{
      border-top-left-radius: 8px;
      // border-radius: 8px;
      position: relative;
      margin-left: 1.4vw;
      // overflow: hidden;
      height: auto;
      div.btn{
        width: 183px;
        height: 65px;
        display: flex;
        justify-content: center;
        background-color: #2D85F0;
        font-size: 24px;
        color: #ffffff;
        align-items: center;
        cursor: pointer;
        span{
          margin-right: 0.4vw;
          display: block;
        }
        img{
          width: 32px;
          height: 32px;
        }
      }
      .list{
        position: absolute;
        background-color: rgba(#2D85F0, 0.4);
        width: 183px;
        p{
          margin: 0 auto;
          width: 155px;
          text-align: center;
          font-size: 24px;
          color: #000000;
          height: 65px;
          line-height: 65px;
          border-bottom: solid 1px #ffffff;
          &.active{
            color: #2D85F0;
          }
          &:nth-child(2) {
            border-bottom: none;
          }
        }
      }
    }
  }

  .footer{
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .chuizi{
      width: 22px;
      height: 22px;
      margin-right: 4px;
    }
    p{
      font-size: 16px;
      margin-right: 1.4vw;
      letter-spacing: 0;
      span{
        color: #BABABA;
      }
    }
  }
}
</style>
