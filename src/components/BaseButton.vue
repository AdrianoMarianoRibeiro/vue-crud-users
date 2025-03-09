<template>
    <button :type="type" :disabled="disabled">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      type: { type: String, default: "button" },
      disabled: Boolean,
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #42b983;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
  </style>
  