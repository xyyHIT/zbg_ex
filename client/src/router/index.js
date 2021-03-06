import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Order from '@/components/Order'
import Bitforex from '@/components/Bitforex'
import Digifinex from '@/components/Digifinex'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/zbg',
    name: 'Order',
    component: Order
  }, {
    path: '/bitforex',
    name: 'Bitforex',
    component: Bitforex
  }, {
    path: '/digifinex',
    name: 'Digifinex',
    component: Digifinex
  }]
})
