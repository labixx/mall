<template>
    <div id="login-wrapper">
  <div class="login-item">
      <login-logo class="logo"/>
<!--  避免入坑，一定要注意：表单需要进行双向绑定才能输入数据，表单以v-model绑定，表单项以:model绑定    -->
    <el-form label-width="10px" class="login-form" ref="login"  :model="loginForm" :rules="loginRule">
      <el-form-item prop="user">
<!-- suffix-icon:表单后缀图标； prefix-icon:表单前缀图标-->
        <el-input prefix-icon="fas fa-user" v-model="loginForm.user" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="fas fa-lock" type="password" v-model="loginForm.password" ></el-input>
      </el-form-item>
        <div class="btn">
<!--            实现校验功能-->
            <el-button type="primary" @click="loginClick">登录</el-button>
<!--            实现重置功能-->
            <el-button type="info" v-on:click="resetForm()">重置</el-button>
<!--            <router-link tag="a" target="_blank" to="/registerUser" @click="registerUser"  >注册密码</router-link>-->
<!--              <el-button @click="registerUser" >注册账号</el-button>-->
<!--              <el-button @click="forgetPassword">忘记密码</el-button>-->
        </div>
    </el-form>

  </div>
    </div>
</template>

<script>
    import loginLogo from "./loginLogo";
    import {getLoginToken} from 'network/login.js';
  export default {
    name: "login",
      components:{
          loginLogo,
      },
      data(){
        return {
            loginForm:{
                user:'admin',
                password:'123456',
            },
            loginRule:{
                user:
                [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
                ],
            }
        }
      },
      methods:{
          loginClick(){
              this.$refs.login.validate((valid)=>{
                  //校验是否符合规则
                  if(valid){
                      console.log("符合规则");
                     //符合规则则发送网络请求，校验是否账号、密码正确
                      getLoginToken(this.loginForm.user,this.loginForm.password).then(res=>{
                          //如果信息发输入正确，则进入系统
                          if(res.data.meta.status==200){
                              this.$message.success("登录成功");
                              const token=res.data.data.token;
                              //保存token,有了token才能进入别的界面

                             // window.sessionStorage.setItem('token',token);   这个是直接设置token

                              //这个是把token保存到vuex里面
                              this.$store.commit("setToken",token);
                             this.$router.push("/home");
                             //如果账号、密码不正确（也就是数据库里面没有此条数据），则登录失败
                          }else{
                              this.$message.info("登录失败");
                          }
                      })
                  }
              });
          },
        //对表单实现重置功能
          resetForm(){
                  //一定要给表单项增加prop属性
                  this.$refs.login.resetFields();
        },
          registerUser(){
              //跳转到注册账号界面
               console.log("注册界面");
               this.$router.push("/registerUser");

               //设置跳转的路由新开窗口显示
                // let reg=this.$router.resolve({
              //   path:"/registerUser",
              // });
              // window.open(reg.href, '_blank');
          },
          forgetPassword(){
              //跳转到忘记密码界面
              this.$router.push("/forgetPassword");
              console.log("登录界面");
          },

      }
  }
</script>

<style scoped>
    #login-wrapper{
        background-color:#2b4b6b;
        height:100%;
    }
.login-item{
  width:450px;
  height:300px;
   background-color: #eeeeee;
  /*设置水平、垂直居中*/
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
    box-shadow: 0px 3px 5px #ffffff;


}
    .login-form{
        padding:0 20px;
        margin-top:100px;
    }
    .btn{
        text-align: right;
    }
    .logo{
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
    }
</style>