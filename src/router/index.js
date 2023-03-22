import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import EventCreate from '@/views/EventCreate'
import NProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '@/views/NotFound'
import NetWorkIssue from '@/views/NetworkIssue'

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('event/fetchEvent', to.params.id).then(event => {
        to.params.event = event
        next()
      })
      .catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name:'404', params: { resource: 'event'} })
        } else { 
          next({ name: 'network-issue' })
        }
      })
    
    }
  },

  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404/:resource',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetWorkIssue
  }, 
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: '404', params: { resource: 'page'}}, 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router