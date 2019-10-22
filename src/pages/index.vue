<template>
  <div>
    <section class="main">
      <img src="@/assets/img.png" class="logo2" alt="">
      <p class="text">专业的数字货币场外担保交易平台</p>
      <div class="notice">
        <div class="input">
          <input type="text" placeholder="请输入金额" v-model="money" />
          <span>CNY</span>
        </div>
        <img src="@/assets/change.png" class="change" alt="">
        <div class="input">
          <input type="text" placeholder="请输入金额" v-model="number" />
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
        <p>最新买出价：7.19CNY/USDT</p>
        <p>可用余额: <span>7.1932USDT</span></p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      money: '',
      number: '',
      list: ['立即卖出', '立即买入'],
      show: false,
      curIndex: 0
    }
  },
  methods: {
    showList () {
      this.show = !this.show
    },
    change (index) {
      this.curIndex = index
      this.show = false
    },
    toSale () {
      if (this.money === '') {
        this.$message({
          message: '请输入金额或数量',
          type: 'warning',
          center: true
        });
        return false
      }
      const path = this.curIndex === 0 ? 'sale' : 'buy'
      this.$router.push({
        query: {
          money: this.money,
          number: this.number
        },
        path: path
      })
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
