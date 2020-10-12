<template>
    <el-container style="height:100%;">
        <el-header height="60px">
            <main-header></main-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <main-aside></main-aside>
            </el-aside>
            <el-main height="">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import MainHeader from "../../components/MainHeader"
import MainAside from "../../components/MainAside"
export default {
    components: {
        MainHeader,
        MainAside,
    },
    created () {
        if(this.$store.state.userType==3){
            this.$http.get('xuanke/Admin/info.php').then(res=>{
                this.$store.state.teaData=res.data.teacher
                this.$store.state.stuData=res.data.student
                this.$store.state.roomData=res.data.classroom
                this.$store.state.courseData=res.data.course
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.el-header{
    background: #303133;
    border-bottom: 1px solid #ccc;
}
.el-aside{
    background-color:#303133;
}
.el-main{
    background: #f2f5f9;
}
</style>