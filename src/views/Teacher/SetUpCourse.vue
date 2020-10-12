<template>
    <div class="setup">
        <el-dialog title="确认开课信息" :visible.sync="DialogVisible" width="30%">
            <div class="dialog">
                <p>课程名称：{{this.form.cname}}</p>
                <p>限制人数：{{this.form.limit}}</p>
                <p>持续时间：{{this.during}}</p>
                <p>上课星期：{{week[this.form.week]}}</p>
                <p>上课时间：{{date[this.form.date]}}</p>
                <p>上课教室：{{this.roomno}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false">返回修改</el-button>
                <el-button type="primary" @click="addcourse">确定开课</el-button>
            </span>
        </el-dialog>
        <el-card shadow="hover">
            <div class="top">
                <div class="info">
                    <div class="notice">基本信息</div>
                    <div style="margin:0 auto;width:80%;">
                        <el-form ref="form" :model="form" label-width="auto">
                            <el-form-item label="课程名称：">
                                <el-input placeholder="请输入课程名称" v-model="form.cname"></el-input>
                            </el-form-item>
                            <el-form-item label="限制人数：">
                                <el-input placeholder="请输入限制人数：" v-model="form.limit"></el-input>
                            </el-form-item>
                            <el-form-item label="持续周数：">
                                <el-col :span="11">
                                    <el-input placeholder="第几周" v-model="form.duringone"></el-input>
                                </el-col>
                                <el-col :span="2" style="text-align:center;">-</el-col>
                                <el-col :span="11">
                                    <el-input placeholder="第几周" v-model="form.duringtwo"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="上课时间：">
                                <el-col :span="11">
                                    <el-select v-model="form.week" placeholder="请选择上课星期" @change="getdata()">
                                        <el-option v-for="(key,val) in week" :key="val" :label="key" :value="val"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="2" style="text-align:center;">-</el-col>
                                <el-col :span="11">
                                    <el-select v-model="form.date" placeholder="请选择上课时间段" @change="getdata()">
                                        <el-option v-for="(key,val) in date" :key="val" :label="key" :value="val"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="上课教室：">
                                <el-input placeholder="在右边选择教室" v-model="roomno" disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <el-divider direction="vertical" style="height:100%"><i class="el-icon-mobile-phone"></i></el-divider>
                <div class="room">
                    <div class="notice">选择教室</div>
                    <div class="table" v-loading="loading">
                        <el-table :data="tableData">
                            <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="handle(scope.row)">选择</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div style="width:80%;">
                    <el-steps :space="500" align-center :active="active" process-status="finish " finish-status="success">
                        <el-step title="基本信息"></el-step>
                        <el-step title="选择教室"></el-step>
                        <el-step title="开设课程"></el-step>
                    </el-steps>
                </div>
                <el-button type="success" @click="check">开设课程</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                DialogVisible:false,
                loading:false,
                tableData:[],
                tableLabel:[
                    {
                        prop:"roomno",
                        label:"教室"
                    },
                    {
                        prop:"contain",
                        label:"容纳人数"
                    }
                ],
                week:{
                    "01":"周一",
                    "02":"周二",
                    "03":"周三",
                    "04":"周四",
                    "05":"周五",
                    "06":"周六",
                    "07":"周日"
                },
                date:{
                    "11":"1，2节",
                    "12":"3，4节",
                    "13":"5，6节",
                    "14":"7，8节"
                },
                form:{
                    cname:"",
                    limit:"",
                    duringone:"",
                    duringtwo:"",
                    week:"",
                    date:""
                },
                roomno:"",
                setnumber:""
            }
        },
        computed: {
            during() {
                return `${this.form.duringone}-${this.form.duringtwo}周`
            },
            active(){
                var count=0;
                var obj=this.form;
                for(var i in obj){
                    if(obj[i]==""){count++}
                }
                if(count!=0){
                    return 0;
                }else{
                    if(this.roomno!=""){
                        return 2;
                    }
                    return 1;
                }
            }
        },
        methods: {
            handle(row) {
                this.roomno=row.roomno;
            },
            getdata(){
                if(this.form.date!="" && this.form.week!=""){
                    this.loading=true;
                    this.$http.get("/xuanke/Teacher/main.php",{
                        params:{
                            weekno:this.form.week,
                            dateno:this.form.date,
                            tno:this.$store.state.userId
                        }
                    }).then(res=>{
                        this.tableData=res.data.classroom;
                        this.setnumber=res.data.setnumber;
                        this.loading=false;
                    })
                }
            },
            check(){
                if(this.setnumber>=2){
                    this.$message.error('最多开设了两门课程');
                    return;
                }
                if(this.active!=2){
                    this.$message.error('请按步骤填写信息')
                    return;
                }
                this.DialogVisible=true
            },
            addcourse(){
                this.$http.get("/xuanke/Teacher/add.php",{
                    params:{
                        cno:this.$store.state.userId.substring(4)+"0"+(Number(this.setnumber)+1),
                        cname:this.form.cname,
                        limit:this.form.limit,
                        during:this.during,
                        week:this.form.week,
                        date:this.form.date,
                        tno:this.$store.state.userId,
                        roomno:this.roomno,
                    }
                }).then();
                this.DialogVisible=false;
                this.$message({
                    message: '开课成功',
                    type: 'success'
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "../../assets/scss/setupCourse.scss"
</style>