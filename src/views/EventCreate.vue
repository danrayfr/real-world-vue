<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect label="Select a category" :options="categories" v-model="event.category"/>
      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title" label="Title" type="text" placeholder="Add title" />
      <BaseInput v-model="event.description" label="Description" type="text" placeholder="Add a description" />
      <BaseInput v-model="event.location" label="Location" type="email" placeholder="Add a location" />
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker :modelValue="dateObject" @update:modelValue="event.date = $event.toISOString().slice(0, 10)" placeholder="Select a date"/>
      </div>

      <BaseSelect label="Select a time" :options="times" v-model="event.time"/>
      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import NProgress from 'nprogress'
export default {
  components: { Datepicker, BaseInput, BaseSelect },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) { 
      times.push(i + ':00')
    }
    return { 
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  computed: {
    dateObject: {
      get() {
        return this.event.date ? new Date(this.event.date) : null;
      },
      set(value) {
        this.event.date = value.toISOString().slice(0, 10);
      },
    },
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
            })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>