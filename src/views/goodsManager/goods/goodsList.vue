<template>
  <div>
    <!-- 搜索框 -->
    <el-row :gutter="5">
      <el-col :span="6">
        <el-input placeholder="请输入查询内容" v-model='searchContent' clearable @clear='clearContent'>
          <el-button slot="append" icon="el-icon-search" @click='searchBtn(searchContent)'></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
      </el-col>
       </el-row>
      <!-- 商品展示区 -->
      <el-table :data="goods" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column  width="400px" label="商品名称" prop="goods_name">
            <!-- 为单元格添加鼠标移上去显示完整的信息 -->
            <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{scope.row.goods_name }}</p>
          <div slot="reference" class="name-wrapper">
            <p class="goodsName">{{ scope.row.goods_name}}</p>
          </div>
        </el-popover>
      </template>
        </el-table-column>
        <el-table-column label="商品价格" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" prop="upd_time">
          <template slot-scope="info">
            {{formDate(info.row.upd_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="info">
            <el-button size="mini"  icon="el-icon-edit" type="primary" @click="editGoods(info.row)">编辑</el-button>
            <el-button  size="mini"  icon="el-icon-delete" type="danger" @click="deleteGoods(info.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
     <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Number(goodsInfoPage.pagenum)"
            :page-sizes="[5,10,20,25]"
            :page-size="Number(goodsInfoPage.pagesize)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totals">
    </el-pagination>
  </div>
</template>
<script>
  import {formatDate} from 'commons/untils';
  import {deleteGood,queryGoods} from 'network/goods'
export default {
  name: "goodsList",
  data(){
    return {
      edtigoodsInfo:{},
      searchContent:'',
    }
  },
  props: {
    goods: {
      type: Array,
      required: true,
    },
    totals:'',
    goodsInfoPage:{
        type:Object,
        required:true,
    }
  },
  methods:{
    //处理页码量发生变化
      handleSizeChange(newSize){
          this.$emit("currentPageSizeChange",newSize)
      },
    //处理页码发生变化
      handleCurrentChange(newPage){
          this.$emit("currentPageChange",newPage)
      },
    //格式化时间
    formDate(time){
        const timer=new Date(time);
        return formatDate(timer);
    },
    //添加商品
    addGoods(){
        this.$router.push("/home/goods/addGoods");
    },
    //删除商品
    deleteGoods(info){
        console.log(info);
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteGood(info.goods_id).then(res=>{
            console.log(res);
            if(res.data.meta.status==200){
              this.$emit("loadGoodsList");
              this.$message.success("删除成功");
            }else{
              this.$message.info(res.data.meta.msg);
            }
          })
        }).catch(()=>{
          this.$message.info("取消删除");
        });
  },
    //编辑商品
    editGoods(info){
      queryGoods(Number(info.goods_id)).then(res=>{
        console.log("编辑商品信息");
       
        if(res.data.meta.status=='200'){
          const editgood=res.data.data;
          // console.log(editgood);
          //注意：在进行路由跳转得时候，需要传参得时候是使用路由带参，而不是组成他们兄弟组件进行传参
          //this.$bus.$emit("editGoodsInfo", editgood);
          this.$router.push({
            path:'/home/goods/editGoods',
            query:{id:editgood.goods_id}
          });
        }

      })
    },
    //商品分类查询
    searchBtn(info){
      console.log(info);
      this.$emit("goodsSearch",info);
    },
    clearContent(){
      console.log(this.searchContent);
      this.$emit("clearSearchContent",this.searchContent);
    }

  },


};
</script>
<style scoped>
.goodsName{
    width:400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.el-table{
    margin-top:20px;
}
</style>