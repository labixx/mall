<template>
    <el-dialog
            title="添加角色"
            :visible.sync="$store.state.addRoleDialogVisibe"
            width="40%"
            @close="closeDialog">
        <el-form :model="addForm"
                 :rules="addRules"
                 ref="addRef"
                 class="labelText"
                 label-width="70px">
<!--注意：prop="roleName"，这个prop对应的要和v-model="addForm.这个值相同，一定要相同-->
            <el-form-item label="角色名称" prop="roleName" >
                <el-input v-model="addForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelbtn">取 消</el-button>
                  <el-button type="primary" @click="confirmBtn">确 定</el-button>
            </span>
    </el-dialog>
</template>
<script>
    import {addRole} from 'network/powerManager.js';
    export default {
        name: "addRole",
        data(){
            return {
                addForm:{
                    roleName:'',
                    roleDesc:'',
                },
                addRules:{
                    roleName:[
                        {required:true,message:"请输入角色名称",trigger:'blur'},
                        {mix:3,max:8,message:"请输入3-8位",trigger:'blur'},
                    ],
                    roleDesc:[
                        {required:true,message:"请输入角色描述",trigger:'blur'},
                        {mix:3,max:15,message:"请输入3-15位",trigger:'blur'},
                    ],
                }
            }
        },
        methods:{
            closeDialog(){
                this.$refs.addRef.resetFields();
            },
            cancelbtn(){

                this.$store.commit("addRoleDialog");
            },
            confirmBtn(){
                this.$refs.addRef.validate((valid)=>{
                    if(valid){
                        console.log(valid);
                        addRole(this.addForm.roleName,this.addForm.roleDesc).then(res=>{
                            console.log(res)
                            if(res.data.meta.status=='201'){
                                this.$message.success("添加角色成功");
                                this.$emit("confirmAddRole");
                                this.$store.commit("addRoleDialog");
                            }else{
                                this.$message.info("添加角色失败");
                            }
                        })
                    }else{
                        this.$message.info("请输入正确的信息");
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .labelText{
        white-space: nowrap;
    }
</style>
