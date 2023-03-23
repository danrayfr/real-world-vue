<template>
  <div>
    <h1>Create an Event</h1>
    <p v-if="v$.$error" class="errorMessage">Please fill out the required field(s).</p>
    <form @submit.prevent="createEvent">
      <BaseSelect 
        label="Select a category" 
        :options="categories" 
        v-model="event.category"
        :class="{ error: v$.event.category.$error }" 
        @blur="v$.event.category.$touch()"
      />
      <div v-if="v$.event.category.$error">
        <p v-if="!v$.event.category.required.invalid" class="errorMessage">Category is required.</p>
      </div>

      <h3>Name & describe your event</h3>
      <BaseInput 
        v-model="event.title" 
        label="Title" 
        type="text" 
        placeholder="Add title" 
        :class="{ error: v$.event.title.$error }" 
        @blur="v$.event.title.$touch()"
        />
      <div v-if="v$.event.title.$error">
        <p v-if="!v$.event.title.required.invalid" class="errorMessage">title is required.</p>
      </div>

      <BaseInput 
        v-model="event.description" 
        label="Description" 
        type="text" 
        placeholder="Add a description" 
        :class="{ error: v$.event.description.$error }" 
        @blur="v$.event.description.$touch()"
      />
      <div v-if="v$.event.description.$error">
        <p v-if="!v$.event.description.required.invalid" class="errorMessage">description is required.</p>
      </div>

      <BaseInput 
        v-model="event.location" 
        label="Location" 
        type="text" 
        placeholder="Add a location" 
        :class="{ error: v$.event.location.$error }" 
        @blur="v$.event.location.$touch()"
      />
      <div v-if="v$.event.location.$error">
        <p v-if="!v$.event.location.required.invalid" class="errorMessage">location is required.</p>
      </div>
      
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker :modelValue="dateObject" @update:modelValue="event.date = $event.toISOString().slice(0, 10)" placeholder="Select a date" :error="{ error: v$.event.date.$error}" @blur="v$.event.date.$touch()"/>
      </div>
      <div v-if="v$.event.date.$error">
        <p v-if="!v$.event.date.required.invalid" class="errorMessage">date is required.</p>
      </div>

      <BaseSelect 
        label="Select a time" 
        :options="times" 
        v-model="event.time"
        :class="{ error: v$.event.time.$error }" 
        @blur="v$.event.time.$touch()"
      />
      <div v-if="v$.event.time.$error">
        <p v-if="!v$.event.time.required.invalid" class="errorMessage">Time is required.</p>
      </div>

      <BaseButton type="submit" buttonClass="-fill-gradient" :disabled="v$.$error">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import NProgress from 'nprogress'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import BaseButton from '@/components/BaseButton'
export default {
  components: { Datepicker, BaseInput, BaseSelect, BaseButton },
  setup() {
    return { v$: useVuelidate() }
  },
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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
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
      this.v$.$touch() 
      if(!this.v$.$invalid) {
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
      }
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