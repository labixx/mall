<template>
    <div>
        <breadcaps :list="breadcapsTitle" />
        <el-card>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-input placeholder="请输入查询内容" clearable>
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
            <el-table :data="orderInfoM">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="订单编号" prop="order_number"></el-table-column>
                    <el-table-column label="订单价格" prop="order_price"></el-table-column>
                    <el-table-column label="是否付款" prop="pay_status">
                        <template slot-scope="info">
                            <el-tag v-if="info.row.pay_status=='0'">未付款</el-tag>
                            <el-tag v-else>已付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否发货" prop="is_send">
                        <template slot-scope="info">
                            <el-tag>{{info.row.is_send}}</el-tag>
                        </template>
                    </el-table-column>
                <el-table-column label="下单时间" prop="create_time">
                    <template slot-scope="info">
                        {{formDate(info.row.create_time)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="info">
                        <el-button type="primary" @click="editOrder(info.row)">编辑</el-button>
                        <el-button type="warning" @click="checkOrder(info.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="beOrderInfo.pagenum"
                    :page-sizes="[5,10,20,25]"
                    :page-size="beOrderInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
      <edeit-order :editOrderForm="editInfo"></edeit-order>
        <el-dialog
                title="查看物流信息"
                :visible.sync="$store.state.checkOrderDialogVisible"
                width="40%"
        >
<!--
el-timeline:时间线
-->

            <el-timeline >
                <el-timeline-item
                        v-for="(item, index) in checkOrderInfo"
                        :key="index"
                        :timestamp="item.ftime">
                    {{item.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>


</template>

<script>
    import {getOrders,getExpressInfo} from 'network/orders';
    import {formatDate} from 'commons/untils';
    import breadcaps from "common/breadcaps";
    import edeitOrder from "./edeitOrder";
    export default {
        name: "orders",
        components:{
            breadcaps,
            edeitOrder
        },
        data(){
            return {
                breadcapsTitle:["订单管理","订单列表"],
                beOrderInfo:{
                    query: "",
                    pagenum: 1,
                    pagesize: 5,
                },
                orderInfoM:[],
                total:null,
                editInfo:{},
                //物流信息
                checkOrderInfo:[],
            }
        },
        created(){
            this.ordersInfo();
        },
        methods:{
            ordersInfo(){
                const info=this.beOrderInfo;
                getOrders(info.query,info.pagenum,info.pagesize).then(res=>{

                    console.log('订单数据',res);
                    if(res.data.meta.status=='200'){
                        this.orderInfoM=res.data.data.goods;
                        this.total=res.data.data.total;
                        this.$message.success("获取订单数据成功")
                    }else{
                        this.$message.info("获取订单数据失败")
                    }

                })
            },
            handleSizeChange(newSize){
                console.log(newSize)
                this.beOrderInfo.pagesize=newSize;
                this.ordersInfo();

            },
            handleCurrentChange(newPage){
                console.log(newPage);
                this.beOrderInfo.pagenum=newPage;
                this.ordersInfo();
            },
            formDate(t){
                const timer=new Date(t);
                return formatDate(timer);
            },
            //查看订单
            checkOrder(){
                this.$store.commit("checkOrderDialog");
                getExpressInfo('804909574412544580').then(res=>{
                    console.log(res);
                    this.checkOrderInfo=res.data.data;
                })
            },
            //编辑订单
            editOrder(info){
                this.editInfo.id=info.user_id;
                this.editInfo.is_send=info.is_send;
                this.editInfo.order_pay=info.order_pay;
                this.editInfo.order_price=info.order_price;
                this.editInfo.order_number=info.order_number;
                this.editInfo.pay_status=info.pay_status;
                console.log(info);
                this.$store.commit("editOrderDialog");
            }


        }
    }
</script>

<style scoped>

</style>