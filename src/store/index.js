import { createStore } from 'vuex'

export default createStore({
  state: {
    user: { id: '1', name: 'Dan Ray Rollan'},
    categories: [
      'consistency',
      'nature',
      'housing',
      'education',
      'food',
      'community',
      'open-source'
    ],
    events: [
      { id: 1, title: '...', organizer: '...'},
      { id: 2, title: '...', organizer: '...'},
      { id: 3, title: '...', organizer: '...'},
      { id: 4, title: '...', organizer: '...'},
    ]
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
