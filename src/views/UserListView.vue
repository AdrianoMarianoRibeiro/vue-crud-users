<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <h1>Usuários</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="goToCreate">
          <v-icon left>mdi-plus</v-icon>
          Novo Usuário
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editUser(item.id)" v-bind="attrs" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="confirmDeleteUser(item.id)" v-bind="attrs" v-on="on">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Excluir</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <!-- Modal de confirmação -->
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline" style="background-color: #f44336; color: white; text-align: center;">
          <v-icon left>mdi-alert-circle</v-icon> Excluir Usuário
        </v-card-title>
        <v-card-text class="text-center">
          Tem certeza de que deseja excluir este usuário?
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="grey"
            text
            @click="deleteDialog = false"
            style="border-radius: 20px; padding: 8px 16px; margin-right: 10px;"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red"
            @click="deleteUser"
            style="border-radius: 20px; padding: 8px 16px; margin-left: 10px;"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';

@Component
export default class UserListView extends Vue {
  headers = [
    { text: 'Nome', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Ações', value: 'actions', sortable: false },
  ];

  // Estado do modal de exclusão
  deleteDialog: boolean = false;
  userIdToDelete: string = '';

  get users(): User[] {
    return this.$store.state.users.users;
  }

  get loading(): boolean {
    return this.$store.state.users.loading;
  }

  mounted() {
    this.$store.dispatch('users/fetchUsers');
  }

  editUser(id: string) {
    this.$router.push(`/users/${id}/edit`);
  }

  // Método para mostrar o modal de confirmação antes de excluir
  confirmDeleteUser(id: string) {
    this.userIdToDelete = id;
    this.deleteDialog = true;  // Exibe o modal
  }

  // Método para excluir o usuário
  deleteUser() {
    this.$store.dispatch('users/deleteUser', this.userIdToDelete)
      .then(() => {
        this.deleteDialog = false;  // Fecha o modal
      })
      .catch((error) => {
        console.error('Erro ao excluir usuário:', error);
        this.deleteDialog = false;  // Fecha o modal
      });
  }

  goToCreate() {
    this.$router.push('/users/create');
  }
}
</script>

<style scoped>
.v-dialog .v-card {
  border-radius: 8px;
}
</style>
