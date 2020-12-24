import {request} from './index';
//获取商品列表数据
export function getGoodsList(query,pagenum,pagesize){
   return  request({
        url:'goods',
        method:"get",
        params:{
            query,
            pagenum,
            pagesize
        }

    })
}
//添加商品
export function addGoodsInfo(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs){
    return request({
        url:'goods',
        method:'post',
        data:{
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs,


        }
    })
}

//商品分类
export function addGoodsCatagory(){
    return request({
        url:'categories',
        method:'get'
    })
}
//商品分类数据
export function addGoodsCatagoryInfo(id,sel){
    return request({
        url:'categories/'+id+'/attributes',
        method:'get',
        params:{
            sel,
        }
    })
}

//添加商品属性
export function addGoodsCatagoryAttr(id,attr_name,attr_sel,attr_vals){
    return request({
        url:'categories/'+id+'/attributes',
        method:'post',
        params:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
//删除商品
export function deleteGood(id){
    return request({
        url:'goods/'+id,
        method:'delete',

    })
}

//根据商品Id查询
export function queryGoods(id){
    return request({
        url:'goods/'+id,
        method:'get',
        params:{
            id
        }

    })
}

//商品分类数据
export function getcatagoryDate(type,pagenum,pagesize){
    return request({
        url:'categories',
        method:'get',
        params:{
            type,
            pagenum,
            pagesize
        }

    })
}
//添加分类
export function addCatagories(cat_pid,cat_name,cat_level){
    return request({
        url:'categories',
        method:'post',
        data:{
            cat_pid,
            cat_name,
            cat_level
        }
    })
}

//删除分类
export function deleteCatagories(id){
    return request({
        url:'categories/'+id,
        method:'delete',
        data:{
            id  
        }
        
    })
}

//编辑分类获取id
export function editCatagoriesGetID(id){
    return request({
        url:'categories/'+id,
        method:'get',
        data:{
            id  
        }
        
    })
}


//提交编辑分类
export function commitCatagories(id,cat_name){
    return request({
        url:'categories/'+id,
        method:'put',
        data:{
            id ,
            cat_name,
        }
        
    })
}

//参数列表
export function getParList(id,sel){
   return  request ({
       url:'categories/'+id+'/attributes',
       method:'get',
       params:{
           id,
           sel
       }
   })
}

//添加参数
export function addParamsInfoList(id,attr_name,attr_sel,attr_vals){
    return  request ({
        url:'categories/'+id+'/attributes',
        method:'post',
        data:{
            id,
            attr_name,
            attr_sel,
            attr_vals,
        }
    })
}

//删除参数
export function deleteParamsInfoList(id,attrid){
    return  request ({
        url:'categories/'+id+'/attributes/'+attrid,
        method:'delete',
        data:{
            id,
            attrid,
           
        }
    })
}

//编辑提交参数
export function commitParInfoList(id,attrId,attr_name,attr_sel,attr_vals){
    return  request ({
        url:'categories/'+id+'/attributes/'+attrId,
        method:'put',
        data:{
            id,
            attrId,
            attr_name,
            attr_sel,
            attr_vals

        }
    })
}

//同步商品图片信息
export function updatePicsInfo(id,pics){
    return  request ({
        url:'goods/'+id+'/pics',
        method:'put',
        data:{
            id,
            pics,

        }
    })
}