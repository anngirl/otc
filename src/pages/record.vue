<template>
  <div class="index"  v-loading="loading"
    element-loading-text="正在为您加载"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <ul class="nav">
      <li v-for="(item, index) in navBar" :key="index" :class="curIndex === index ? 'active' : ''" @click="switchs(index)" >{{item.title}}</li>
    </ul>
    <div v-if="showList">
      <table cellpadding="0"  v-if="list2.length > 0" >
        <tr class="title">
          <th class="title_order" width="200px" align="left">订单号</th>
          <th align="center">状态</th>
          <th align="center">总价</th>
          <th align="center">单价</th>
          <th align="center">交易数量</th>
          <th align="center">时间</th>
          <th width="140px" align="right">操作</th>
        </tr>
        <tr class="item" v-for="(item, index) in list2" :key="index">
          <td class="order" width="200px" align="left">
            <p><span :class="item.type === '买币' ? 'green' : 'red'">{{item.type === '买币' ? '购买' : '出售'}}</span>{{item.orderNo}}</p>
          </td>
          <td align="center">{{item.status}}</td>
          <td align="center">{{item.cnyAmount}}CNY</td>
          <td align="center">{{item.type === '买币' ? cnyToUsdt : usdtToCny}}CNY</td>
          <td align="center">{{item.usdtAmount}}USDT</td>
          <td align="center">{{item.createTime}}</td>
          <td align="right">
            <span v-if="item.status === '等待用户付款' || item.status === '等待商户付款'" class="confirm" @click="toBuy(item.orderNo)">去支付</span>
            <span v-if="item.status === '等待用户付款' || item.status === '等待商户付款'" class="cancle" @click="showCancle = true; orderId = item.orderNo">取消订单</span>
          </td>
        </tr>
      </table>
      <div v-else class="empty">
        <img src='@/assets/noData.png' alt="">
        <p>暂无记录</p>
      </div>
    </div>
    
    <div v-if="showConfirm">
      <ConfirmBuy @cancle="showConfirm = false" :orderAmount="orderAmount" :customerId="customerId" @confirmBuy="confirmBuy" />
    </div>
    <div v-if="showCancle">
      <CancleOrder @cancle="showCancle = false" @confirmCancle="confirmCancle" />
    </div>
  </div>
</template>

<script>
import ConfirmBuy from '@/components/confirmBuy'
import CancleOrder from '@/components/cancleOrder'
import request from '@/utils/request'
import util from '@/utils/util'
import dess from '@/utils/dess'
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
      orderId: '',
      curIndex: 0,
      showConfirm: false,
      showCancle: false,
      list: [],
      list2: [],
      showList: false,
      orderAmount: '',
      customerId: '',
      cnyToUsdt: '',
      usdtToCny: '',
      loading: true
    }
  },
  mounted () {
    this.cnyToUsdt = localStorage.getItem('cnyToUsdt')
    this.usdtToCny = localStorage.getItem('usdtToCny')
    const userId = this.$cookies.get('userId')
    const outuid = this.$cookies.get('outuid')
    request.post(`/third/v1/otc/myOrders/${userId}/${outuid}/0/0`).then((res) => {
      this.showList = true
      this.list = res.obj
      this.loading = false
      this.filter()
    })
  },
  methods: {
    toBuy (orderNo) {
      const info = dess.encryptByDESModeCBC(`orderId=${orderNo}`)
      this.$router.push({
        path: `/buyConfirm/${info}`
      })
    },
    filter () {
      if (this.curIndex === 0) {
        this.list2 = this.list.filter(function(item, index, array){
          return item.status === '等待用户付款' || item.status === '等待商户付款' || item.status === '等待商家确认'
        });
      } else if (this.curIndex === 1) {
        this.list2 = this.list.filter(function(item, index, array){
          return item.status === '交易完成'
        });
      } else if (this.curIndex === 2) {
        this.list2 = this.list.filter(function(item, index, array){
          return item.status === '商家取消' || item.status === '付款超时或用户取消'
        });
      } else if (this.curIndex === 3) {
        this.list2 = this.list
      }
    },
    switchs (index) {
      this.curIndex = index
      this.filter()
    },
    confirmBuy () {
      this.showConfirm = false
      const outuid = this.$cookies.get('outuid')
      const userId = this.$cookies.get('userId')
      const m = dess.encryptByDESModeCBC(`userId=${userId}&outUserId=${outuid}&orderAmount=${this.orderAmount}&customerId=${this.customerId}`)
      let data = {}
      data.m = m
      const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
      request.post('/third/v1/otc/submitOrder', JSON.stringify(data), config).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: 'warning',
            message: res.msg,
            center: true
          })
        } else {
          const {id, name, bankName, cardNo} = res.obj
          this.$message({
            type: 'success',
            message: '支付成功',
            center: true
          })
        }
      })
    },
    confirmCancle () {
      this.showCancle = false
      const userId = this.$cookies.get('userId')
      const outuid = this.$cookies.get('outuid')
      request.post(`/third/v1/otc/cancelTrade/${this.orderId}`).then((res) => {
        if (res.code === 1) {
          request.post(`/third/v1/otc/myOrders/${userId}/${outuid}/0/0`).then((res) => {
            this.list = res.obj
            this.filter()
          })
          this.$message({
            type: 'success',
            message: '取消成功',
            center: true
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.msg,
            center: true
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .index{
    width: 1226px;
    margin: 5.6vh auto;
    min-height: 600px;
    box-shadow:  0 0 6px 0 rgba(0, 0, 0, 0.03);
    .nav{
      border-bottom: solid 1px #d8d8d8;
      height: 54px;
      display: flex;
      padding-left: 20px;
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
      margin-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
      width: 1226px;
      .title{
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
    .empty{
      height: 600px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }
      p{
        text-align: center;
        font-size: 14px;
        color: #999999;
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
        word-break:break-all;
        white-space:pre-wrap;
        p{
          display: inline-block;
          color: #1276ED;
          width: 160px;
          text-align: left;
          white-space:pre-wrap;
          word-break:break-all;
          span.green {
            margin-right: 20px;
            color: #67C99A;
          } 
          span.red{
            margin-right: 20px;
            color: #EC5F45;
          }
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

