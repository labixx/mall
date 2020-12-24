1、登录思路
+ 在登录页面输入账号、密码
+ 调用后台接口进行验证
+ 验证成功之后，显示对应得界面

注意：
+ 如果服务端和客户端之间不需要进行 跨域，则通过：cookie记录客户端得状态；session记录服务端状态
+ 如果服务端和客户端需要进行跨域：则通过token方式维持状态
+ 跨域：当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域
+ 例如：当前界面得url:http://www.baidu.com  ；请求得url:http://www.test.com   这是一种跨域，域名不一样

登录原理
+ 客户端登录账号、密码发送给服务端，
+ 服务端验证成功后返回对应的token值；
+ 客户端存储该token值，之后得请求都需要携带该值；
+ 最后服务端验证token值是否通过返回对应得界面

路由嵌套
+ 注意：子路由也需要添加一个<router-view>告诉子路由显示得位置

+通过props传递给子组件的值，不能在子组件内部修改props中的值。

+ vue-quill-editor vue的富文本插件
  + 使用方法：再main.js文件中全局导入js文件一级css文件
  + 再需要使用的地方使用<quill-editor>进行使用
  
+ 兄弟组件之间进行通信
  + 先在main.js文件中： Vue.prototype.$bus=new Vue();
  + 然后再需要发送事件的组件中：this.$bus.$emit("方法名1",可传参);
  + 接收事件的组件：this.$bus.$on("方法名1",回调函数接收参数);
 +注意：通过这个兄弟组件之间通信，前提是兄弟组件
 
+ echarts图标的基本使用
 + npm 安装： npm install --save echarts
 + 这个echarts进行局部导入就可以，不是所有的文件都需要使用
 + 注意：图表的数据加载需要再dom元素都挂载好了才可以，所以需要再mounted生命周期里面使用
 + 初始化图表 ： var myChart = echarts.init(document.getElementById('main'));
 + 图表显示的数据： var option=图表数据
 + 把数据挂载到图表上：  myChart.setOption(option);
 + 具体使用，可查看echarts官方文档
 
 +nprogress:加载时的出现的进度条
 + npm install --save nprogress
 + 全局导入 js文件以及css文件或者在封装好的network/index中
 + 在发送请求拦截器中实现：Nprogress.start()
 +在响应拦截器中实现：Nprogress.done()
 
 + 
 
 + 生成打包的报告文件命令：npm run build --report
 
 +为生产环境和打包环境指定入口文件：看改项目的vue.config.js文件
 
 +把打包文件放在express上
  + 在该项目外面单独创建一个文件夹，然后npm init -y
  + 安装express npm install --save express
  + 把这个项目的打包文件（dist）文件放到这个新建的文件根目录下
  + 创建app.js文件编辑express的配置：
  const express=require('express');
  const app=express()
  express.use(express.static(打包文件（dist）))
  app.listen(8080,()=>{
  console.log('项目运行');
  })
  + 最后终端执行：node ./app.js就可以了
  
+ 注意：在进行路由跳转时传参数，正确得做法是路由带参，而不是构建兄弟组件，通过$bus和$on进行参数，这样会有问题得

+ 后台传过来的数据直接通过v-html进行编辑即可进行显示
 
 
 
  