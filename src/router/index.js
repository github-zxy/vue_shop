import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue"
import Users from "../components/users/Users.vue"
import Rights from "../components/power/Rights.vue"
import Roles from "../components/power/Roles.vue"
import Cate from "../components/goods/Cate.vue"
import Params from "../components/goods/Params.vue"
import GoodsList from "../components/goods/List.vue"
import Add from "../components/goods/Add.vue"
import Order from "../components/order/Order.vue"
import Report from "../components/report/Report.vue"

Vue.use(VueRouter)

const routes = [
  //登录页面
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    //首页
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      //权限管理页面
      { path: '/rights', component: Rights },
      //角色列表页面
      { path: '/roles', component: Roles },
      //商品分类
      { path: '/categories', component: Cate },
      //分类参数
      { path: '/params', component: Params },
      //商品列表
      { path: '/goods', component: GoodsList },
      //添加商品
      { path: '/goods/add', component: Add },
      //订单列表
      { path: '/orders', component: Order },
      //数据统计
      { path: '/reports', component: Report }
    ]
  }
]




const router = new VueRouter({ routes: routes })

//路由导航守卫
router.beforeEach((to, from, next) => {
  //用户访问登录页面,放行
  if (to.path == '/login') return next()
  //获取sessionStorage中token的值
  const tokenStr = window.sessionStorage.getItem('token')
  //判断是否有token 
  if (!tokenStr) return next('/login')
  next()
})

export default router
