import Vue from "vue"
import Router from "vue-router"

import vCatalog from "../components/v-catalog.vue"
import vCart from "../components/v-cart.vue"


Vue.use(Router);


export default new Router ({
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: vCatalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true
    }
  ]
})