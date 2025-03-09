<template>
    <div class="input-group">
      <label v-if="label">{{ label }}</label>
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
      />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String,
      label: String,
      type: { type: String, default: "text" },
      placeholder: String,
      errorMessage: String,
    },
    computed: {
      inputValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .error {
    color: red;
    font-size: 12px;
  }
  </style>
  