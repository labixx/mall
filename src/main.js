import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementui);
//导入vue-quill-editor富文本插件
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

//导入vue-table-with-tree-grid插件
import ZkTable from 'vue-table-with-tree-grid';

//Vue.use(ZkTable)
Vue.component('ZkTable',ZkTable)


Vue.config.productionTip = false
//定义兄弟组件通信：$bus
Vue.prototype.$bus=new Vue();

//
//这个是没有封装的加载图标，可以对需要设置的网络请求单独进行设置
// Vue.prototype.openLoading = function() {
//   const loading = this.$loading({           // 声明一个loading对象
//     lock: true,                             // 是否锁屏
//     text: '正在加载...',                     // 加载动画的文字
//     spinner: 'el-icon-loading',             // 引入的loading图标
//     background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
//     target: '.sub-main',                    // 需要遮罩的区域
//     body: true,
//     customClass: 'mask'                     // 遮罩层新增类名
//   })
//   setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
//     loading.close();                        // 关闭遮罩层
//   },5000)
//   return loading;
// }

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
