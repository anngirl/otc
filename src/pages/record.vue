<template>
  <div class="index">
    <ul class="nav">
      <li v-for="(item, index) in navBar" :key="index" :class="curIndex === index ? 'active' : ''" @click="switchs(index)" >{{item.title}}</li>
    </ul>
    <table cellpadding="0">
      <tr class="title">
        <th class="title_order" width="200px">订单号</th>
        <th>状态</th>
        <th>总价</th>
        <th>单价</th>
        <th>交易数量</th>
        <th>交易对象</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr class="item">
        <td class="order" width="200px">
          <span>购买 1181231923129311812319231293123456</span>
        </td>
        <td>已取消</td>
        <td>100000CNY</td>
        <td>7.1CNY</td>
        <td>1080USDT</td>
        <td>王冉冉</td>
        <td>2019-10-28 16:34:28</td>
        <td>
          <span class="confirm" @click="showConfirm = true">确认支付</span>
          <span class="cancle" @click="showCancle = true">取消订单</span>
        </td>
      </tr>
    </table>
    <div v-if="showConfirm">
      <ConfirmBuy @cancle="showConfirm = false" @confirmBuy="confirmBuy" />
    </div>
    <div v-if="showCancle">
      <CancleOrder @cancle="showCancle = false" @confirmCancle="confirmCancle" />
    </div>
  </div>
</template>

<script>
import ConfirmBuy from '@/components/confirmBuy'
import CancleOrder from '@/components/cancleOrder'
export default {
  name: 'Record',
  components: {
    ConfirmBuy,
    CancleOrder
  },
  data () {
    return {
      navBar: [{
        title: '进行中',
      }, {
        title: '已完成',
      }, {
        title: '已取消',
      }, {
        title: '全部',
      }],
      curIndex: 0,
      showConfirm: false,
      showCancle: false
    }
  },
  methods: {
    switchs (index) {
      this.curIndex = index
    },
    confirmBuy () {
      this.showConfirm = false
      this.$message({
        type: 'success',
        message: '支付成功',
        center: true
      })
    },
    confirmCancle () {
      this.showCancle = false
      this.$message({
        type: 'success',
        message: '取消成功',
        center: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .index{
    width: 1226px;
    margin: 5.6vh auto;
    box-shadow:  0 0 6px 0 rgba(0, 0, 0, 0.03);
    .nav{
      border-bottom: solid 1px #d8d8d8;
      height: 54px;
      display: flex;
      li{
        cursor: pointer;
        list-style: none;
        color: #1C242C;
        font-weight: bold;
        font-size: 18px;
        line-height: 51px;
        height: 51px;
        border-bottom: solid 3px transparent;
        margin-right: 160px;
        &.active{
          color: #1276ED;
          border-bottom: solid 3px #1276ed;
        }
      }
    }
    table{
      width: 100%;
      .title{
        text-align: right;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #9A9999;
        line-height: 51px;
        height: 51px;
        .title_order{
          text-align: left;
        }
      }
    }
    .item{
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #3A4149;
      text-align: right;
      line-height: 36px;
      .order{
        max-width: 200px;
        text-align: left;
        display: inline;
        word-break:break-all;
        white-space:pre-wrap;
        span:nth-child(1) {
          display: inline-block;
          color: #1276ED;
          width: 160px;
          white-space:pre-wrap;
          word-break:break-all;
        }
      }
      .confirm{
        color: #1276ED;
        cursor: pointer;
      }
      .cancle{
        color: #1276ED;
        cursor: pointer;
      }
    }
  }
</style>

