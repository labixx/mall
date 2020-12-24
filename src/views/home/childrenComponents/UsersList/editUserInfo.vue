<template>
    <el-dialog
            title="编辑用户"
            :visible.sync="$store.state.editDialogVisible"
            width="40%"
            @close="closeEditDialog">
        <el-form label-width="60px" :model="editUserForm" ref="editUserRef" :rules="editUserRules">
            <el-form-item label="用户名">
                <el-input v-model="editUserForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="editUserForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelEditInfo">取 消</el-button>
                  <el-button type="primary" @click="confirmEditInfo">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import {editUser} from "network/home";

    export default {
        name: "editUserInfo",
        data() {
            var checkEmail = (rule, value, callback) => {
                const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!regEmail.test(value)) return callback(new Error('请输入合格的邮箱地址'));
                callback()   //这个一定要写
            };
            //手机号自定义校验规则
            var checkMobile = (rule, value, callback) => {
                const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!regMobile.test(value)) return callback(new Error('请输入合规的手机号码'));
                callback()
            }
            return {
                editUserRules:{
                    email:[
                        {required:true,message:"请输入邮箱",trigger:'blur'},
                        {validator:checkEmail,message:"请输入合规的邮箱",trigger:'blur'}
                    ],
                    mobile:[
                        {required:true,message:"请输入手机号码",trigger:'blur'},
                        {validator:checkMobile,message:"请输入合规的手机号码",trigger:'blur'}
                    ]
                },
                userForm:{},
            }
        },
        props:{
            // //弹窗是否显示
            //用户表单数据
            editUserForm:{
                type:Object,
                required:true,
            },
        },
        methods:{
            confirmEditInfo(){
                this.$refs.editUserRef.validate((valid)=>{
                    this.userForm =this.editUserForm;
                    if(!valid) return
                    console.log(valid);
                    editUser( this.userForm.id, this.userForm.email, this.userForm.mobile).then(res=>{
                        console.log(res);
                        if(res.data.meta.status==200){
                            this.$message.success("用户信息修改成功");
                            this.$emit("loadUserList");
                        }
                    })

                })
                this.$store.commit("DialogVisible");
            },
            cancelEditInfo(){
                this.$store.commit("DialogVisible");
            },
            closeEditDialog(){
                this.$refs.editUserRef.resetFields();
            }

        }
    }
</script>

<style scoped>

</style>