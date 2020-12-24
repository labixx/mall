<template>
    <div>
    <breadcaps :list="['用户管理','用户列表']"></breadcaps>
    <el-card>
        <userListInfo
                :userListInfo="users"
                :queryInfo="queryInfo"
        @userStateChanged="userStateChanged"
        :totals="totals"
        @PageSizeChange="handleSizeChange"
        @pageCurrentChange="handleCurrentChange"
        @queryUser="queryBtn"
        @clearQueryContent="loadUserList"
         @addUser="addUser"
         @editUserInfo="editUserInfo"
        @loadUserList="loadUserList"
        :loading='loading'
        ></userListInfo>

<addUserInfo
        :addUserForm="addUserForm"
        :dialogVisible="dialogVisible"
        @confirmAddUserDislog="addUser"
        @cancelAddUserDialog="addUser"
></addUserInfo>
<editUserInfo :editUserForm="beEditedUserInfo" :loadUserList="loadUserList"></editUserInfo>
    </el-card>
    </div>
</template>

<script>
    import userListInfo from "./userListInfo";
    import addUserInfo from "./addUserInfo";
    import {editUserState, getUserList} from 'network/home';
    import editUserInfo from "./editUserInfo";
    import breadcaps from "common/breadcaps";
    export default {
        name: "users",
        components:{
            userListInfo,
            addUserInfo,
            editUserInfo,
            breadcaps
        },
        data() {
            return {
                info: "",
                //用户列表数据
                users: [],
                //查询内容
                queryInfo: {
                    //查询内容
                    queryContent:'',
                    //当前页码
                    pagenum: 1,
                    //当前页面显示多少数据
                    pagesize: 2,
                },
                //总用户列表数
                totals: null,
                //添加用户表单数据对象
                addUserForm:{
                    username:'',
                    password:'',
                    email:"",
                    mobile:"",
                },
                //添加用户的弹窗
              //  dialogVisible:false,
                //修改用户的弹窗
                editDialog:false,
                //被编辑的用户信息
                beEditedUserInfo:{
                    username:'',
                    email:'',
                    mobile:'',
                },
                dialogVisible:false,
                loading:false,
                }

            },
        created(){
            this.usersList();
        },
        methods: {
            //获取右侧用户列表数据
            usersList() {
                //单独设置加载
               // const rload=this.openLoading();
                getUserList(this.queryInfo.queryContent, this.queryInfo.pagenum, this.queryInfo.pagesize).then(res => {
                    console.log(res);
                    //发送请求前加载图标打开
                   // this.loading=true;
                    if (res.data.meta.status === 200) {
                        //获取数据后马上把图标隐藏
                      //   rload.close();
                        this.$message.success("获取用户列表数据成功");
                        //用户列表数据
                        this.users = res.data.data.users;
                        //总用户数
                        this.totals = res.data.data.total;
                    } else {
                        this.$message.info("获取用户列表失败");
                    }
                })
            },
            // //一页显示多少页码数
            handleSizeChange(newPageCount) {
                // console.log(newPageCount);
                this.queryInfo.pagesize = newPageCount;
                this.usersList()
            },
            // //当前页码发生改变
            handleCurrentChange(newPageNum){
                // console.log(newPageNum);
                this.queryInfo.pagenum = newPageNum;
                this.usersList()
            },
            //修改switch状态
            userStateChanged(rowInfo) {
                console.log(rowInfo);
                const uId = rowInfo.id;
                const state = rowInfo.mg_state;
                editUserState(uId, state).then(res => {
                    if (res.data.meta.status === 200) {
                        this.$message.success("修改状态成功")
                    } else {
                        this.$message.info("修改状态失败")
                    }
                })
            },
            // //这里没有实现功能
            // //实现查询功能
            queryBtn(queryContent) {
               
                 getUserList(queryContent,'','').then(res => {
                     console.log("查询")
                    console.log(res);
                    // if (res.data.meta.status === 200) {
                    //     this.$message.success("获取用户列表数据成功");
                    //     //用户列表数据
                    //     this.users = res.data.data.users;
                    //     //总用户数
                    //     this.totals = res.data.data.total;
                    // } else {
                    //     this.$message.info("获取用户列表失败");
                    // }
                })

            },
            // //el-input的clear点击触发事件在设置了clearable 属性之后，点击clearable后才会触发事件
            loadUserList() {
                //console.log("重新获取数据");
                this.usersList();
            },
           //实现添加用户功能,点击添加用户按钮，dialog就为true
            addUser() {
                this.dialogVisible=!this.dialogVisible;
            },

            //编辑用户信息
            editUserInfo(userInfo){
                this.beEditedUserInfo.username=userInfo.username;
                this.beEditedUserInfo.email=userInfo.email;
                this.beEditedUserInfo.mobile=userInfo.mobile;
                this.beEditedUserInfo.id=userInfo.id;
                this.$store.commit("DialogVisible");
            },
        }

    }
</script>

<style scoped>
    .exeBtn {
        display: flex;
    }

    .usersTable {
        margin-top: 10px;
    }
    >>>.el-form-item__label{
        white-space: nowrap;
        letter-spacing: 2px;
    }
    >>>.el-form-item__label:before{
        content:"*";
        color:red;

}
</style>