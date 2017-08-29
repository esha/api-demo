import Vue from 'vue'
import Router from 'vue-router'
import DevDoc from '@/components/DevDoc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dev',
      name: 'Developer Documentation',
      component: DevDoc
    }
  ]
})
