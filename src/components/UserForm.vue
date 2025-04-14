<template>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="form.name"
        :rules="nameRules"
        label="Nome completo"
        required
      />
  
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="Email"
        required
      />
  
      <v-btn color="primary" @click="onSubmit">Salvar</v-btn>
      <v-btn text @click="onCancel">Cancelar</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
  import { User } from '@/types/user'
  
  @Component
  export default class UserForm extends Vue {
    @Prop({ default: () => ({ name: '', email: '' }) }) readonly user!: User
  
    @Ref('form') readonly formRef!: HTMLFormElement
  
    valid: boolean = false
  
    form: User = {
      name: '',
      email: '',
    }
  
    mounted() {
      this.form = { ...this.user }
    }
  
    get nameRules() {
      return [
        (v: string) => !!v || 'Nome é obrigatório',
        (v: string) =>
          v.trim().split(/\s+/).length >= 3 || 'Nome deve ter pelo menos 3 palavras',
      ]
    }
  
    get emailRules() {
      return [
        (v: string) => !!v || 'Email é obrigatório',
        (v: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Formato de email inválido',
      ]
    }
  
    onSubmit() {
      const formComponent = this.$refs.form as any
      if (formComponent.validate()) {
        this.$emit('submit', this.form)
        
      }
    }
  
    onCancel() {
      this.$emit('cancel')
    }
  }
  </script>
  