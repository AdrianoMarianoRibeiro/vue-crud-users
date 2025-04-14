<!-- src/views/UserListView.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>
          Usuários
          <v-spacer />
          <v-btn color="primary" @click="goToCreate">Novo Usuário</v-btn>
        </v-card-title>
  
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          loading-text="Carregando..."
          class="elevation-1"
          item-key="id"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editUser(item.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteUser(item.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { mapState, mapActions } from 'vuex'
  import { User } from '@/types/user'
  
  @Component({
    computed: {
      ...mapState('users', ['users', 'loading']),
    },
    methods: {
      ...mapActions('users', ['fetchUsers']),
    },
  })
  export default class UserListView extends Vue {
    headers = [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Ações', value: 'actions', sortable: false },
    ]
  
    get users(): User[] {
      return []
    }
  
    get loading(): boolean {
      return false
    }
  
    async mounted() {
      await this.fetchUsers()
    }
  
    fetchUsers!: () => Promise<void>
  
    goToCreate() {
      this.$router.push('/users/create')
    }
  
    editUser(id: string) {
      this.$router.push(`/users/${id}/edit`)
    }
  
    deleteUser(id: string) {
      // Você pode abrir um diálogo de confirmação aqui
      console.log('Deletar usuário', id)
    }
  }
  </script>
  