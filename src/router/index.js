import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve=>(require(["@/views/Home"],resolve))
      // component: () => import("@/views/Home.vue")
    }
  ]
})
