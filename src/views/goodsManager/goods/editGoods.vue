<template>
    <el-card>
        <el-alert
                center
                title="修改商品信息"
                show-icon
                type="info"
                :closable="false"
        ></el-alert>
        <el-form :model="goodsInfo" label-width="80px">
            <el-form-item label="id">
                <el-input v-model="goodsInfo.goods_id" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="goodsInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="goodsInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="goodsInfo.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量">
                <el-input v-model="goodsInfo.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                        class="upload-demo"
                        action="https://www.liulongbin.top:8888/api/private/v1/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="picArr"
                        :on-success="handleSuccess"
                        :headers="fileHeaders"
                        list-type="picture-card"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <!-- v-html:把后台传过来的html数据渲染成页面 -->

            <el-form-item label="商品介绍">
                <div v-html="goodsInfo.goods_introduce" class="goodsIntro">
                    {{ goodsInfo.goods_introduce }}
                </div>
            </el-form-item>
            <el-button type="success" @click="confirmBtn">确定</el-button>
            <el-button type="info" @click="cancelBtn">取消</el-button>
        </el-form>
        <el-dialog
                title="图片预览"
                :visible.sync="Imagedialog"
                width="30%">
            <img :src="imgUrl" alt="">
        </el-dialog>
    </el-card>
</template>
<script>
    import {queryGoods,updatePicsInfo} from "network/goods.js";

    export default {
        name: "editGoods",
        data() {
            return {
                //编辑的商品信息
                goodsInfo: {},
                picArr: [],
              fileHeaders:{
                Authorization:window.sessionStorage.getItem('token'),
              },
                imgUrl:'',
                Imagedialog:false
            };
        },
        created() {
            queryGoods(this.$route.query.id).then((res) => {
                console.log("获取得商品数据");
                console.log(res);
                this.goodsInfo = res.data.data;
                console.log("图片", this.goodsInfo.pics);
                this.goodsInfo.pics.forEach((item) => {
                    // console.log(item);
                    let obj = {};
                    obj.name = item.pics_id;
                    obj.url = item.pics_big;
                    this.picArr.push(obj);
                });
                //console.log('提取的数组',this.picArr)
            });
        },
        computed: {},
        mounted() {
            //接收事件
            // this.$bus.$on('editGoodsInfo',(info)=>{
            //     console.log("编辑商品信息");
            //     _this.goodsInfo=info;
            //     console.log( _this.goodsInfo,'goodsInfo')
            //
            // });
        },
        methods: {
            handlePreview(file) {
                console.log(file);
                this.imgUrl=file.url;
                this.Imagedialog=true;
            },
            handleRemove(info) {
              console.log( this.goodsInfo)
              console.log(info);
              this.goodsInfo.pics.forEach((item,index)=>{
                //console.log(info.name==item.pics_id)
                if(info.name==item.pics_id){
                  this.goodsInfo.pics.splice(index,1);

                  //console.log('删除索引',index);
                }
              })

                console.log(this.goodsInfo.pics);

              // updatePicsInfo(this.goodsInfo.goods_id,this.goodsInfo.pics).then(res=>{
              //   console.log(res);
              // })

             // updatePicsInfo()
            },
          confirmBtn(){
              this.$router.go(-1);
          },
          cancelBtn(){
            this.$router.go(-1);
          },
          handleSuccess(res,file){
              console.log(res);
              console.log(file);

          }
        },
    };
</script>

<style scoped>
    >>> .el-col img {
        width: 100%;
    }

    >>> .el-alert {
        margin: 0px 0x 5px 0px !important;
    }

    >>> .el-form {
        margin-top: 10px;
    }

    .goodsIntro {
        border: 1px solid #eee;
        height: 600px;
        overflow: auto;
    }
    >>>.el-dialog__body img{
    width:100%;
    height:100%;
    }
</style>