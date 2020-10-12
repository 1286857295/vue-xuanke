<template>
    <div class="login" v-loading="loading">
        <el-dialog title="提示"
                   :visible.sync="dialogVisible"
                   width="30%">
            <span>登录信息有误</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-card shadow="hover">
            <div slot="header">
                
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账  号：">
                    <el-input placeholder="请输入账号" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密  码：">
                    <el-input placeholder="请输入密码" v-model="form.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="类 型：">
                     <el-radio-group v-model="form.radio">
                        <el-radio :label="1">学生</el-radio>
                        <el-radio :label="2">教师</el-radio>
                        <el-radio :label="3">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit">Login</el-button>
            <el-button type="success">Forget</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                loading:false,
                bgImg:require("../../assets/image/timg.jpg"),
                form:{
                    name:"10001",
                    pwd:"123456",
                    radio:3
                }
            }
        },
        methods: {
            submit() {
                this.loading=true;
                this.$http.get("/xuanke/Student/login.php",{
                    params:{
                        user:this.form.name,
                        pwd:this.form.pwd,
                        type:this.form.radio
                    }
                }).then(res=>{
                    this.loading=false;
                    if(res.data!='1'){
                        this.dialogVisible=true;
                    }
                    else{
                        if(this.form.radio==1){
                            this.$store.state.userType=1;
                            this.$store.state.userId=this.form.name;
                            this.$router.push({path:'/CheckInfo'})
                        }
                        if(this.form.radio==2){
                            this.$store.state.userType=2;
                            this.$store.state.userId=this.form.name;
                            this.$router.push({path:'/SetUpCourse'})
                        }
                        if(this.form.radio==3){
                            this.$store.state.userType=3;
                            this.$store.state.userId=this.form.name;
                            this.$router.push({path:'/Teacher'})
                        }
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/login.scss";
</style>