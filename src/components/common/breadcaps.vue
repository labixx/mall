<template>
    <el-breadcrumb class="Titles" separator="/">
        <el-breadcrumb-item :to="{ path: '/home/users' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in list">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "breadcaps",
        props:{
            list:{
                 type:Array,
                 required:true,
            }
        }
    }
</script>

<style scoped>
.Titles{
    margin-bottom:20px;
}
</style>