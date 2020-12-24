import {request} from './index.js';
//获取home界面左侧得菜单列
export function getHomeAsideList(){
    return request({
        url:'/menus',
        method:'get'
    })
}

//获取用户列表数据
//queryContent:查询内容
//pagenum：查询页码
//pagesize：显示多少条数据
export function getUserList(queryContent,pagenum,pagesize){
    return request({
        url:"/users",
        method:"get",
        params:{
            queryContent,
            pagenum,
            pagesize,
        }
    })
}

//修改用户列表得状态
//put:用于修改信息提交
export function editUserState(uId,type){
    return request({
        url:'/users/'+uId+'/state/'+type,
        method:"put"
    })
}

//添加用户
export function addUser(username,password,email,mobile){
    return request({
        url:"/users",
        method:"post",
        data:{
            username,
            password,
            email,
            mobile,
        }
    })
}

//编辑用户
export function editUser(id,email,mobile){
    return request({
        url:'/users/'+id,
        method:'put',
        data:{
            id,
            email,
            mobile,
        }
    })
}


//删除用户
export function deleteUser(id){
    return request({
        url:'/users/'+id,
        method:'delete',
        data:{
            id,
        }
    })
}