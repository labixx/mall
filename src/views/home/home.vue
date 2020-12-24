<template>
        <el-container class="container" >
            <el-header class="header">
               <div class="header-info">
                   <div class="left-logo">
                       <img src="~img/logo.png" alt="">
                       <h2>vue后台管理平台</h2>
                   </div>
                   <el-button type="info" @click="logoutClick">退出登录</el-button>
               </div>
            </el-header>
            <el-container>
                <el-aside class="aside" :style="{width:leftWidth}">
                    <div class="line" @click="collapseList"  >
                        <span>|||</span>
                    </div>
                       <!--   菜单容器：el-menu -->
                       <!--
                       unique-opened:设置是否显示只能一个一个的打开
                       active-text-color：设置选中的选项的颜色
                       collapse：设置是否收起，默认为false
                       collapse-transition:设置收起/展开的动画，默认为true
                         -->
                    <el-menu
                            router
                            unique-opened
                            background-color="#333744"
                            text-color="#fff"
                            active-text-color="#2C6DF2"
                            :collapse=isCollapse
                            :collapse-transition="false"
                    >
                        <!--el-submenu：可以扩展，包括那个小箭头-->
                        <el-submenu :index="item.id+''" v-for="(item,index) in homeAsideList1">
                            <template slot="title">
                                <i :class=icons[item.id]></i>
                                <span>{{item.authName}}</span>
                            </template>
                                <!--el-menu-item：就只是一个选项-->
                            <el-menu-item v-for="items in item.children" :index="'/home/'+items.path" >
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{items.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>
<script>
import {getHomeAsideList} from "network/home";
export default {
        name: "home",
    data(){
            return {
                homeAsideList1:[],
                isCollapse:false,
                icons:
                    {'125':"el-icon-user-solid",
                    '103':"el-icon-s-cooperation",
                    "101":"el-icon-s-goods",
                    "102":'el-icon-s-order',
                    "145":"el-icon-s-platform"},
            }
    },
    created(){
        getHomeAsideList().then(res=>{
            this.homeAsideList1=res.data.data;
            console.log(this.homeAsideList1);
        })
    },
    computed:{
            leftWidth(){
                return this.isCollapse?"64px":"200px";
            }
    },
        methods:{
            //实现退出功能
            //点击退出则把token要清除掉，并且返回到login
            logoutClick(){
                window.sessionStorage.clear();
                this.$router.push("/login");
            },
            collapseList(){
                this.isCollapse=!this.isCollapse;
            }
        }

    }
</script>

<style scoped lang="less">
    .container{
        width:100%;
        height:100%;
    }
 .header{
     background-color: #373D41;
     .header-info{
         display:flex;
         height:100%;
         justify-content: space-between;
         align-items: center;
         .left-logo{
             display:flex;
             hieght:100%;
             color:white;
             img{
                 margin-top:10px;
                 width:50px;
                 height:50px;
             }

         }
     }
 }
    .aside{
        background-color: #333744;
        .line{
            text-align:center;
            color:white;
            letter-spacing: 3px;
            background-color: #4A5064;
            cursor: pointer;
        }
    }
    .main{
        background-color: #EAEDF1;
    }
   .el-menu /deep/{
        border-right:none;
    }

</style>