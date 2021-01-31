import Vue from 'vue'
import VueRouter from 'vue-router'

const PageOne = () => import('../views/PageOne.vue')
const PageTow = () => import('../views/PageTow.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/selectBook',
    name: 'selectBook',
    meta: '查询图书',
    component: PageOne
  },{
    path: '/addBook',
    name: 'addBook',
    meta: '添加图书',
    component: PageTow
  },{
    path: '/editBook/:id',
    name: 'editBook',
    props: true,
    component: PageTow
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
