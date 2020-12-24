<template>
    <el-dialog
            title="提示"
            :visible.sync="$store.state.assignDialogVisible"
            width="30%"
            @close="closeDialog"
    >
<!--
data：显示的数据
el-tree:树形控件
props：配置选项
show-checkbox:显示复选框
node-key:选中该节点的时候获得的值
check-on-click-node ：选择节点的时候也可以勾选复选框
default-expand-all：默认展开所有的节点
-->
        <el-tree
                :data="RolesTree"
                :props="defaultProps"
                default-expand-all
                check-on-click-node
                show-checkbox
                node-key="id"
                ref="roletree"
               
                :default-checked-keys="expandId">
        </el-tree>
        <h2>{{expandId}}</h2>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="confirmDialog">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {getRightsTree,assignRole} from 'network/powerManager.js';
    export default {
        name: "assignRole",
        props:{
            expandId:{
                type:Array,
                required:true,
            },
            beAssignInfo:{
                type:Object,
                required:true,
            }
        },
        data(){
            return {
                //label:是指树形空间的那个显示文本的属性是那个
                //children:是指一层一层之间通过那个属性连接
                defaultProps:{
                    label:"authName",
                    children:'children'
            },
                //树节点数据
                RolesTree:[],
              checkId:'',

            }
        },

        created() {
            this.getRoleTree();
        },
        methods:{
            getRoleTree(){
                getRightsTree().then(res=>{
                    this.RolesTree=res.data.data;
                })
            },
            cancelDialog(){
                this.$store.commit("assignDialog");
            },
            confirmDialog(){
               const  checkId=[...this.$refs.roletree.getCheckedNodes(),... this.$refs.roletree.getCheckedKeys()]
               const iids=checkId.join(",");
               this.checkId=this.beAssignInfo.editId;
               console.log(typeof Number(this.checkId))
               assignRole(Number(this.checkId),iids).then(res=>{
                   console.log(res);
               })
               this.$store.commit("assignDialog");
            },
            closeDialog(){
               this.$emit("closeDialog");

            },
            // nodeChange(){
            //      console.log(this.$refs.roletree.getCheckedNodes())
            //     console.log("节点发生变化");
            //      console.log(this.$refs.roletree.getCheckedKeys())
            // }
        }
    }
</script>

<style scoped>

</style>