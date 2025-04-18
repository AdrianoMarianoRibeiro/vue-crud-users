import Vue from "vue";
import Vuex from "vuex";
import { users, UsersState } from "./modules/user";

Vue.use(Vuex);

export interface RootState {
  users: UsersState;
}

export default new Vuex.Store<RootState>({
  modules: {
    users,
  },
});
