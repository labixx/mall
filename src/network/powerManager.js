import {request} from './index';
//获取权限列表,list
export function getRights(){
    return request({
        url:"/rights/list",
        method:'get'
    })
}

export  function getRightsTree(){
    return request({
        url:"/rights/tree",
        method:'get'
    })
}

//获取角色列表
export function getRoles(){
    return request({
        url:"/roles",
        method:'get',

    })
}
//添加角色
export function addRole(roleName,roleDesc){
    return request({
        url:'/roles',
        method:"post",
        data:{
            roleName,
            roleDesc,
        }
    });
}
//编辑角色
export function editRoleById(id){
    return request({
        url:'/roles/'+id,
        method:'get',
    })
}
//提交编辑角色信息
export function editRoleCommit(id,roleName,roleDesc){
    return request({
        url:'/roles/'+id,
        method:'put',
        data:{
            roleName,
            roleDesc
        }
    })
}
//删除角色信息
export function deleteRole(id){
    return request({
        url:'/roles/'+id,
        method:'delete',

    })
}

//分配用户角色
export function assignRole(roleId,rids){
    return request({
        url:'roles/'+roleId+"/rights",
        method:'post',
        data:{
            roleId,
            rids
        }


    })
}