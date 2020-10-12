<template>
    <el-menu router :default-active="menuFirst" background-color="#303133" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item v-for="item in Menu" :index="item.path" :key="item.name">
            <i :class="'el-icon-'+item.icon"></i>
            <span>{{item.label}}</span>
        </el-menu-item>
    </el-menu>
    
</template>

<script>
    export default {
       data() {
           return {
               menuFirst:"",
               Menu:[],
               stuMenu: [
                {
                    path: '/CheckInfo',
                    name: 'CheckInfo',
                    label: '个人信息',
                    icon: 's-custom'
                },
                {
                    path: '/ChooseCourse',
                    name: 'ChooseCourse',
                    label: '选择课程',
                    icon: 'school'
                },
               ],
               teaMenu: [
                {
                    path: '/SetUpCourse',
                    name: 'SetUpCourse',
                    label: '开设课程',
                    icon: 's-custom'
                },
                {
                    path: '/StuInfo',
                    name: 'StuInfo',
                    label: '选课信息',
                    icon: 'school'
                },
               ],
               adminMenu:[
                {
                    path: '/Teacher',
                    name: 'Teacher',
                    label: '教师管理',
                    icon: 's-custom'
                },
                {
                    path: '/Student',
                    name: 'Student',
                    label: '学生管理',
                    icon: 's-custom'
                },
                {
                    path: '/Classroom',
                    name: 'Classroom',
                    label: '教室管理',
                    icon: 's-custom'
                },
                {
                    path: '/Course',
                    name: 'Course',
                    label: '课程管理',
                    icon: 's-custom'
                },
               ]
           }
       },
       methods: {
           getMenu() {
               if(this.$store.state.userType==1){
                   this.Menu=this.stuMenu;
                   this.menuFirst='/CheckInfo';
               }
               else if(this.$store.state.userType==2){
                   this.Menu=this.teaMenu;
                   this.menuFirst='/SetUpCourse';
               }
               else if(this.$store.state.userType==3){
                   this.Menu=this.adminMenu;
                   this.menuFirst='/Teacher';
               }
           }
       },
       mounted () {
           this.getMenu();
       },

    }
</script>

<style lang="scss" scoped>
.el-menu{
    border-right: none;
}
</style>