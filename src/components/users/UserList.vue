<template>
    <div>
      <h2>Lista de Usuários</h2>
      <button @click="fetchUsers">Carregar Usuários</button>
  
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
          <button @click="deleteUser(user.id)">Excluir</button>
        </li>
      </ul>
      <p v-else>Nenhum usuário encontrado.</p>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    computed: {
      ...mapState("users", ["users"]),
    },
    methods: {
      ...mapActions("users", ["fetchUsers", "deleteUser"]),
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  