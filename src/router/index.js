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



Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'indexContentPage', component: indexContentPage},
    {path: '/userManager', name: 'userManagerPage', component: userManagerPage},
    {path: '/personalCenter', name: 'personalCenter', component: personalCenter},
    {path: '/manageActivityPage', name: 'manageActivityPage', component: manageActivityPage},
    {path: '/applyActivityPage', name: 'applyActivityPage', component: applyActivityPage},
    {path: '/manageDiaryPage', name: 'manageDiaryPage', component: manageDiaryPage},
    {path: '/applyRecipientPage', name: 'applyRecipientPage', component: applyRecipientPage},
    {path: '/lookActivityInfo', name: 'lookActivityInfo', component: lookActivityInfo},
    {path: '/progressPage', name: 'progressPage', component: progressPage},
    {path: '/lookDiaryPage', name: 'lookDiaryPage', component: lookDiaryPage},
    {path: '/manageParticipantPage', name: 'manageParticipantPage', component: manageParticipantPage},
    {path: '/manageRecipentPage', name: 'manageRecipentPage', component: manageRecipentPage},
    {path: '/LookRecipientInfo', name: 'LookRecipientInfo', component: LookRecipientInfo},
    {path: '/manageFinancePage', name: 'manageFinancePage', component: manageFinancePage},
    {path: '/ActivityCharPage', name: 'ActivityCharPage', component: ActivityCharPage},


  ],
})
