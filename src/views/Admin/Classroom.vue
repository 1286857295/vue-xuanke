<template>
    <div class="room">
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
                    table:'classroom'
                },
                tableLabel:{
                    roomno:'教室号',
                    contain:'容纳人数'
                },
                selectLabel:[
                    {
                        label:'教室号',
                        value:'roomno'
                    },
                    {
                        label:'容纳人数',
                        value:'roomname'
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                tableData:'roomData'
            })
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
.room{
    height: 100%;
}
</style>