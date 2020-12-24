<template>
    <!--点击添加用户，弹出对话框,el-dialog
       title：对话框的标题
       :visible.sync：该对话框是否显示，是boolean类型
       -->
    <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="40%"
            @close="closeAddUserDialog">
        <el-form :model="addUserForm"
                 :rules="addUserRules"
                 ref="addUserRef"
                 label-width="60px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input v-model="addUserForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addUserForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelAddUserbtn">取 消</el-button>
                  <el-button type="primary" @click="confirmAddUserBtn">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import {addUser} from 'network/home';
    export default {
        name: "addUserInfo",
        props:{
            addUserForm:{
                type:Object,
                required:true,
            },
            dialogVisible:{
                type:Boolean,
                default:false,
            }
        },
        data(){
            //对邮箱、手机号码添加自定义校验规则,是要在这里，注意位置
            //邮箱自定义校验规则
            //注意：这里有坑，最后一定要记得执行回调函数
            var checkEmail=(rule,value,callback)=>{
                const regEmail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!regEmail.test(value)) return  callback(new Error('请输入合格的邮箱地址'));
                callback()   //这个一定要写
            }
            //手机号自定义校验规则
            var checkMobile=(rule,value,callback)=> {
                const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!regMobile.test(value)) return  callback(new Error('请输入合规的手机号码'));
                callback()
            }
            return {
                //添加用户验证规则
                addUserRules:{
                    username:[
                        {required:true,message:"必填项，请输入用户名",trigger:'blur'},
                        {min: 3, max: 5,message:"长度在 3 到 5 个字符",trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:"必填项，请输入密码",trigger:'blur'},
                        {min:3,max:5,message:"长度在 3 到 5 个字符",trigger:'blur'}
                    ],
                    email:[
                        {required:true,message:"必填项，请输入邮箱地址",trigger:'blur'},
                        {validator:checkEmail,trigger:'blur'}
                    ],
                    mobile:[
                        {required:true,message:"必填项，请输入手机号码",trigger:'blur'},
                        {validator:checkMobile,trigger:'blur'}
                    ]
                },
            }
        },
        methods:{
            //确认添加用户信息
            confirmAddUserBtn(){
                this.$refs.addUserRef.validate((valid) => {
                    const addUserForm = this.addUserForm;
                    if(valid){
                        addUser(addUserForm.username,addUserForm.password,addUserForm.email,addUserForm.mobile).then(res => {
                            console.log("-------------------");
                            console.log(res);
                            if (res.data.meta.status === 201) {
                                this.$message.success("添加用户成功")
                                this.$emit("loadUserList");
                            } else {
                                this.$message.info("添加用户失败")
                            }
                        })
                    }
                });
                this.$emit("confirmAddUserDislog");
            },
            //关闭弹窗重置表单
            closeAddUserDialog(){
                this.$refs.addUserRef.resetFields();
            },
            //取消添加用户
            cancelAddUserbtn(){
                this.$emit("cancelAddUserDialog");
            }


        }
    }
</script>

<style scoped>

</style>