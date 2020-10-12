<template>
<header>
    <span> ☁ 学生选课系统</span>
    <el-dropdown>
        <span>
            <img :src="userImage" alt="" class="userImage" />
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</header>
</template>

<script>
    export default {
        data() {
            return {
                userImage: require("../assets/image/user.png")
            }
        },
    }
</script>

<style lang="scss" scoped>
header{
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .userImage{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    span{
        font-size: 20px;
       font-family: "Microsoft YaHei";
    }
}
</style>