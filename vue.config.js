module.exports={
  //对路径配置别名
  configureWebpack:{
    resolve:{
      //路径配置别名
      alias:{
        'css':"@/assets/css",
        'img':"@/assets/img",
        'commons':'@/commons',
        'common':"@/components/common",
        'content':"@/components/content",
        'network':"@/network",
        'router':"@/router",
        'store':"@/store",
        'views':"@/views"
      }
    }
  },

  // //指定运行和开发的入口文件
  // chainWebpack: config => {
  //   // 发布模式
  //   config.when(process.env.NODE_ENV === 'production', config => {
  //     config.entry('app').clear().add('./src/main-prod.js')

  //减少npm引入的依赖文件过大，使用cdn进行减小项目大小

  //只要在这里配置了的，就会先使用cdn资源，所以需要在index.html中进入src进入这些依赖的cdn文件
  // config.set('externals', {
  //   vue: 'Vue',
  //   'vue-router': 'VueRouter',
  //   axios: 'axios',
  //   lodash: '_',
  //   echarts: 'echarts',
  //   nprogress: 'NProgress',
  //   'vue-quill-editor': 'VueQuillEditor'
  // })
  //



  //   })
  //   // 开发模式
  //   config.when(process.env.NODE_ENV === 'development', config => {
  //     config.entry('app').clear().add('./src/main-dev.js')})
  // }
}