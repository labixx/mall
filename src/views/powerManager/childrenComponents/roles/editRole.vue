<template>
    <el-dialog
            title="编辑用户"
            :visible.sync="$store.state.editRoleDialogVisible"
            width="40%"
            @close="closeEditDialog">
        <el-form label-width="80px" :model="beEditInfo" ref="editRef" :rules="editRule">
            <el-form-item label="id">
                <el-input v-model="beEditInfo.editId" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="editName">
                <el-input v-model="beEditInfo.editName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="editDesc">
                <el-input v-model="beEditInfo.editDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelEditInfo">取 消</el-button>
                  <el-button type="primary" @click="confirmEditInfo">确 定</el-button>
            </span>
    </el-dialog>
</template>
<script>
import {editRoleCommit} from 'network/powerManager';
    export default {
        name: "editRole",
        data() {
            return {
                editRule:{
                    editName:[
                        {required:true,message:"请输入角色名称",trigger:'blur'},
                        {mix:3,max:8,message:"请输入3-8位",trigger:'blur'},
                    ],
                    editDesc:[
                        {required:true,message:"请输入角色描述",trigger:'blur'},
                        {mix:3,max:15,message:"请输入3-15位",trigger:'blur'},
                    ]
                },
            }
        },
        props:{
            //被修改的数据
            beEditInfo:{
                type:Object,
                required:true,
            }
        },
        methods:{
            confirmEditInfo(){
                this.$refs.editRef.validate((valid)=>{
                    if(valid){
                        editRoleCommit( this.beEditInfo.editId, this.beEditInfo.editName, this.beEditInfo.editDesc).then(res=>{
                            if(res.data.meta.status==200){
                                this.$message.success("角色信息修改成功");
                                this.$emit("confirmEditRole");
                                this.$store.commit("editRoleDialog");
                            }else{
                                this.$message.info("角色修改信息失败");
                            }
                        })
                    }else{
                        this.$message.info("请输入正确的角色信息");
                    }
                })
            },
            cancelEditInfo(){
                this.$message.info("取消修改角色信息");
                this.$store.commit("editRoleDialog");
            },
            closeEditDialog(){
                this.$refs.editRef.resetFields();
            }

        }
    }
</script>

<style scoped>

</style>