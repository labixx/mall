<template>
  <el-dialog
            title="添加分类"
            :visible.sync="$store.state.addCategoryDialogVisible"
            width="40%"
            @close="closeAddUserDialog">
        <el-form :model="cataForm" :rules="cataRules" ref=cataRef>
            <el-form-item label="分类名称" prop="cataName">
                <el-input v-model="cataForm.cataName"></el-input>
            </el-form-item>
             <el-form-item label="父类名称">
               <el-cascader :key='count' v-model="cataForm.cataParent" :options="parentOpt" :props='parentProp'></el-cascader>
            </el-form-item>
            <div class="btn">
            <el-button type="primary" @click="confirmAddCata">确定</el-button>
             <el-button @click="cancelAddCata">取消</el-button>
             </div>

        </el-form>
    
    </el-dialog>

</template>

<script>
import {getcatagoryDate,addCatagories} from 'network/goods';
    export default {
        name: "addCatagory",
        props:{
            parentOpt:{
                type:Array,
                required:true,
            }
        },
        data(){
            return {
                cataForm:{
                    cataName:'',
                    cataParent:[],
                    id:'',
                    level:'',
                },
               count:1,
                parentCateDate:[],
                parentProp:{
                    label:'cat_name',
                    value:'cat_pid',
                    children:'children',
                    checkStrictly:'true',
                   
                },
                cataRules:{
                    cataName:[
                          {required:true,message:'请输入分类名称',trigger:'blur'},
                          {mix:3,max:10,message:'请输入3-10位字符',trigger:'blur'}
                    ],
                
                },
            }
        },
        methods:{
            closeAddUserDialog(){
                if(this.cataForm)
                 this.$refs.cataRef.resetFields();
            
            },
            cancelAddCata(){
                this.$store.commit('addCatagoryDialog');
            },
            confirmAddCata(){
                this.$refs.cataRef.validate(valid=>{
                    console.log(valid);
                    if(valid){
                        //根据对应的添加分类api
                        //如果级联选择器没有选择，则this.cataForm.cataParent.length为0，则默认设置id和level为0
                        //否则有选择的话，则id为this.cataForm.cataParent.length的最后一位item,
                        if(this.cataForm.cataParent.length!=0){
                            this.cataForm.id=this.cataForm.cataParent[this.cataForm.cataParent.length-1];
                            this.cataForm.level=this.cataForm.cataParent.length;
                        }else{
                             this.cataForm.id=0;
                            this.cataForm.level=0;
                        }
                       addCatagories(this.cataForm.id,this.cataForm.cataName, this.cataForm.level).then(res=>{
                           console.log(res);
                           
                           console.log(this.cataForm.cataParent);
                           if(res.data.meta.status=='201'){
                               this.$message.success("添加分类成功");
                               this.$emit('getCataData');
                           }else{
                                this.$message.info(res.data.meta.msg);
                           }
                          
                       })
                    }
                     this.$store.commit('addCatagoryDialog');
                     this.cataForm.cataParent=[];
                      ++this.count;

                })
            }
            
        },
              



    }
</script>

<style scoped>
>>>.el-input{
    width:80%;
}
>>>.el-cascader{
    width:80%;
}

</style>