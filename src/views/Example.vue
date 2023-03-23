<template>
  <div>
    <form @submit.prevent="submit">
      <input type="email" placeholder="enter your email" v-model="email" @blur="v$.email.$touch()" :class="{error: v$.email.$error}">
      
      <div v-if="v$.email.$error">
        <p v-if="!v$.email.invalid" class="errorMessage">Please enter a valid email.</p>
        <p v-if="!v$.email.required.invalid" class="errorMessage">Email is required.</p>
      </div>
      <button :disabled="v$.$invalid" type="submit">Submit</button>
      <p v-if="v$.$error" class="errorMessage">Please fill out the required fields.</p>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return { 
      email: null
    }
  },
  validations: {
    email: {
      email,
      required
    }
  },
  methods: {
    submit() {
      this.v$.$touch() 
      if(!this.v$.$invalid) { 
        console.log('Form submitted', this.email)
      }
    }
  }
}
</script>

<style scoped>
button[disabled] { 
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed !important;
}
</style>