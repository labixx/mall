import Vue from 'vue';
import VueRouter from 'vue-router';
const login =()=>import ('views/login/login');
const registerUser =()=>import ('views/register/registerUser');
const forgetPassword =()=>import ('views/register/forgetPassword');
const home=()=>import('views/home/home');
const users=()=>import("views/home/childrenComponents/UsersList/users");
const rights = ()=>import("views/powerManager/childrenComponents/rights/rights");
const roles = ()=>import("views/powerManager/childrenComponents/roles/roles");
const goods=()=>import("views/goodsManager/goods/goods");
const addGoods =()=>import ("views/goodsManager/goods/addGoods");
const editGoods =()=>import ("views/goodsManager/goods/editGoods");
const params=()=>import ("views/goodsManager/params/params");
const categories=()=>import ("views/goodsManager/catagory/categories");
const orders=()=>import ("views/orderManager/orders");
const reports=()=>import ("views/reports/reports");
Vue.use(VueRouter);
const routes=[{
  path:"",
  redirect:'/login',
},{
  path:"/login",
  component:login,
},{
  path:"/registerUser",
  component:registerUser,
},{
  path:"/forgetPassword",
  component:forgetPassword,
},{
  path:"/home",
  component:home,
  children:[{
    path:"",
    redirect:"users"
  },{
    path:"users",
    component:users,
  },{
    path:"roles",
    component:roles,
  },{
    path:"rights",
    component:rights,
  },{
    path:"goods",
    component:goods,
  },{
    path:"goods/addGoods",
    component:addGoods,
  },{
    path:"goods/editGoods",
    component:editGoods,
  },{
    path:"params",
    component:params,
  },{
    path:"categories",
    component:categories,
  },{
    path:'orders',
    component:orders,
  },{
    path:'reports',
    component:reports,
  }]
}];
const router =new VueRouter({
  routes,
  mode:"history"
})

//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
//to：即将进入的界面
//from:即将离开的界面
//next():这个是放行函数，必须要写这个，也可以强制设置进入界面，语法：next(强制进入的界面)
router.beforeEach((to,from,next)=>{
  //获取即将跳转的路径是否为登录界面
if(to.path==='/login'){
  next();
}else{
  //获取到token
  const token=window.sessionStorage.getItem("token");
  //如果token为空，则强制进入登录界面
  if(token==='null' ||token === ''){
      next("/login");
  }else{
    //有token则放行
    next();
  }
}
})
export default router;