import Vue from "vue";
import VueRouter from "vue-router";
import UserListView from "./views/UserListView.vue";
import UserFormView from "./views/UserFormView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/users" },
  { path: "/users", component: UserListView },
  { path: "/users/new", component: UserFormView },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
