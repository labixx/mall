<template>
    <el-dialog
            title="编辑订单"
            :visible.sync="$store.state.editOrderDialogVisible"
            width="40%"
            @close="closeDialog"
    >
        <el-form :model="editOrderForm" ref="editOrderRef" :rules="editOrderRules" >
            <el-form-item label="省市区/县" prop="province">
             <el-cascader :options="citydate" :props="citydateProps" v-model="editOrderForm.province"></el-cascader>
            </el-form-item>
            <el-form-item  label='详细地址' prop="address" >
                <el-input v-model="editOrderForm.address"></el-input>
            </el-form-item>
            <el-button type="primary" @click="ensureBtn">确定</el-button>
            <el-button type="primary" @click="cancelBtn">取消</el-button>
        </el-form>

    </el-dialog>
</template>

<script>
import citydate from './citydata';
    export default {
        name: "edeitOrder",
        data(){
            return {
                editOrderForm:{
                    province:'',
                    address:''
                },
                citydate:citydate,
                citydateProps:{
                    label:'label',
                    value:'value',
                    children:'children',
                },
                editOrderRules:{
                    address:[
                        {mix:3,max:10,message:'请输入3-10位字符',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            ensureBtn(){
                this.$store.commit('editOrderDialog');
            },
            cancelBtn(){
                this.$store.commit('editOrderDialog');
            },
            closeDialog(){
                this.$refs.editOrderRef.resetFields();
            }
        }


    }
</script>

<style scoped>
    >>>.el-cascader{
        flot:right;
    }
    >>>.el-form-item{

    }
</style>