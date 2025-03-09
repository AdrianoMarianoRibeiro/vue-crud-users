import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router"; // Importando o Vue Router

Vue.config.productionTip = false;

new Vue({
  store,
  router, // Adicionando o Vue Router
  render: (h) => h(App),
}).$mount("#app");
