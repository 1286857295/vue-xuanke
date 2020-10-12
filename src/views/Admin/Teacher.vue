<template>
    <div class="tea">
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
                    table:'teacher'
                },
                tableLabel:{
                    tno:'教师号',
                    tname:'姓名',
                    tsex:'性别',
                    tphone:'电话号码'
                },
                selectLabel:[
                    {
                        label:'教师号',
                        value:'tno'
                    },
                    {
                        label:'姓名',
                        value:'tname'
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                tableData:'teaData'
            })
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
.tea{
    height: 100%;
}
</style>