import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import EventCreate from '@/views/EventCreate'
import NProgress from 'nprogress'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
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
    }
  },

  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
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