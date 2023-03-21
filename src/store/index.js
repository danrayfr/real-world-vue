import { createStore } from 'vuex'
import EventService from '@/services/EventService'

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
    events: [],
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
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({commit}, event) {
      return EventService.postEvent(event).then(()=> {
        commit('ADD_EVENT', event) 
      })
    }
  },
  modules: {
  }
})
