<template>
  <div>
    <h1>Events</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Previous Page
      <template v-if="hasNextPage"> | </template>
      </router-link>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'
import store from '@/store/index'

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  store.dispatch('event/fetchEvents', {
    page: currentPage
  }).then(() => {
    to.params.page = currentPage
    next()
  })
}

export default {
  components: { EventCard },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page 
    })
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'user'])
  }
}
</script>

<style scoped>
a { 
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none; 
}
</style>