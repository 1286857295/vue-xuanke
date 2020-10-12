<template>
    <el-row :gutter="20" class="checkinfo">
        <el-col :span="8">
            <el-card shadow="hover" style="height:230px;margin-bottom:10px;">
                <div class="user">
                    <img :src="userImg" class="imginfo"/>
                    <div class="userinfo">
                        <p class="name">{{stuInfo.sname}}</p>
                        <p class="access">学生</p>
                    </div>
                </div>
                <div class="login_info">
                    <p>上次登录时间: <span>2020-9-1</span></p>
                    <p>上次登录地点: <span>武汉</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="height:400px;" v-loading="loading">
                <div class="stu_info">
                    <el-input v-for="(key,val) in stuInfo" :key="val" :placeholder="key">
                        <span slot="prepend" style="width:100px">{{ val }}</span>
                    </el-input>
                </div>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="course">
                <el-card shadow="hover">
                    <div class="notice">系统开放时间</div>
                    <p>2020年9月1日——2020年9月20日</p>
                    <div class="notice" style="margin-top:30px">温馨提示</div>
                    <p>请学生注意时间抓紧选课，一旦时间截至，选课系统将关闭，未选课学生没有成绩</p>
                </el-card>

                <el-card shadow="hover">
                    <div class="notice">选课情况</div>
                    <div class="echart" style="height:250px;" ref="echart"></div>
                </el-card>
            </div>
            
            <el-card shadow="hover" style="height:330px;">
                <div class="notice">已选课程</div>
                <div class="table" v-loading="loading">
                    <el-table :data="tableData">
                         <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
                         <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">退选</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import echarts from "echarts";
    export default {
        data() {
            return {
                cno:"",
                echart:null,
                option:{
                    series:[
                        {
                            type:'pie',
                            data: [
                                {value: 150, name: '已选满课程'},
                                {value: 310, name: '未选满课程'}
                            ]
                        }
                    ],
                    legend: {
                        textStyle: {
                            color: '#333'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    color: [
                    '#2ec7c9',
                    '#b6a2de',
                    '#5ablef',
                    '#ffb980',
                    '#d87a80',
                    '#8d98b3',
                    '#e5cf0d',
                    '#97b552',
                    '#95706d',
                    '#dc69aa',
                    '#07a2a4',
                    '#9a7fd1',
                    '#588dd5',
                    '#f5994e',
                    '#c05050',
                    '#59678c',
                    '#c9ab00',
                    '#7eb00a',
                    '#6f5553',
                    '#c14089'
                    ],
                },
                tableData:[],
                tableLabel:[
                    {
                        prop:"sname",
                        label:"姓名"
                    },
                    {
                        prop:"cname",
                        label:"课程名"
                    },
                    {
                        prop:"roomno",
                        label:"教室"
                    },
                    {
                        prop:"during",
                        label:"时间段"
                    },
                    {
                        prop:"weekname",
                        label:"星期"
                    },
                    {
                        prop:"datename",
                        label:"时间"
                    },
                ],
                userImg:require("../../assets/image/user.png"),
                loading:false,
                stuInfo:{}
            }
        },
        methods: {
            getDate() {
                this.loading=true;
                this.$http.get("/xuanke/Student/main.php").then(res=>{
                    this.stuInfo=res.data.student;
                    this.tableData=res.data.optional;
                    this.loading=false;
                })
            },
            initCharts(){
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.option)
            },
            handleDelete(index, row) {
                this.cno=this.tableData[index].cno;
                this.tableData.splice(index,1);
                this.$http.get("/xuanke/Student/update.php",{
                    params:{
                        act:"delete",
                        cno:this.cno,
                        sno:this.$store.state.userId
                    }
                }).then();
            }
        },
        mounted () {
            this.getDate();
            this.initCharts();
        },
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/checkinfo.scss";
</style>