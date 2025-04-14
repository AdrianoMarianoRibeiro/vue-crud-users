import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/users",
    name: "UserList",
    component: () => import("@/views/UserListView.vue"),
  },
  {
    path: "/users/create",
    name: "UserCreate",
    component: () => import("@/views/UserCreateView.vue"),
  },
  {
    path: "/users/:id/edit",
    name: "UserEdit",
    component: () => import("@/views/UserEditView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
