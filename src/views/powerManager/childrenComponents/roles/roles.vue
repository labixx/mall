<template>
   <div>
      <breadcaps :list="['权限管理','角色列表']"/>
     <el-card>
        <el-button type="primary" @click="addRole" @confirmAddRole="getRolesList">添加角色</el-button>
        <el-table :data="RolesListWrapper" border stripe>
           <el-table-column type="expand">
             <template slot-scope="info">
                <el-row
                        v-for="(item,index) in info.row.children"
                        :key="item.id"
                        :class="{'bt':firstIndex(index)}">
                   <el-col :span="9" class="firstCol">
                      <el-tag closable  @close="deleteRole(info.row)">{{item.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                   </el-col>
                   <el-col :span="15">
                      <el-row v-for="(items,index1) in item.children" :key="items.id" :class="{'bt':firstIndex(index1)}">
                         <el-col :span="12" class="secondCol">
                            <el-tag closable  @close="deleteRole(info.row)" type="success">{{items.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                         </el-col>
                         <el-col :span="12" >
                            <el-tag closable  @close="deleteRole(info.row)" type="warning" class="threeCol" v-for="items3 in item.children" :key="items3.id">{{items3.authName}}</el-tag>
                         </el-col>
                      </el-row>
                   </el-col>
                </el-row>
             </template>
           </el-table-column>
           <el-table-column type="index"></el-table-column>
           <el-table-column label="角色名称" prop="roleName">
           </el-table-column>
           <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
           <el-table-column label="操作" class="exeBtn">
              <template slot-scope="info">
                 <el-button type="success" class="el-icon-edit"  @click="editRole(info.row)">编辑</el-button>
                 <el-button type="info" class="el-icon-delete" @click="deleteRole(info.row)">删除</el-button>
                 <el-button type="primary" class="el-icon-setting" @click="assignRole(info.row)">分配角色</el-button>
              </template>
           </el-table-column>
        </el-table>
     </el-card>
      <add-role
              :addDialogVisible="addDialog"
              @addRoleCancel="addRole"
              @confirmAddRole="getRolesList">
       </add-role>
      <editRole :editDialog="editDialog" :beEditInfo="editInfo" @confirmEditRole="getRolesList"></editRole>
      <assign-role :beAssignInfo="editInfo" :expandId="idArrList"></assign-role>
   </div>
</template>

<script>
   import addRole from "./addRole";
   import editRole from "./editRole";
   import assignRole from "./assignRole";
   import breadcaps from "common/breadcaps";
   import {getRoles,editRoleById,deleteRole}  from 'network/powerManager.js';
    export default {
        name: "roles",
       components:{
          addRole,
          editRole,
          assignRole,
          breadcaps,
       },
       data(){
          return {
             RolesListWrapper:[],
             isFirst:false,
             //添加角色窗口
             addDialog:false,
             //修改角色窗口
             editDialog:false,
             //修改角色信息
             editInfo:{
                editId:'',
                editName:'',
                editDesc:'',
             },
             //默认选中的id
             idArrList:[],
          }
       },
       created(){
          this.getRolesList()
       },
       methods:{
           //获取到所有的角色信息
           getRolesList(){
              getRoles().then(res=>{
                 console.log("角色数据");
                 console.log(res);
                 this.RolesListWrapper=res.data.data;
              })
           },
          //添加角色
          addRole(){
             this.$store.commit("addRoleDialog");
          },
          //获得到编辑角色的信息
          editRole(info){
             this.editInfo.editId=info.id;
             this.editInfo.editName=info.roleDesc;
             this.editInfo.editDesc=info.roleName;
             this.$store.commit("editRoleDialog");
          },
          //删除角色
          deleteRole(info){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
             }).then(() => {
                deleteRole(info.id).then(res=>{
                   this.getRolesList();
                   this.$message.success('删除成功!');
                })
             }).catch(() => {
                this.$message({
                   type: 'info',
                   message: '已取消删除'
                });
             });
          },
          //分配角色
          assignRole(info){
             //被选中的id
             this.idArrList=[];
             const arr=[];
              Object.keys(info).forEach(item=>{
                if(item=='children'){
                   info[item].forEach(items=>{
                      console.log(Object.keys(items));
                      Object.keys(items).forEach(items2=>{
                         console.log(items2);
                         if(items2=='children'){
                            console.log(items[items2])
                            items[items2].forEach(items3=>{
                               console.log(items3);
                              console.log(Object.keys(items3))
                               Object.keys(items3).forEach(items4=>{
                                  if(items4=='children'){
                                     console.log(items3[items4])
                                     items3[items4].forEach(items5=>{
                                        console.log(items5);
                                       Object.keys(items5).forEach(items6=>{
                                          console.log("------------------");
                                          console.log(items6);
                                          if(items6=='id'){
                                           console.log(items5[items6]);
                                           arr.push(items5[items6]);
                                          }
                                       })
                                     })
                                  }
                               })
                            })
                         }
                      })
                   })
                }

             });
             this.idArrList=[...arr];
             this.$store.commit("assignDialog");
          },
           //关闭窗口设置数组为空
           //这里虽然数组为空了，但是勾选的数据没有重置为空，
         //  closeAssignDialog(){
         //      this.idArrList=[];
         //  }
       },
       computed:{
           firstIndex(){
              return function(index){
                 return index!='0'?'isFirst':'';
              }
           }
       }
    }
</script>

<style scoped>
.exeBtn{
   display:flex;
}
   .el-table{
      margin-top:20px;
   }

   .firstRow{
     margin:5px 0;
   }
   .secondCol{
      margin-top:7px;
   }
   .threeCol{
      margin-left:5px;
   }
   .bt{
      border-top:1px solid #eee;
   }
</style>