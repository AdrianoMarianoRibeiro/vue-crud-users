<template>
    <div>
      <h1>Usuários</h1>
      <router-link to="/users/new">Adicionar Usuário</router-link>
      <UserList />
    </div>
  </template>
  
  <script>
  import UserList from "../components/users/UserList.vue";
  
  export default {
    components: {
      UserList,
    },
  };
  </script>
  