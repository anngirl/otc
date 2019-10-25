import request from '@/utils/request'
import dess from '@/utils/dess'
import util from '@/utils/util'
import router from '../router/index'
import {Message} from 'element-ui'
import VueCookies from 'vue-cookies'

VueCookies.set('balance', 9000)
VueCookies.set('outuid', '93E109400B20A29440FD597894991046')
VueCookies.set('userId', 11997) //11604

let balance = VueCookies.get('balance')
let outuid = VueCookies.get('outuid')
let userId = VueCookies.get('userId')

function verify () {
  // const url = '357a637232e23db330b002795b48708a15b97d9d81badbe41f03eef17c32a04fd712a884c1d05c428e0c935d2c5b7da475a84d61011e0868db82dd2232191d81b27bf9768a821ac2fead13ec94f3d8b40745b823e051c7918e37006447878d9a01fa16de461b1b3a';
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
// 确认购买提交订单
function buyPay(customerId, info, payWay) {
  const theRequest = util.decodeURI(dess.decryptByDESModeEBC(info))
  const {userId, orderAmount} = theRequest
  const m = dess.encryptByDESModeCBC(`userId=${userId}&outUserId=${outuid}&orderAmount=${orderAmount}&customerId=${customerId}&payWay=${payWay}`)
  let data = {}
  data.m = m
  
  const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' }}
  request.post('/third/v1/otc/merchantBuy', JSON.stringify(data), config).then((res) => {
    if (res.code === 0) {
      Message.warning({
        message: res.msg,
        center: true
      })
    } else {
      let info = ''
      if (parseInt(payWay) === 3) {
        const {id, name, bankName, cardNo} = res.obj
        info = dess.encryptByDESModeCBC(`customerId=${customerId}&orderAmount=${orderAmount}&userId=${userId}&nums=${theRequest.nums}&orderId=${id}&payee=${name}&payee_bank=${bankName}&pay_account=${cardNo}&outuid=${outuid}&payWay=3`)
        router.push({
          path: `/buyConfirm/${info}`
        })
      } else {
        const {id, name, imgUrl, userNo} = res.obj
        info = dess.encryptByDESModeCBC(`customerId=${customerId}&orderAmount=${orderAmount}&userId=${userId}&nums=${theRequest.nums}&orderId=${id}&payee=${name}&imgUrl=${imgUrl}&userNo=${userNo}&outuid=${outuid}&payWay=${payWay}`)
        router.push({
          path: `/buyConfirm/${info}`
        })
      }
    }
  })
}

// 用户确认转账
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
    if (res.code === 1) {
      router.push({
        path: `/buyCancle/${info}`
      })
    } else {
      Message.warning({
        message: res.msg,
        center: true
      })
    }
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