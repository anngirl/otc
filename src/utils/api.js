import request from '@/utils/request'
import dess from '@/utils/dess'
import util from '@/utils/util'
import router from '../router/index'
import {Message} from 'element-ui'
import VueCookies from 'vue-cookies'

// VueCookies.set('balance', 100);
// VueCookies.set('outuid', '93E109400B20A29440FD597894991046')
// VueCookies.set('userId', 11536)

const outuid = VueCookies.get("outuid");
const userId = VueCookies.get("userId");
const balance = VueCookies.get("balance");



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
      router.replace({
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
  // console.log(theRequest)
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
  orderList,
  buy,
  sale,
  buyPay,
  completeBuy,
  cancleBuy,
  salePay,
  salePayConfirm
}