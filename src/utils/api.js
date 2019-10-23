import request from '@/utils/request'
import dess from '@/utils/dess'
import util from '@/utils/util'
import router from '../router/index'
// var balance=getCookie("balance");
// var outuid=getCookie("outuid");
// var userId=getCookie("userId");

var balance = 9000
var outuid = '93E109400B20A29440FD597894991046'
var userId = 11604
function getExchangeRate() {
  request.post('/third/v1/otc/getExchangeRate/11604').then((res) => {
    localStorage.setItem('cnyToUsdt', res.cnyToUsdt)
    localStorage.setItem('usdtToCny', res.usdtToCny)
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
  const saleInfo = dess.encryptByDESModeCBC(`orderAmount=${money}&userId=${userId}&outuid=${outuid}&balance=${balance}&nums=${number}&usdtToCny=${price}`)
  router.push({
    path: `/sale/${info}`
  })
}

export default {
  getExchangeRate,
  buy,
  sale,
  buyPay,
  cancleBuy
}