import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/components/About'
import Resume from '@/components/Resume'
import Builds from '@/components/Builds'
import Projects from '@/components/Projects'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/builds',
      name: 'Builds',
      component: Builds
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
  ]
})
