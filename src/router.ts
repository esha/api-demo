import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/Hello.vue'
import DevDoc from '@/DevDoc.vue'
import Error404 from '@/Error404.vue'
import StartingDev from '@/StartingDev.vue'
import Bathtime from '@/Bathtime.vue'
import Request from '@/Request.vue'
import Response from '@/Response.vue'

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    { path: '/', component: Hello },
    { path: '/dev', component: DevDoc },
    { path: '/dev/starting', component: StartingDev },
    { path: '/request', component: Request },
    { path: '/response', component: Response },
    { path: '/bathtime', component: Bathtime },
    
    // Always leave this last one
    { path: '*', component: Error404 } // Not found
  ]
})
