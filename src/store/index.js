import { createStore } from 'vuex'
import * as user from '@/store/modules/user'
import * as event from '@/store/modules/event'

export default createStore({
  state: {
    categories: [
      'consistency',
      'nature',
      'housing',
      'education',
      'food',
      'community',
      'open-source'
    ],
  },
  modules: {
    user,
    event
  }
})
