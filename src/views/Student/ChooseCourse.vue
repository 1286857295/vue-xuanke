<template>
    <div class="course">
        <div class="header">
            <el-input v-model="target" placeholder="请输入搜索内容">
                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px;">
                    <el-option v-for="item in form" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="common-table">
            <el-table :data="tableData" height="95%" v-loading="config.loading">
            <!-- <el-table-column label="序号">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ (config.page - 1) * 10 + scope.$index + 1 }}</span>
                </template>
            </el-table-column> -->
                <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">选课</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage"></el-pagination> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cno:"",
                config:{
                    loading:false,
                    total:10,
                    page:1
                },
                target:'',
                select:'',
                tableData:[],
                tableLabel:[
                    {
                        prop:"cname",
                        label:"课程名"
                    },
                    {
                        prop:"weekname",
                        label:"星期"
                    },
                    {
                        prop:"datename",
                        label:"时间段"
                    },
                    {
                        prop:"roomno",
                        label:"教室"
                    },
                    {
                        prop:"number",
                        label:"已选人数"
                    },
                    {
                        prop:"tname",
                        label:"授课老师"
                    },
                ],
                config:{},
                form: [
                    {
                        label:"教师",
                        value:1
                    },
                    {
                        label:"课程",
                        value:2
                    },
                    {
                        label:"上课时间",
                        value:3
                    },
                ]
            }
        },
        methods: {
            handleEdit(index,row){
                this.cno=this.tableData[index].cno;
                this.tableData.splice(index,1);
                this.$http.get("/xuanke/Student/update.php",{
                    params:{
                        act:"add",
                        cno:this.cno,
                        sno:this.$store.state.userId
                    }
                }).then();
            },
            getDate() {
                this.config.loading=true;
                this.$http.get("/xuanke/Student/main.php").then(res=>{
                    this.tableData=res.data.course
                    this.config.loading=false;
                })
            }
        },
        mounted () {
            this.getDate();
        },
    }
</script>

<style lang="scss" scoped>
.course{
    height: 100%;
    .header{
        height: 5%;
        margin-bottom: 20px;
    }
    .common-table{
        height: 95%;
    }
}

</style>