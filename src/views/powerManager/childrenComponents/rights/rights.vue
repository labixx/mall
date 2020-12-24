<template>
    <div>
        <breadcaps :list="['权限管理','权限列表']"/>
        <el-card>
            <el-table :data="rightsListInfo" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级">
                      <!--如果要使用表格内部的数据进行重新操作，则使用作用域插槽-->
                    <template slot-scope="info">

                        <el-tag v-if="info.row.level==='0'">标签一</el-tag>
                        <el-tag v-if="info.row.level==='1'" type="success">标签二</el-tag>
                        <el-tag v-if="info.row.level==='2'" type="info">标签三</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>

<script>
    import breadcaps from "common/breadcaps";
    import {getRights} from 'network/powerManager';
    export default {
        name: "rights",
        components:{
           breadcaps,
        },
        data(){
           return {
               rightsListInfo:[],
               breadcapsList:["权限管理",'权限列表'],
           }
        },
        created() {
            this.getRightsList();
        },
        methods:{
            getRightsList(){
                getRights().then(res=>{
                    console.log("----------------");
                    console.log(res);
                    this.rightsListInfo=res.data.data;

                })
            }
        }
    }
</script>

<style scoped>

</style>