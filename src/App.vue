<template>
  <v-app>
    <navigation-default />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import NavigationDefault from '@/components/NavigationDefault.vue'
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
    NavigationDefault
  }
});
</script>
