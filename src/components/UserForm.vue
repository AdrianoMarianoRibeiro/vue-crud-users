<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-text-field
      v-model="localUser.name"
      label="Nome"
      required
      :rules="[rules.required, rules.minLength]"
      :error-messages="nameErrors"
      @blur="validateField('name')"  
    ></v-text-field>
    
    <v-text-field
      v-model="localUser.email"
      label="Email"
      required
      :rules="[rules.required, rules.email]"
      :error-messages="emailErrors"
      @blur="validateField('email')" 
    ></v-text-field>

    <v-btn type="submit" color="primary">Salvar</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';

@Component
export default class UserForm extends Vue {
  @Prop({ default: () => ({ name: '', email: '' }) })
  readonly user!: User;

  localUser: User = { name: '', email: '' };

  // Erros específicos para cada campo
  nameErrors: string[] = [];
  emailErrors: string[] = [];

  rules = {
    required: (value: string) => !!value || 'Este campo é obrigatório.',
    // Alteração na validação para verificar 3 palavras e não 3 caracteres
    minLength: (value: string) => value.trim().length >= 3 || 'O nome deve ter pelo menos 3 letras.',
    email: (value: string) => /.+@.+\..+/.test(value) || 'Email inválido.',
  };

  get editing() {
    return !!this.user?.id;
  }

  mounted() {
    if (this.editing) {
      this.localUser = { ...this.user };
    }
  }

  // Validação dos campos ao perder o foco
  validateField(field: string) {
    let errors: string[] = [];
    if (field === 'name') {
      if (!this.localUser.name) {
        errors.push('Este campo é obrigatório.');
      } else if (this.localUser.name.trim().length < 3) {
        errors.push('O nome deve ter pelo menos 3 palavras.');
      }
      this.nameErrors = errors;
    } else if (field === 'email') {
      if (!this.localUser.email) {
        errors.push('Este campo é obrigatório.');
      } else if (!/.+@.+\..+/.test(this.localUser.email)) {
        errors.push('Email inválido.');
      }
      this.emailErrors = errors;
    }
  }

  // Função para validar o formulário somente no submit
  submitForm() {
    const form = this.$refs.form as any;

    // A chamada de validate() ocorre somente quando o formulário for submetido
    const isValid = form.validate();

    // Se o formulário for válido, emite os dados
    if (isValid) {
      this.$emit('submit', this.localUser);
    } else {
      console.log('Formulário inválido, não foi enviado');
    }
  }
}
</script>
