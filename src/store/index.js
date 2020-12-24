import Vue from 'vue';
import vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modules from './modules';
Vue.use(vuex);
const state={
token:'',

  //编辑用户信息
  editDialogVisible:false,
  //添加角色信息
  addRoleDialogVisibe:false,
  //编剧角色信息
  editRoleDialogVisible:false,
  //分配角色窗口
  assignDialogVisible:false,
  //编辑订单信息
  editOrderDialogVisible:false,
  //查看物流信息窗口
  checkOrderDialogVisible:false,
  //添加分类窗口
  addCategoryDialogVisible:false,
  //编辑分类窗口
  editCategoryDialogVisible:false,
  //编辑参数
  editParDialogVisible:false,

};
const store =new vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
});
export default store;
