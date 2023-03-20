import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import EventCreate from '@/views/EventCreate'

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
    props: true
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

export default router