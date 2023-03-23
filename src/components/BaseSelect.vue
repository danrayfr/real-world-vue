<template>
  <div class="field">
    <label v-if="label"> {{ label }}</label>
    <select @change="updateValue" :value="modelValue" v-bind="$attrs">
      <option 
        v-for="option in options" 
        :value="option"
        :key="option"
        :selected="option === value"
        >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: { 
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
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