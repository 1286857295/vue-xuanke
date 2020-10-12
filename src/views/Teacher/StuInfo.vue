<template>
    <div class="info">
        <el-card shadow="hover" v-for="item in cname" :key="item.name">
            <p>{{item.name}}</p>
            <el-table :data="tableData">
                <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label"></el-table-column>
            </el-table>
            <el-button type="success">导出excel</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cname:[
                    {
                        name:"马克思主义",
                        cno:""
                    },
                    {
                        name:"社会主义",
                        cno:""
                    },
                ],
                tableData: [],
                tableLabel:[
                    {
                        prop:"sno",
                        label:"学号"
                    },
                    {
                        prop:"sname",
                        label:"姓名"
                    },
                    {
                        prop:"ssex",
                        label:"性别"
                    },
                    {
                        prop:"sdept",
                        label:"学院"
                    },
                    {
                        prop:"sclass",
                        label:"班级"
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
.info{
    height: 100%;
    overflow: auto;
    .el-card{
        height: 100%;
        position:relative;
        .el-table{
            height: 90%;
        }
        .el-button{
            position: absolute;
            bottom: 30px;
            right: 50px;
        }
    }
    
}
</style>