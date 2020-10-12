<template>
    <div class="course">
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
                    table:'course'
                },
                tableLabel:{
                    cno:'课程号',
                    cname:'课程名',
                    limit:'限制人数',
                    during:'持续时间',
                    tno:'教师',
                    roomno:'教室',
                    number:'已选人数'
                },
                selectLabel:[
                    {
                        label:'课程号',
                        value:'cno'
                    },
                    {
                        label:'课程名',
                        value:'cname'
                    }
                ]
        
            }
        },
        computed: {
            ...mapState({
                tableData:'courseData'
            })
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
.course{
    height: 100%;
}
</style>