<template>
    <v-container>
      <v-card>
        <v-card-title>Criar Usuário</v-card-title>
        <v-card-text>
          <UserForm @submit="create" @cancel="cancel" />
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { User } from '@/types/user'
  import { mapActions } from 'vuex'
  import UserForm from '@/components/UserForm.vue'
  
  @Component({
    components: { UserForm },
    methods: {
      ...mapActions('users', ['createUser']),
    },
  })
  export default class UserCreateView extends Vue {
    async create(user: User) {
      await this.createUser(user)
      this.$router.push('/users')
    }
  
    cancel() {
      this.$router.push('/users')
    }
  
    createUser!: (user: User) => Promise<void>
  }
  </script>
  