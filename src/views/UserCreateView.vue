<template>
  <v-container>
    <UserForm @submit="create" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';
import UserForm from '@/components/UserForm.vue';

@Component({
  components: {
    UserForm,
  },
})
export default class UserCreateView extends Vue {
  // Função chamada ao enviar o formulário
  async create(user: User) {
    try {
      // Chama a action createUser da store para salvar o usuário
      await this.$store.dispatch('users/createUser', user);
      // Redireciona para a lista de usuários após o sucesso
      this.$router.push('/users');
    } catch (error) {
      // Lida com o erro, por exemplo, mostrando um alerta de falha
      console.error('Failed to create user:', error);
      // Você pode mostrar uma mensagem de erro para o usuário, por exemplo
    }
  }
}
</script>
