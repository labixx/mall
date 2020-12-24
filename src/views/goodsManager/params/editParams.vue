<template>
    <el-dialog
            title="编辑参数"
            :modal-append-to-body='false'
            :visible.sync='$store.state.editParDialogVisible'
            width="50%">
        <el-form :model="beEditInfo" :rules="beEditRules" ref="editParaRef">
            <el-form-item label="分类Id" prop="cat_id">
                <el-input v-model="beEditInfo.cat_id"></el-input>
            </el-form-item>
            <el-form-item label="属性Id" prop="attr_id">
                <el-input v-model="beEditInfo.attr_id"></el-input>
            </el-form-item>
            <el-form-item label="参数名称" prop="attr_name">
                <el-input v-model="beEditInfo.attr_name"></el-input>
            </el-form-item>
            <el-form-item label="参数值" prop="attr_vals">
                <el-input v-model="beEditInfo.attr_vals"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelBtn">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {deepClone} from 'commons/untils'
    import {commitParInfoList} from 'network/goods.js';
    export default {
        name: "editParams",
        props:{
            beEditInfo:{
                type:Object,
                required:true,
            }
        },
        data(){
            return {
                info:{},
                beEditRules:{
                    attr_name:[
                        {required:true,message:"请输入参数名称",trigger:'blur'}
                    ]
                },
            }
        },
        methods:{
            cancelBtn(){
                this.$refs.editParaRef.resetFields();
                this.$store.commit('editParDialog');
            },
            confirm(){
                this.$refs.editParaRef.validate(valid=> {
                    const info=this.beEditInfo;

                    console.log(info);
                    if (valid) {
                        commitParInfoList(info.cat_id, info.attr_id, info.attr_name, info.attr_sel,info.attr_vals).then(res => {
                            console.log(res);
                            if(res.data.meta.status=='200'){
                                this.$emit('editSuceess');
                                this.$message.success(res.data.meta.msg);
                            }else{
                                this.$message.success(res.data.meta.msg);
                            }
                        });
                    }else{
                        console.log(valid);
                        this.$message.info("取消修改参数");
                    }
                })
                this.$store.commit('editParDialog');
            },

        }
    }
</script>

<style scoped>

</style>