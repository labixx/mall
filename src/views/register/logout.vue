<template>
    <div class="logout" @click="logoutClick">
        <span>退出登录</span>
    </div>

</template>

<script>
    export default {
        name: "logout",
        methods:{
            logoutClick(){
                this.$emit("logout");
            }
        }
    }
</script>

<style scoped>
    .logout{
        font-weight: bolder;
        font-size: 24px;
        float: right;
        margin-right:20px;
        margin-top:20px;

    }
</style>