import Vue from 'vue'
import Router from 'vue-router'

import userManagerPage from '@/pages/userManagerPage'
import indexContentPage from '@/pages/indexContentPage'
import addressPage from '@/pages/addressPage'
import personalCenter from '@/pages/personalCenter'
import applyActivityPage from '@/pages/applyActivityPage'
import manageActivityPage from '@/pages/manageActivityPage'
import manageDiaryPage from '@/pages/manageDiaryPage'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'indexContentPage', component: indexContentPage},
    {path: '/userManager', name: 'userManagerPage', component: userManagerPage},
    {path: '/personalCenter', name: 'personalCenter', component: personalCenter},
    {path: '/manageActivityPage', name: 'manageActivityPage', component: manageActivityPage},
    {path: '/applyActivityPage', name: 'applyActivityPage', component: applyActivityPage},
    {path: '/manageDiaryPage', name: 'manageDiaryPage', component: manageDiaryPage},


    ],
})
