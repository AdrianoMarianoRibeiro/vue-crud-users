<template>
    <div>
      <h2>Cadastrar Usuário</h2>
      <form @submit.prevent="addUser">
        <input v-model="name" placeholder="Nome" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
      };
    },
    methods: {
      ...mapActions("users", ["createUser"]),
      addUser() {
        if (this.name.split(" ").length < 3) {
          alert("O nome precisa ter pelo menos 3 palavras.");
          return;
        }
        this.createUser({ name: this.name, email: this.email });
        this.name = "";
        this.email = "";
        this.$router.push("/users");
      },
    },
  };
  </script>
  