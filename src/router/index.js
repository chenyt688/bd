import Vue from 'vue'
import Router from 'vue-router'

import userManagerPage from '@/pages/userManagerPage'
import indexContentPage from '@/pages/indexContentPage'
import personalCenter from '@/pages/personalCenter'
import applyActivityPage from '@/pages/applyActivityPage'
import manageActivityPage from '@/pages/manageActivityPage'
import manageDiaryPage from '@/pages/manageDiaryPage'
import applyRecipientPage from '@/pages/applyRecipientPage'
import lookActivityInfo from '@/components/activity/LookActivityInfo'
import progressPage from '@/pages/progressPage'
import lookDiaryPage from '@/pages/lookDiaryPage'
import manageParticipantPage from '@/pages/manageParticipantPage'
import manageRecipentPage from '@/pages/manageRecipentPage'
import LookRecipientInfo from '@/components/recipient/LookRecipientInfo'
import manageFinancePage from '@/pages/manageFinancePage'
import ActivityCharPage from '@/pages/ActivityCharPage'
import PictureShowPage from '@/pages/PictureShowPage'


Vue.use(Router)



export default new Router({
  mode:'history',
  routes: [
    {path: '/', name: 'indexContentPage', component: indexContentPage,meta:{requireAuth: false}},
    {path: '/userManager', name: 'userManagerPage', component: userManagerPage,meta:{requireAuth:true}},
    {path: '/personalCenter', name: 'personalCenter', component: personalCenter,meta:{requireAuth: false}},
    {path: '/manageActivityPage', name: 'manageActivityPage', component: manageActivityPage,meta:{requireAuth: false}},
    {path: '/applyActivityPage', name: 'applyActivityPage', component: applyActivityPage,meta:{requireAuth: false}},
    {path: '/manageDiaryPage', name: 'manageDiaryPage', component: manageDiaryPage,meta:{requireAuth: false}},
    {path: '/applyRecipientPage', name: 'applyRecipientPage', component: applyRecipientPage,meta:{requireAuth: false}},
    {path: '/lookActivityInfo', name: 'lookActivityInfo', component: lookActivityInfo,meta:{requireAuth: false}},
    {path: '/progressPage', name: 'progressPage', component: progressPage,meta:{requireAuth: false}},
    {path: '/lookDiaryPage', name: 'lookDiaryPage', component: lookDiaryPage,meta:{requireAuth: false}},
    {path: '/manageParticipantPage', name: 'manageParticipantPage', component: manageParticipantPage,meta:{requireAuth: false}},
    {path: '/manageRecipentPage', name: 'manageRecipentPage', component: manageRecipentPage,meta:{requireAuth: false}},
    {path: '/LookRecipientInfo', name: 'LookRecipientInfo', component: LookRecipientInfo,meta:{requireAuth: false}},
    {path: '/manageFinancePage', name: 'manageFinancePage', component: manageFinancePage,meta:{requireAuth: false}},
    {path: '/ActivityCharPage', name: 'ActivityCharPage', component: ActivityCharPage,meta:{requireAuth: false}},
    {path: '/PictureShowPage', name: 'PictureShowPage', component: PictureShowPage,meta:{requireAuth: false}},
  ],

})


