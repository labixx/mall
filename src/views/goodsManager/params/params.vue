<template>
    <div>
<breadcaps :list="['商品管理','分类参数']"></breadcaps>
        <el-card>
            <el-alert show-icon type="warning"  title="注意：只允许为第三级分类设置相关参数！" :closable="false"></el-alert>
            <el-row>
                <el-col :span="2">添加商品分类</el-col>
                <el-col :span="4">
                    <el-cascader
                            v-model="cascadeValue"
                            :options="cascadeOPt"
                            :props="cascadeProps"
                            @change="handleCascadeChange">
                    </el-cascader>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="动态参数" name="many">
                    <paramsList @editSuccessly="getList" @deleteSuccess="getList" @getAllList='getList' :paramInfo="paramInfo" :isShow="isShow" :cataId="cascadeValue" :sel="activeName"/>
                </el-tab-pane>
                <el-tab-pane label="静态参数" name="only">
                    <paramsList @editSuccessly="getList" @deleteSuccess="getList"  @getAllList='getList' :paramInfo="paramInfo" :cataId="cascadeValue" :isShow="isShow"/>
                </el-tab-pane>
            </el-tabs>
        </el-card>

    </div>
</template>

<script>
    import paramsList from "./paramsList";
    import {getcatagoryDate,getParList} from 'network/goods.js'
    import breadcaps from 'common/breadcaps';

    export default {
        name: "params",
        components:{
            breadcaps,
            paramsList
        },
        data(){
            return {
                cascadeOPt:[],
                cascadeValue:[],
                cascadeProps:{
                    label:'cat_name',
                    value:'cat_id',
                    children:'children',
                },
                activeName:'many',
                attr:'',
                paramInfo:[],
                isShow:false,

            }
        },
        created(){
            this.getcascadeOPt();
           
           
        },
        methods:{
            getcascadeOPt(){
                getcatagoryDate().then(res=>{
                    console.log("dao yeyeyeyey ");
                    console.log(res);
                 this.cascadeOPt=res.data.data;
                 })
             },

            getList(){
                if(this.cascadeValue.length!=3){
                    this.isShow=false;
                    this.cascadeValue=[];
                    this.$message.warning("请选择三级分类")
                }else{
                    this.isShow=true;
                    console.log(this.cascadeValue)
                    const id=this.cascadeValue[this.cascadeValue.length-1];
                    console.log(this.attr)
                    getParList(id,this.activeName).then(res=>{
                        console.log("分类参数",res);
                        this.paramInfo=res.data.data;
                        this.paramInfo.forEach(item=>{
                          item.inputVisible = false;
                           item.inputValue = "";
                        })
                    })
                }
            },
            handleCascadeChange(){
                this.getList();
            },
            tabClick(){
                this.getList();
            },
            getOPt(){
                console.log("到爷爷这里了");
            },


        },
    }
</script>

<style scoped>
>>>.el-tag{
    margin:10px;
}
>>>.el-col-2{
    line-height: 3;
    font-size: 16px;
    font-weight: bold;
}
>>>.el-alert{
    margin:5px 0 10px 0;
}
</style>