<template>
    <div class="stu">
        <common-table :tableData="tableData" :tableLabel="tableLabel" :selectLabel="selectLabel" :config="config"></common-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CommonTable from '../../components/CommonTable.vue'
    export default {
        components: {
            CommonTable,
        },
        data() {
            return {
                config:{
                    table:'student'
                },
                tableLabel:{
                    sno:'学号',
                    sname:'姓名',
                    ssex:'性别',
                    sphone:'电话号码',
                    sdept:'学院',
                    sclass:'班级'
                },
                selectLabel:[
                    {
                        label:'学号',
                        value:'sno'
                    },
                    {
                        label:'姓名',
                        value:'sname'
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                tableData:'stuData'
            })
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
.stu{
    height: 100%;
}
</style>