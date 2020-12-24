//获取图表数据
import {request} from './index';
//获取商品列表数据
export function getReports(){
    return  request({
        url:'reports/type/1',
        method:"get",

    })
}