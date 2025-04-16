<template>
  <div>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark elevation="4">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none">
          <v-icon left>mdi-account-supervisor</v-icon>
          Gerenciamento de Usuários
        </router-link>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <!-- Botões de ação rápida na barra superior -->
      <v-btn
        icon
        title="Ajuda"
        @click="showHelp"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      
      <v-btn
        icon
        title="Alternar tema"
        @click="toggleTheme"
      >
        <v-icon>{{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar melhorada -->
    <v-navigation-drawer 
      v-model="drawer" 
      app
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      :mini-variant="miniVariant"
      :width="240"
      class="sidebar-custom"
      :class="{'sidebar-dark': $vuetify.theme.dark}"
    >
      <!-- Cabeçalho da sidebar -->
      <v-list-item class="px-2 sidebar-header">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h6">Admin</v-list-item-title>
          <v-list-item-subtitle>Painel de Controle</v-list-item-subtitle>
        </v-list-item-content>
        
        <v-btn
          icon
          @click.stop="miniVariant = !miniVariant"
          v-if="$vuetify.breakpoint.mdAndUp"
          :title="miniVariant ? 'Expandir menu' : 'Recolher menu'"
        >
          <v-icon>{{ miniVariant ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Barra de pesquisa -->
      <div class="px-2 pt-2 pb-2" v-if="!miniVariant">
        <v-text-field
          dense
          label="Pesquisar"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          filled
          rounded
        ></v-text-field>
      </div>

      <v-divider class="mt-2"></v-divider>

      <!-- Menu de navegação -->
      <v-list dense nav>
        <div class="pa-2 caption text-uppercase grey--text" v-if="!miniVariant">Principal</div>
        
        <!-- Item Home -->
        <v-list-item to="/" exact>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2 caption text-uppercase grey--text" v-if="!miniVariant">Gerenciamento</div>
        
        <!-- Menu Usuários com submenus -->
        <v-list-group
          prepend-icon="mdi-account"
          :value="true"
          active-class="active-menu"
        >
          <template v-slot:activator>
            <v-list-item-title>Usuários</v-list-item-title>
          </template>

          <!-- Submenu Listar -->
          <v-list-item to="/users" class="ml-2">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Listar</v-list-item-title>
            </v-list-item-content>
            <v-chip x-small color="info" class="ml-1" v-if="!miniVariant">Novo</v-chip>
          </v-list-item>

          <!-- Submenu Cadastrar -->
          <v-list-item to="/users/create" class="ml-2">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cadastrar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        
        <!-- Exemplo de outro grupo de menu -->
        <v-list-group
          prepend-icon="mdi-cog"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title>Configurações</v-list-item-title>
          </template>

          <v-list-item to="/settings/profile" class="ml-2">
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/settings/system" class="ml-2">
            <v-list-item-icon>
              <v-icon>mdi-tune</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sistema</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- Footer da sidebar -->
      <template v-slot:append>
        <div class="pa-2">
          <v-divider></v-divider>
          <v-list-item two-line class="mt-2">
            <v-list-item-avatar>
              <v-icon color="grey">mdi-information-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Status</v-list-item-title>
              <v-list-item-subtitle class="success--text">Online</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
          <v-btn block color="primary" outlined class="mt-2" v-if="!miniVariant">
            <v-icon left>mdi-logout</v-icon>
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Modal de Ajuda -->
    <v-dialog v-model="helpDialog" max-width="600">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left color="white">mdi-help-circle</v-icon>
          Ajuda
        </v-card-title>
        
        <v-card-text class="pa-4">
          <h3 class="subtitle-1 font-weight-bold mb-2">Bem-vindo ao Sistema de Gerenciamento de Usuários</h3>
          
          <v-divider class="mb-3"></v-divider>
          
          <p>Este sistema permite gerenciar usuários através das seguintes funcionalidades:</p>
          
          <v-list-item two-line>
            <v-list-item-icon>
              <v-icon color="primary">mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Listar Usuários</v-list-item-title>
              <v-list-item-subtitle>Visualize todos os usuários cadastrados no sistema</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
          <v-list-item two-line>
            <v-list-item-icon>
              <v-icon color="primary">mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cadastrar Usuários</v-list-item-title>
              <v-list-item-subtitle>Adicione novos usuários ao sistema</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            text 
            @click="helpDialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavigationDefault',
  data() {
    return {
      drawer: true,
      miniVariant: false,
      helpDialog: false  // Nova variável para controlar o modal
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark.toString());
    },
    showHelp() {
      this.helpDialog = true;
    }
  },
  created() {
    // Em dispositivos móveis, a sidebar começa fechada
    this.drawer = this.$vuetify.breakpoint.mdAndUp;
    
    // Carregar tema escuro se estiver salvo
    const darkTheme = localStorage.getItem('darkTheme');
    if (darkTheme) {
      this.$vuetify.theme.dark = darkTheme === 'true';
    }
  }
});
</script>

<style scoped>
.sidebar-custom .v-list-item--active {
  background-color: rgba(var(--v-primary-base), 0.1);
  border-left: 3px solid var(--v-primary-base);
}

.sidebar-header {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.sidebar-dark .sidebar-header {
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

.active-menu {
  background-color: rgba(var(--v-primary-base), 0.05);
}
</style>