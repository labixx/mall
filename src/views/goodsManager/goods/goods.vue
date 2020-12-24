<template>
     <div>
     <breadcaps :list="breadcapsTitle"></breadcaps>
        <el-card >
        <goodsList
                :goodsInfoPage="goodsInfo"
                :goods="goodsList"
                :totals="totals"
                @currentPageSizeChange="PageSizeChange"
                @currentPageChange="PageChange"
                @clearSearchContent='search'
                @goodsSearch='search'
                @loadGoodsList="getGoods"/>
        </el-card>
         <addGoods @addGoodsSucc="getGoods"></addGoods>

    </div>
</template>

<script>
import goodsList from 'views/goodsManager/goods/goodsList';
import breadcaps from 'common/breadcaps';
import addGoods from "./addGoods";
import {getGoodsList} from 'network/goods.js';
import EditGoods from "./editGoods";

    export default {
        name: "goods",
        components:{
            breadcaps,
            goodsList,
            addGoods
        },
        data(){
            return {
                breadcapsTitle:["商品管理","商品列表"],
                goodsInfo:{
                    query:'',
                    pagenum:'1',
                    pagesize:'5',
                },
                //商品列表数据
                goodsList:[],
                //总商品数
                totals:null,
            }
        },
        created(){
            this.getGoods();
        },
        methods:{
            //获取商品数据
            getGoods(){
            const info=this.goodsInfo;
                getGoodsList(info.query,info.pagenum,info.pagesize).then(res=>{
                    console.log(res);
                    this.goodsList=res.data.data.goods;
                    this.totals=res.data.data.total;
                })
            },
            PageSizeChange(pageSize){
                this.goodsInfo.pagesize=pageSize;
                this.getGoods()
            },
            PageChange(pageNum){
                 this.goodsInfo.pagenum=pageNum;
                 this.getGoods()
            },
            search(info){
                this.goodsInfo.query=info;
               // console.log('查询内容',this.goodsInfo.query);
                this.getGoods();
               // console.log("查询");

            }
        }
    }
</script>

<style scoped>
el-card{
margin-top:20px;
}
</style>