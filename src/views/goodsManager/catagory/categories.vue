<template>
    <div>
        <breadcaps :list="['商品管理','商品分类']"></breadcaps>
        <el-card>
            <el-row :gutter="5">
                <el-col :span="6">
                 <el-button type="primary" @click="addCata">添加分类</el-button>
                </el-col>

            </el-row>
<!--
ZkTable：这个是一个插件
:data：指定数据源
:columns：显示数据得配置
-->
         <ZkTable :data="cataInfo" :columns="cataCol" stripe border :expand-type="false" :selection-type="false" show-index index-text="#">
             //使用isOk自定义模板
             <template slot="isOk" slot-scope="info">
                 <i class="el-icon-circle-check" v-if="info.row.cat_deleted"></i>
                 <i class="el-icon-circle-close" v-else></i>
             </template>
             //这里有问题
             <template slot="sort" slot-scope="info">
                 <el-tag v-if="info.row.cat_level=='0'">一级</el-tag>
                 <el-tag v-if="info.row.cat_level=='1'">二级</el-tag>
                 <el-tag v-if="info.row.cat_level=='2'">三级</el-tag>
             </template>

             <template slot="opt" slot-scope="info">
                 <el-button type="primary"  @click="editCata(info.row)">编辑</el-button>
                 <el-button type="info" @click="deleteCata(info.row)">删除</el-button>
             </template>

         </ZkTable>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
            <addCatagory :parentOpt='SelectCateDate' @getCataData='getCataData'/>
            <editCategory :editCataDate='editCataDate' @commitCata='getCataData'/>
        </el-card>
    </div>

</template>

<script>
    import breadcaps from "common/breadcaps";
    import addCatagory from 'views/goodsManager/catagory/addCategory';
    import editCategory from 'views/goodsManager/catagory/editCategory';
    import {getcatagoryDate,deleteCatagories,editCatagoriesGetID} from 'network/goods.js';
    export default {
        name: "categories",
        components:{
            breadcaps,
            addCatagory,
            editCategory
        },
        data(){
            return {
                queryInfo:{
                    type:3,
                    pagenum:1,
                    pagesize:5,
                },
                cataInfo:[],
                total:null,
                //配置ZKTable得columns
                cataCol:[
                    {

                    //指定这一列得标题名称
                        label:'分类名称',
                //指定这一列得显示数据
                        prop:'cat_name',

                    },{
                    label:'是否有效',
                        //指定这一列为自定义模板
                      type:'template'  ,
                        //模板名称为isOk
                        template:'isOk',
                    },{
                        label:'排序',
                        //指定这一列为自定义模板
                        type:'template'  ,
                        //模板名称为isOk
                        template:'sort',
                    },{
                        label:'操作',
                        //指定这一列为自定义模板
                        type:'template'  ,
                        //模板名称为isOk
                        template:'opt',
                    }
            ],
               //添加分类的级联选择器数据源
            SelectCateDate:[],
            //编辑分类的数据
            editCataDate:{},
            }

        },
        created(){
            this.getCataData();
        },
        methods:
            {
        //获取分类数据
            getCataData(){
                const info=this.queryInfo;
                getcatagoryDate(info.type,info.pagenum,info.pagesize).then(res=>{
                    console.log("商品数据");
                    console.log(res);
                    this.cataInfo=res.data.data.result;
                    this.total=res.data.data.total;
                })
            },
            handleSizeChange(newSize){
                this.queryInfo.pagesize=newSize;
                this.getCataData();

            },
            handleCurrentChange(newPage){
                this.queryInfo.pagenum=newPage;
                this.getCataData();
            },
            //点击添加分类
            addCata(){
                console.log("添加分类");
                 getcatagoryDate('2','','').then(res=>{
                     console.log("添加分类");
                     console.log(res);
                     this.SelectCateDate=res.data.data;
                 })
                 this.$store.commit('addCatagoryDialog');
            },

            //删除分类
            deleteCata(info){
               console.log(info)
           this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            deleteCatagories(info.cat_id).then(res=>{
                console.log(res);
               if(res.data.meta.status=='200'){
                   this.$message.success("删除成功");
                   this.getCataData();
               }else{
                    this.$message.success(res.data.meta.msg);
               }
            })
              
        }).catch(()=>{
          this.$message.info("取消删除");
        });

               
            },
            //编辑分类
            editCata(info){
                editCatagoriesGetID(info.cat_id).then(res=>{
                    console.log(res);
                    this.editCataDate=res.data.data;
                    
                })
                this.$store.commit('editCatagoryDialog');
            }
            }
           
    }
</script>

<style scoped>
    >>>.el-row{
        margin:0 0 20px 0;
    }
</style>