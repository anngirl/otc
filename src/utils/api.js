import request from '@/utils/request'
import dess from '@/utils/dess'
import util from '@/utils/util'
import router from '../router/index'
import {Message} from 'element-ui'
import VueCookies from 'vue-cookies'

VueCookies.set('balance', 9000)
VueCookies.set('outuid', '93E109400B20A29440FD597894991046')
VueCookies.set('userId', 11604) //11604

let balance = VueCookies.get('balance')
let outuid = VueCookies.get('outuid')
let userId = VueCookies.get('userId')

function verify () {
  // const url = '357a637232e23db340b8c5372275923cfec6c79f61ce8bd10646a13793351c85c6f256d118a2f252';
  // const theRequest = util.decodeURI(dess.decryptByDESModeEBC(url))
  console.log('咱也不知道干啥')
  // VueCookies.set('balance', theRequest.balance)
  // VueCookies.set('outuid', theRequest.outuid)
  // VueCookies.set('userId', theRequest.userId)
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
    if (res.code === 0) {
      Message.warning({
        message: res.msg,
        center: true
      })
    } else {
      const {id, name, bankName, cardNo} = res.obj
      const info = dess.encryptByDESModeCBC(`customerId=${customerId}&orderAmount=${orderAmount}&userId=${userId}&nums=${theRequest.nums}&orderId=${id}&payee=${name}&payee_bank=${bankName}&pay_account=${cardNo}&outuid=${outuid}`)
      router.push({
        path: `/buyConfirm/${info}`
      })
    }
  })
}

// 完成转账
function completeBuy (info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  request.post(`/third/v1/otc/payment/${theRequest.orderId}`).then((res) => {
    if (res.code === 1) {
      router.push({
        path: `/buyOrder/${info}`
      })
    } else {
      Message.warning({
        message: res.msg,
        center: true
      })
    }
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

// 跳转至确认出售页面
function salePay (name, bank, card, info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  // const m = dess.encryptByDESModeCBC(`userId=${theRequest.userId}&outUserId=${outuid}&orderAmount=${theRequest.nums}&name=${name}&cardno=${card}&bankname=${bank}`);
  // let data = {}
  // data.m = m
  const numss = parseFloat(balance) - parseFloat(theRequest.nums)
  if (numss < 0) {
    Message.warning({
      message: '余额不足',
      center: true
    })
    return
  } else {
    const info2 = dess.encryptByDESModeCBC(`name=${name}&bank=${bank}&card=${card}&orderAmount=${theRequest.orderAmount}&nums=${theRequest.nums}`)
    router.push({
      path: `/saleConfirm/${info2}`
    })
  }
}
// 确认出售
function salePayConfirm (info) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  // return
  const m = dess.encryptByDESModeCBC(`userId=${userId}&outUserId=${outuid}&orderAmount=${theRequest.nums}&name=${theRequest.name}&cardno=${theRequest.card}&bankname=${theRequest.bank}`);
  let data = {}
  data.m = m
  const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
  request.post('/third/v1/otc/withdraw', JSON.stringify(data), config).then((res) => {
    if (res.code === 0){
      Message.warning({
        message: res.msg,
        center: true
      })
    } else if (res.code === 1) {
      const balance2 = parseFloat(balance) - parseFloat(theRequest.nums)
      VueCookies.set('balance', balance2)
      const info2 = dess.encryptByDESModeCBC(`orderNo=${res.msg}&orderAmount=${theRequest.orderAmount}&nums=${theRequest.nums}&name=${theRequest.name}&cardno=${theRequest.card}&bankname=${theRequest.bank}&userId=${userId}&outuid=${outuid}&balance=${balance2}`)
      router.push({
        path: `/saleOrder/${info2}`
      })
    }
  })
}


export default {
  verify,
  orderList,
  buy,
  sale,
  buyPay,
  completeBuy,
  cancleBuy,
  salePay,
  salePayConfirm
}