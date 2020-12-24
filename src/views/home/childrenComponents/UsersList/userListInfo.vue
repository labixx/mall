<template>
    <div>
    <!--
      el-row:行
      el-col:列
      :gutter：每个单个格之间得间隙
      :span:该单元格得跨度
      -->
    <!--  搜索框      -->
    <el-row :gutter="5">
        <el-col :span="6">
            <el-input placeholder="请输入查询内容" clearable v-model="queryInfo.queryContent" @clear="clearQueryContent">
                <el-button slot="append" icon="el-icon-search" @click="queryBtn(queryInfo.queryContent)"></el-button>
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="addUserBtn">添加用户</el-button>
        </el-col>
    </el-row>
    <!--
    表格里面都自带了循环遍历数据
     el-table:表格,注意：表格需要定义:data属性指定表格需要显示得数据对象
      type="index",生成索引值
      el-table-column:注意，在elementui得表格里面是一列对下来得，label定义标题，prop就是指定该列显示得data里面得属性
      -->
    <!-- 会根据:data得数据生成行数-->
    <!--   用户列表数据     -->
    <el-table :data="userListInfo" :border="true" class="usersTable" >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <!--每一行里面都有一个子组件，子组件里面有row-->
        <el-table-column label="状态">
            <!-- 获取子组件得数据-->
            <template slot-scope="users">
               <!-- users.row：每行列表的数据-->
                <el-switch v-model="users.row.mg_state" @change="userStateChanged(users.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="users">
                <el-row class="exeBtn">
                    <el-button type="primary" icon="el-icon-edit" @click="editUserInfoBtn(users.row)"></el-button>
                    <el-button type="info" icon="el-icon-setting"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteUserInfoBtn(users.row)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!--分页 -->
    <!--
    size-change:当选择一页显示多少条数据触发事件；
    current-change：当选择得页码发生改变时触发事件;
    current-page:绑定当前得页码
    page-sizes:提供可以选择一页显示多少数据
    page-size：一页显示缩少条数据
    layout：可以选择使用那些布局
    total:全部数据
    -->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 4, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=totals>
    </el-pagination>
    </div>
</template>

<script>
    import {deleteUser} from 'network/home.js';

    export default {
        name: "userListInfo",
        data(){
            return {

            }
        },
        props:{
            queryInfo:{
                type:Object,
                required:true,
            },

            userListInfo:{

            },
            totals:{
                type:Number,
            }
        },
        methods:{
            //清除input内容重现加载数据
            clearQueryContent(){
                this.$emit("clearQueryContent");
            },
            //实现表单查询功能
            queryBtn(queryContent){
                this.$emit("queryUser",queryContent);
            },
            //实现用户信息的状态改变
            userStateChanged(userInfo){
                this.$emit("userStateChanged",userInfo);
            },
            //选择实现一页多少条内容
            handleSizeChange(newPageContent){
               this.$emit("PageSizeChange",newPageContent);
            },
            //显示当前页数据
            handleCurrentChange(currentPage){
                this.$emit("pageCurrentChange",currentPage);
            },
            //添加用户
            addUserBtn(){
                this.$emit("addUser");
            },
            //编辑用户
            editUserInfoBtn(userInfo){
                this.$emit("editUserInfo",userInfo);
            },
            //删除用户
            deleteUserInfoBtn(userInfo){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    deleteUser(userInfo.id).then(res=>{
                        if(res.data.meta.status==200){
                            this.$message.success("删除成功");
                            this.$emit("loadUserList");
                        }else{
                            this.$message.success("删除失败");
                        }
                    })
                }).catch(()=>{
                    this.$message.info("取消删除");
                });
            }


        }
    }
</script>

<style scoped>
.exeBtn{
    display:flex;
}
    .usersTable{
        margin-top:20px;
    }
</style>