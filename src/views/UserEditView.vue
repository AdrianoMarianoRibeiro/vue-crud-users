<template>
  <v-container>
    <UserForm v-if="user" :user="user" @submit="update" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserForm from '@/components/UserForm.vue';
import { User } from '@/types/user';
import userApi from '@/services/userApi';

@Component({
  components: { UserForm }
})
export default class UserEditView extends Vue {
  user: User | null = null;

  async mounted() {
    const { id } = this.$route.params;
    const { data } = await userApi.getById(id);
    this.user = data;
  }

  async update(user: User) {
    await this.$store.dispatch('users/updateUser', user);
    this.$router.push('/users');
  }
}
</script>
