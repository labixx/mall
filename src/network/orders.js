import {request} from './index';
//获取订单数据
export function getOrders (query,pagenum,pagesize){
    return request({
        url:'orders',
        method:'get',
        params:{
            query,
            pagenum,
            pagesize,
        }
    })
}

//修改订单数据
export function editOrder (id,is_send,order_pay,order_price,order_number,pay_status){
    return request({
        url:'orders/'+id,
        method:'put',
        data:{
            id,
            is_send,
            order_pay,
            order_price,
            order_number,
            pay_status
        }
    })
}

//查看物流进度信息
export function getExpressInfo (id){
    return request({
        url:'/kuaidi/'+id,
        method:'get',
    })
}