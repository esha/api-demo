import DevDoc from '@/components/DevDoc';
import Home from '@/components/Home';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

/* tslint:disable:object-literal-sort-keys */
/* because logical order is more sensible here */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Genesis API Demo',
      component: Home
    },
    {
      path: '/dev',
      name: 'Developer Documentation',
      component: DevDoc
    }
  ]
})
