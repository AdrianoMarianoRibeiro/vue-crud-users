import Vue from 'vue';
import Router from 'vue-router';

import UserListView from '@/views/UserListView.vue';
import UserCreateView from '@/views/UserCreateView.vue';
import UserEditView from '@/views/UserEditView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'UserList',
      component: UserListView,
    },
    {
      path: '/users/create',
      name: 'UserCreate',
      component: UserCreateView,
    },
    {
      path: '/users/:id/edit',
      name: 'UserEdit',
      component: UserEditView,
      props: true,
    },
    {
      path: '*',
      redirect: '/users',
    },
  ],
});
