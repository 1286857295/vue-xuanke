import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/Login/Login.vue")
  },
  {
    path: '/Main',
    name: 'Main',
    component: () => import("../views/Main/Main.vue"),
    children:[
      {
        path: '/CheckInfo',
        name: 'CheckInfo',
        component: () => import("../views/Student/CheckInfo.vue")
      },
      {
        path: '/ChooseCourse',
        name: 'ChooseCourse',
        component: () => import("../views/Student/ChooseCourse.vue")
      },
      {
        path: '/SetUpCourse',
        name: 'SetUpCourse',
        component: () => import("../views/Teacher/SetUpCourse.vue")
      },
      {
        path: '/StuInfo',
        name: 'StuInfo',
        component: () => import("../views/Teacher/StuInfo.vue")
      },

      {
        path: '/Teacher',
        name: 'Teacher',
        component: () => import("../views/Admin/Teacher.vue")
      },
      {
        path: '/Student',
        name: 'Student',
        component: () => import("../views/Admin/Student.vue")
      },
      {
        path: '/Classroom',
        name: 'Classroom',
        component: () => import("../views/Admin/Classroom.vue")
      },
      {
        path: '/Course',
        name: 'Course',
        component: () => import("../views/Admin/Course.vue")
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
