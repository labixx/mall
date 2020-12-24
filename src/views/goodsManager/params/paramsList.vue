<template>
    <div>
    <el-table :data="paramInfo" v-if="isShow" border stripe>
<!--        <el-table-column type="expand">-->
<!--            <template slot-scope="info">-->
<!--                    <el-tag  closable v-for="(item,index) in attrValue(info.row) ">{{item}}</el-tag>-->
<!--                    <h2>{{info.row}}</h2>-->
<!--                        <el-input-->
<!--                        class="input-new-tag"-->
<!--                        v-if="info.row.inputVisible"-->
<!--                        v-model="info.row.inputValue"-->
<!--                        ref="saveTagInput"-->
<!--                        size="small"-->
<!--                        @keyup.enter.native="handleInputConfirm(info.row)"-->
<!--                        @blur="handleInputConfirm(info.row)">-->
<!--                </el-input>-->
<!--                <el-button v-else class="button-new-tag" size="small" @click="showInput(info.row)">+ 添加参数</el-button>-->
<!--            </template>-->
   <!--       </el-table-column>-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
        <el-table-column label="参数值" prop="attr_vals" >
            <template slot-scope="info">
               
                <el-tag  :key="index" v-for="(item,index) in attrValue(info.row)">{{item}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="info">
              <el-button type="primary" @click='editPar(info.row)'>编辑</el-button>
               <el-button type="info" @click='deletePar(info.row)'>删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" :disabled="!isShow" @click="addParams">添加参数</el-button>
        <el-dialog
                title="添加参数"
                :visible.sync='addDialogViible'
                @close="closeDialog"
                width="30%">
            <el-form :model="addParForm" :rules="addParRules" ref="addParaRef">
                <el-form-item label="id" prop="cataId">
                    <el-input v-model="addParForm.cataId"></el-input>
                </el-form-item>
                <el-form-item label="参数名称" prop="cataName">
                    <el-input v-model="addParForm.cataName"></el-input>
                </el-form-item>
                <el-form-item label="参数值" prop="cataValues" >
                    <el-input v-model="addParForm.cataValues" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelBtn">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
        </el-dialog>
        <editParams @editSuceess="editSuccessMiddle" :beEditInfo='editInfo'/>
    </div>
</template>
<script>
    import {deepClone} from 'commons/untils';
    import editParams from './editParams'
   import {addParamsInfoList,deleteParamsInfoList} from 'network/goods.js';
    export default {
        name: "paramsList",
        components:{
            editParams
        },
        props:{
            paramInfo:{
                type:Array,
                required:true,
            },
            isShow:{
                type:Boolean,
                required:false,
            },
            cataId:{
                type:Array,
                required:true,
            },
            sel:'',
        },
        data(){
            return {
                addDialogViible:false,
                editInfo:{},
                addParForm:{
                    cataName:'',
                    cataId:'',
                    sel:'',
                    cataValues:'',
                },
                addParRules:{
                    cataName:[
                        { required:true,message:'请输入参数名称',trigger:'blur'}
                    ],
                    cataValues:
                        [
                            { message:'多个参数之间请用逗号隔开',trigger:'focus'}
                        ],
                },
                beEditRules:{
                    attr_name:[
                        {required:true,message:"请输入参数名称",trigger:'blur'}
                    ]
                },
            

            }
        },
        computed:{
            attrValue(){
                return function (info){
                 return  info.attr_vals ?info.attr_vals.split(' ') : [];
                }
            },

        },

        methods:{
            addParams(){
                const cataid=[...this.cataId];
                this.addParForm.cataId=cataid[cataid.length-1];
                this.addParForm.sel=this.sel;
                console.log(this.addParForm)
                this.addDialogViible=true;
            },
            cancelBtn(){
                this.addDialogViible=false;
            },
            closeDialog(){
                this.$refs.addParaRef.resetFields();
            },
            //确认添加参数
            confirm(){
                this.$refs.addParaRef.validate(valid=>{
                    if(valid){
                        addParamsInfoList(this.addParForm.cataId,this.addParForm.cataName,this.addParForm.sel,this.addParForm.cataValues)
                        .then(res=>{
                            if(res.data.meta.status=='201'){
                                this.$emit('getAllList')
                                this.$message.success(res.data.meta.msg);
                            }else{
                              this.$message.info(res.data.meta.msg);   
                            }
                        }) 
                    }else{
                         console.log('请输入正确的信息');
                        this.$message.info("请输入正确的信息");   
                    }
                })
                this.addDialogViible=false;
            },
            //删除参数
            deletePar(info){
                console.log(info);
                  console.log('删除分类id',info.cat_id)
                console.log(info);
                this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteParamsInfoList(info.cat_id,info.attr_id).then(res=>{
                if(res.data.meta.status=='200'){
                    this.$emit('deleteSuccess');
                   this.$message.success(res.data.meta.msg);
                }else{
                     this.$message.info(res.data.meta.msg);
                }
            })
        }).catch(() => {
            this.$message.info("取消删除参数");
            });
        },
            //编辑参数
            editPar(info){
             console.log('编辑参数',info);
             this.editInfo=deepClone(info);
             this.$store.commit('editParDialog');
            },
            //中转给params
            editSuccessMiddle(){
                console.log("-----------中装");
                this.$emit('editSuccessly');
            },
            // handleInputConfirm(info){
            //     console.log(info);
            //     info.inputVisible=false;
            // },
            // showInput(info){
            //      console.log(info);
            //      info.inputVisible=true;
            //    },

        }
    }
</script>

<style scoped>
.input-new-tag{
    width:100px;
}
</style>