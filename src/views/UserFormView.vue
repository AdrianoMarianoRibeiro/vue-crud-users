<template>
    <div>
      <h1>Novo Usuário</h1>
      <router-link to="/users">Voltar</router-link>
      <UserForm />
    </div>
  </template>
  
  <script>
  import UserForm from "../components/users/UserForm.vue";
  
  export default {
    components: {
      UserForm,
    },
  };
  </script>
  