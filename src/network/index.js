import axios from 'axios';
//导入nprogress加载时的进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';


import { Loading } from 'element-ui';

export function request(options){
    return new Promise((resolve,reject)=>{
        const instance=axios.create({
           //baseURL:"http://127.0.0.1:8888/api/private/v1",
            baseURL:'https://www.liulongbin.top:8888/api/private/v1' ,
            timeout:5000,
        });

        //定义加载

        let loadingInstance = Loading.service({
            lock: true,                             // 是否锁屏
            text: '正在加载...',                     // 加载动画的文字
            spinner: 'el-icon-loading',             // 引入的loading图标
            background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
            target: '.sub-main',                    // 需要遮罩的区域
            body: true,
            customClass: 'mask',
        });

        //请求拦截器
        instance.interceptors.request.use(req=>{
            NProgress.start()
            //发送请求之前添加token
            if(window.sessionStorage.getItem('token')){
                req.headers.Authorization=window.sessionStorage.getItem('token');
            }
            return req;
        },err=>{
            // console.log(err);
        });

        //响应拦截器
        instance.interceptors.response.use(data=>{
            // console.log(data);
            NProgress.done();
            //发送前结束加载图标
            loadingInstance.close();
            return data;
        },err=>{

            if(err.response){
                if(err.response.status==='401'){
                    window.sessionStorage.removeItem('token');
                    this.$router.replace({
                        path:"/login",
                        query:{
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
            }
            // console.log(err);

        })
            instance(options)
                .then(res=>{
                resolve = resolve(res);
                }).catch((err)=>{
                reject(err);
            })
    })
}
