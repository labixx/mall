import {request} from './index';
export function getLoginToken(username,password){
    return request({
        url:"/login",
        method: 'post',
        data:{
            username:username,
            password:password,
        }
    })
}