import request from '@/utils/request'
import dess from '@/utils/dess'
import util from '@/utils/util'
import router from '../router/index'
import {Message} from 'element-ui'
import VueCookies from 'vue-cookies'

VueCookies.set('balance', 9000)
VueCookies.set('outuid', '93E109400B20A29440FD597894991046')
VueCookies.set('userId', 11604)
// console.log(VueCookies.get('times'))

var balance = 9000
var outuid = '93E109400B20A29440FD597894991046'
var userId = 11604
function getExchangeRate() {
  request.post('/third/v1/otc/getExchangeRate/11604').then((res) => {
    localStorage.setItem('cnyToUsdt', res.cnyToUsdt)
    localStorage.setItem('usdtToCny', res.usdtToCny)
  })
}
function orderList () {
  const info = dess.encryptByDESModeCBC(`userId=${userId}&outuid=${outuid}&balance=${balance}`)
  router.push({
    path: `/record/${info}`
  })

}
// 跳转至支付页面
function buy(money, number, price) {
  const info = dess.encryptByDESModeCBC(`orderAmount=${money}&userId=${userId}&outuid=${outuid}&balance=${balance}&nums=${number}&cnyToUsdt=${price}`)
  router.push({
    path: `/buy/${info}`
  })
}
// 确认购买
function buyPay(customerId, info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  const {userId, orderAmount} = theRequest
  const m = dess.encryptByDESModeCBC(`userId=${userId}&outUserId=${outuid}&orderAmount=${orderAmount}&customerId=${customerId}`)
  let data = {}
  data.m = m
  const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
  request.post('/third/v1/otc/submitOrder', JSON.stringify(data), config).then((res) => {
    const {id, name, bankName, cardNo} = res
    const info = dess.encryptByDESModeCBC(`customerId=${customerId}&orderAmount=${orderAmount}&userId=${userId}&nums=${theRequest.nums}&orderId=${id}&payee=${name}&payee_bank=${bankName}&pay_account=${cardNo}&outuid=${outuid}`)
    router.push({
      path: `/buyConfirm/${info}`
    })
  })
}
// 取消购买
function cancleBuy(info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  request.post(`/third/v1/otc/cancelTrade/${theRequest.orderId}`).then((res) => {
    router.push({
      path: `/buyCancle/${info}`
    })
  })
}
// 跳转至购买页面
function sale(money, number, price) {
  const info = dess.encryptByDESModeCBC(`orderAmount=${money}&userId=${userId}&outuid=${outuid}&balance=${balance}&nums=${number}&usdtToCny=${price}`)
  router.push({
    path: `/sale/${info}`
  })
}

// 确认出售
function salePay (name, bank, card, info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  const m = dess.encryptByDESModeCBC(`userId=${theRequest.userId}&outUserId=${outuid}&orderAmount=${theRequest.nums}&name=${name}&cardno=${card}&bankname=${bank}`);

  let data = {}
  data.m = m
  const numss = parseFloat(balance) - parseFloat(theRequest.nums)
  if (numss < 0) {
    Message.warning({
      message: '余额不足',
      center: true
    })
    return
  }
  const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
  request.post('/third/v1/otc/withdraw', JSON.stringify(data), config).then((res) => {
    console.log(res)
    const balance2 = parseFloat(balance) - parseFloat(theRequest.nums)
    this.$cookies.set('balance', balance2)
    encryptByDESModeCBC("orderNo="+res.msg+"&order_money="+theRequest.orderAmount+"&orderAmount="+theRequest.nums+"&name="+collection_name+"&cardno="+cardno+"&bankname="+collection_bank+"&userId="+theRequest.userId+"&outuid="+outuids+"&balance="+balancess)

    // window.location.href=encodeURI("myOrder_sale.html?"+encryptByDESModeCBC("orderNo="+res.msg+"&order_money="+theRequest.orderAmount+"&orderAmount="+theRequest.nums+"&name="+collection_name+"&cardno="+cardno+"&bankname="+collection_bank+"&userId="+theRequest.userId+"&outuid="+outuids+"&balance="+balancess));
  })
  // $.ajax({
  //   type: "post",
  //   url: urls+"/third/v1/otc/withdraw",
  //   dataType: 'json',
  //   headers:{
  //     "Content-Type":"application/json"
  //   },
  //   data:JSON.stringify(data),
  //   success: function (res) {
  //     if (res.code==1) {
  //       var users=balances-nums;
  //   setCookie("balance", users);
  //   var balancess=getCookie("balance");
  //       window.location.href=encodeURI("myOrder_sale.html?"+encryptByDESModeCBC("orderNo="+res.msg+"&order_money="+theRequest.orderAmount+"&orderAmount="+theRequest.nums+"&name="+collection_name+"&cardno="+cardno+"&bankname="+collection_bank+"&userId="+theRequest.userId+"&outuid="+outuids+"&balance="+balancess));
  //     }else if(res.code==0){
  //       alert(res.msg);
  //     }
  //   },
  //   error:function(res){
  //      alert(res.msg);
  //   }
  // })
}
export default {
  orderList,
  getExchangeRate,
  buy,
  sale,
  buyPay,
  cancleBuy,
  salePay
}