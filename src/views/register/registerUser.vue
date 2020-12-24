<template>
    <div class="register-user-wrapper">
        <el-form>
            <el-form-item label="用户名">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input></el-input>
            </el-form-item>
            <el-button type="success">确定</el-button>
            <el-button type="info">取消</el-button>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "registerUser"
    }
</script>

<style scoped>
.register-user-wrapper{
    border:1px solid black;
}
</style>