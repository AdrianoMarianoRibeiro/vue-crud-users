<template>
    <v-container>
      <v-card>
        <v-card-title>Editar Usuário</v-card-title>
        <v-card-text>
          <UserForm v-if="user" :user="user" @submit="update" @cancel="cancel" />
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { User } from '@/types/user'
  import userApi from '@/api/users'
  import { mapActions } from 'vuex'
  import UserForm from '@/components/UserForm.vue'
  
  @Component({
    components: { UserForm },
    methods: {
      ...mapActions('users', ['updateUser']),
    },
  })
  export default class UserEditView extends Vue {
    user: User | null = null
  
    async mounted() {
      const { id } = this.$route.params
      const { data } = await userApi.getById(id)
      this.user = data
    }
  
    async update(user: User) {
      await this.updateUser(user)
      this.$router.push('/users')
    }
  
    cancel() {
      this.$router.push('/users')
    }
  
    updateUser!: (user: User) => Promise<void>
  }
  </script>
  