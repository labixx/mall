<template>
    <el-dialog
  title="编辑分类"
  :visible.sync="$store.state.editCategoryDialogVisible"
  width="30%">
  <el-form :model='editCataDate'>
      <el-form-item label='分类id'>
          <el-input v-model='editCataDate.cat_id' disabled/>
      </el-form-item>
      <el-form-item label='分类名称'>
          <el-input v-model='editCataDate.cat_name'/>
      </el-form-item>
      </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelBtn">取 消</el-button>
    <el-button type="primary" @click="comfirmBtn">确 定</el-button>
  </span>
</el-dialog>
</template>


<script>
 import {commitCatagories} from 'network/goods.js';
export default {
    props:{
        editCataDate:{
            type:Object,
            required:true,
        }
    },
    methods:{
        cancelBtn(){
             this.$store.commit('editCatagoryDialog');
        },
        comfirmBtn(){
           this.editCataDate;
          commitCatagories(this.editCataDate.cat_id,this.editCataDate.cat_name).then(res=>{
              console.log(res);
              if(res.data.meta.status=='200'){
                  this.$message.success("更新成功");
                  this.$emit("commitCata");
              }else{
                   this.$message.success(res.data.meta.msg);
              }
          })
          this.$store.commit('editCatagoryDialog');
        },
    }
}
</script>
<style scoped>

</style>