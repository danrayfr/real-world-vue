<template>
  <div class="field">
    <label v-if="label"> {{ label }}</label>
    <input @input="updateValue" :value="modelValue" :type="type" :placeholder="placeholder" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
    }, 
    placeholder: {
      type: String, 
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  } 
}
</script>

<style scoped>

</style>
