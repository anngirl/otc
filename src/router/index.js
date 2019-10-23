import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Record from '@/pages/record'
import Sale from '@/pages/sale'
import SaleConfirm from '@/pages/saleConfirm'
import SaleOrder from "@/pages/saleOrder"
import Buy from "@/pages/buy"
import BuyConfirm from '@/pages/buyConfirm'
import BuyOrder from '@/pages/buyOrder'
import BuyCancle from '@/pages/buyCancle'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/sale',
      name: 'Sale',
      component: Sale
    },
    {
      path: '/saleConfirm',
      name: 'SaleConfirm',
      component: SaleConfirm
    },
    {
      path: '/saleOrder',
      name: 'SaleOrder',
      component: SaleOrder
    },
    {
      path: '/buy/:info',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/buyConfirm/:info',
      name: 'BuyConfirm',
      component: BuyConfirm
    },
    {
      path: '/buyOrder/:info',
      name: 'BuyOrder',
      component: BuyOrder
    },
    {
      path: '/buyCancle/:info',
      name: 'BuyCancle',
      component: BuyCancle
    }
  ]
})
