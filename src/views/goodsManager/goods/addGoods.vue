<template>
   <el-card v-if="showView">
       <h2>{{showView}}</h2>
       <el-alert center  title="添加商品信息"  show-icon type="info"/>
<!--
el-steps：步骤条
active：当前激活的步骤
align-center：居中显示
finish-status：完成的状态
process-status:设置当前所在的步骤状态
-->
       <el-steps  :space="200" :active="Number(currentIndex)" align-center finish-status="success">
           <el-step process-status="wait" title="基本信息"></el-step>
           <el-step title="商品参数"></el-step>
           <el-step title="商品信息"></el-step>
           <el-step title="商品图片"></el-step>
           <el-step title="商品内容"></el-step>
           <el-step title="完成"></el-step>
       </el-steps>
<!--
el-tabs：标签页
注意这里要写两个双引号，:tab-position="'left'"
before-leave:可以监听tag标签页，离开的标签页以及即将激活的标签页
name：选中该选项卡真正选中的值
tab-click:标签页被选中触发该事件
v-model可以绑定el-tab-pane的name属性,，选中选项卡的 name
注意：el-tabs和el-form合并使用时，需要el-form包裹el-tabs
-->
       <el-form :model="goodsInfo" :rules="goodsRef" ref="goodsRef">
       <el-tabs v-model="currentIndex" :tab-position="'left'" :before-leave="beforeTagLeave"   @tab-click="tabClicked">
           <el-tab-pane label="基本信息"  name="0">
               <el-form-item label="商品名称"  prop="goodsName">
               <el-input  v-model="goodsInfo.goodsName"></el-input>
           </el-form-item>
               <el-form-item label="商品价格" prop="goodsPrice">
                   <el-input v-model="goodsInfo.goodsPrice"/>
               </el-form-item>
               <el-form-item label="商品重量" prop="goodsWeight" type="number">
                   <el-input v-model="goodsInfo.goodsWeight"/>
               </el-form-item>
               <el-form-item label="商品数量" prop="goodsCount" type="number">
                   <el-input-number v-model="goodsInfo.goodsCount" controls-position="right" @change="handleChange" :min="1" :max="100"/>
               </el-form-item>
               <el-form-item label="商品分类" prop="goodsCatagoty">
<!-- 
el-cascader:级联选择器
options：指向的时该级联选择器显示的数据
props：选择器的配置选项，里面有label属性，指向的显示的是options里面那个属性；children属性指向的是每个层级通过options里面那个属性作为层级关系
v-model:双向绑定选中该层级的数组
 -->
               <el-cascader v-model="goodsInfo.goodsCatagoty" :props="catagoryProps" :options="catagoryOpt" @change="catagoryhandleChange"></el-cascader>
               </el-form-item>
           </el-tab-pane>
           <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
               <el-form-item v-if="currentIndex=='1'" v-for="item in goodsCataMany" :label="item.attr_name">
               <el-checkbox-group v-model="attrVals" v-for="(items,index) in attrVals"  :key="index" border>
                   <el-checkbox :label="items"></el-checkbox>
               </el-checkbox-group>
           </el-form-item>
           <el-tab-pane label="商品信息" name="2">
               <el-form-item :label="item.attr_name" v-for="item in goodsCataOnly">
<!--
这里注意下：因为这个这个el-form绑定的数据都不一样，
上面绑定的data是一个数据，
但是再这里el-input需要使用的数据不是上面的那个data里面的数据，
所以这里不是使用:model绑定数据，而是使用v-model
-->
                   <el-input v-model="item.attr_vals"></el-input>
               </el-form-item>
           </el-tab-pane>
           <el-tab-pane label="商品图片" name="3">
<!--
el-upload：上传文件
action：提交的图片地址
list-type：图片显示的方式
on-preview：图片预览事件
on-remove：图片移除事件
注意:这个el-upload有自己包装的axios所以需要添加请求头
-->
               <el-upload
                       class="upload-demo"
                       action="https://www.liulongbin.top:8888/api/private/v1/upload"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-success="handleSuccess"
                       :headers="fileHeaders"
                       list-type="picture-card">
                   <el-button size="small" type="primary">点击上传</el-button>
                   <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
           </el-tab-pane>
           <el-tab-pane label="商品内容" name="4">
<!--
quill-editor :富文本插件
v-model：输入的内容
-->
               <quill-editor v-model="goodsInfo.content"></quill-editor>
               <el-button type="primary" @click="confirmAddGoodsrBtn">确 定</el-button>
           </el-tab-pane>
       </el-tabs>
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
    import {addGoodsInfo,addGoodsCatagory,addGoodsCatagoryInfo} from 'network/goods';
    export default {
        name: "addGoods",
        computed:{
            showView(){
                const reg=/addGoods$/;
                return reg.test(this.$route.path)?true:false;
            }
        },
        data(){
            return {
                //接收步骤条
                currentIndex:0,
                //商品信息
                goodsInfo:{
                    goodsName:'',
                    goodsPrice:'',
                    goodsWeight:'',
                    goodsCount:'',
                    goodsCatagoty:[],
                    pics:[],
                    content:'',
                    attrs:[],
                    cata:''
                },
                //商品校验规则
                goodsRef:{
                    goodsName:[
                        {required:true,message:'请输入商品名称',trigger:'blur'},
                        {mix:3,max:10,message:'请输入3-10位',trigger:'blur'}],
                    goodsPrice:[
                        {required:true,message:'请输入商品价格',trigger:'blur'},
                        {mix:3,max:10,message:'请输入1-5位',trigger:'blur'}
                    ],
                    goodsCount:[
                        {required:true,message:'请输入商品数量',trigger:'blur'},
                    ],
                    goodsCatagoty:[
                        {required:true,message:'请输入商品分类',trigger:'blur'},
                    ]

                },
                num:'',
                //商品分类数据
                catagoryOpt:[],
                //商品分类配置信息
                catagoryProps:{
                    label:'cat_name',
                    children:'children',
                    value:'cat_id',
                },
                //商品分类绑定数据,选中的值在这里，并时一个数组
                //selectedCatagory:[],
                //商品参数数据
                goodsCataMany:[],
                attrVals:[],
                //商品信息数据
                goodsCataOnly:[],
                //图片预览信息
                Imagedialog:false,
                imgUrl:'',
                //图片请求头
                fileHeaders:{
                    Authorization:window.sessionStorage.getItem('token'),
                }

            }

        },
        created(){
            this.catagoryInfo();
        },
        methods:{
            handleChange(){
                console.log();
            },
            //获取商品分类数据
            catagoryInfo(){
                addGoodsCatagory().then(res=>{
                   // console.log(res);
                    this.catagoryOpt=res.data.data;
                    console.log("商品分类数据");
                    console.log(this.catagoryOpt)
                })
            },
            //处理商品分类级联选择器发生改变时
            catagoryhandleChange(value){
                // console.log("处理商品分类级联选择器发生改变时");
                // console.log(this.selectedCatagory);
              console.log(value);
              this.cataId=value[2];
                },
            beforeTagLeave(actTag,leaveTag){
                // console.log(actTag);
                // console.log(leaveTag);
                //判断当前离开的tag标签页是不是0，这个0是通过name属性绑定的；v-model选中级联选择器的长度不等与3就return false,就不可以进入下一标签页
                if(leaveTag=='0'&&this.goodsInfo.goodsCatagoty.length!=3){
                    this.$message.warning("请输入商品基本信息");
                    return false;
                }
            },
            //左侧标签点击事件
            tabClicked(){
                if(this.currentIndex=='1'){
                    console.log("商品参数数据");
                    addGoodsCatagoryInfo(this.cataId,'many').then(res=>{
                        console.log("动态商品分类数据")
                        console.log(res)
                        this.goodsCataMany=res.data.data;
                        this.goodsCataMany.forEach(item=>{
                            this.attrVals=item.attr_vals.split(',');
                        })
                    })
                }else if(this.currentIndex=='2'){
                   // console.log("商品信息数据");
                    addGoodsCatagoryInfo(this.cataId,'only').then(res=>{
                        console.log(res)
                        this.goodsCataOnly=res.data.data;
                    })
                }else if(this.currentIndex=='3'){
                    console.log("商品图片信息");
                }
            },
            //图片预览事件
            handlePreview(file){
                this.imgUrl=file.response.data.url;
                this.Imagedialog=true;
            },
            //图片移除事件
            handleRemove(file){
               const removeId=this.goodsInfo.pics.findIndex(item=>{
                   return item==file.response.data.tmp_path;
               });
                this.goodsInfo.pics.splice(removeId,1)
            },
            //图片上传成功回调函数
            handleSuccess(res){
                console.log('图片上传成功',res);
               if(res.meta.status=='200'){
                   this.$message.success("图片上传成功");
                   const picInfo=res.data.tmp_path;
                   this.goodsInfo.pics.push(picInfo);
               }

            },
            //确定添加商品
            confirmAddGoodsrBtn(){
                console.log("添加商品");
                //把数据整理成api需要的数据
                this.goodsInfo.cata=[...this.goodsInfo.goodsCatagoty];
                this.goodsInfo.cata=this.goodsInfo.cata.join(',');
                this.goodsCataMany.forEach(item=>{
                   const goodsCataManyObj={
                       attr_id:item.attr_id,
                       attr_vals:item.attr_vals,
                   }
                   this.goodsInfo.attrs.push(goodsCataManyObj);
                });
                this.goodsCataOnly.forEach(items=>{
                    const goodsCataOnlyObj={
                        attr_id:items.attr_id,
                        attr_vals:items.attr_vals,
                    }
                    this.goodsInfo.attrs.push(goodsCataOnlyObj);
                });
                const info=this.goodsInfo;
                //校验并发生请求
                this.$refs.goodsRef.validate(valid=>{
                   if(valid){
                       addGoodsInfo(info.goodsName,info.cata,info.goodsPrice,info.goodsCount,info.goodsWeight,info.content,info.pics,info.attrs).then(res=>{
                          if(res.data.meta.status=='201'){
                             this.$emit("addGoodsSucc");
                              this.$message.success("添加商品成功");
                              this.$router.push("/home/goods");
                          }else{
                              this.$message.info(res.data.meta.msg)
                          }
                       })
                   }else{
                       this.$message.error("请输入商品信息");
                   }
                });
            }
        }
    }
</script>

 <style scoped>
>>> .el-form-item__content{
    white-space: nowrap;
    display:flex;
}
>>> .el-dialog__body img{
    width:100%;
    text-align: center !important;
}
>>>.quill-editor{
    height:300px;
 margin-bottom:10px;
}
>>>.ql-container{
    height:236px;
}
>>>.ql-editor{
    height:100%;
}
>>>.ql-container{
    height:236px;
}
 </style>