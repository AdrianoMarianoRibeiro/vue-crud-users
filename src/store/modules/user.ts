import { Module } from "vuex";
import { RootState } from "@/store";
import { User } from "@/types/user";
import userApi from "@/services/userApi";

export interface UsersState {
  users: User[];
  loading: boolean;
}

export const users: Module<UsersState, RootState> = {
  namespaced: true,

  state: {
    users: [],
    loading: false,
  },

  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
    },
    addUser(state, user: User) {
      state.users.push(user);
    },
    updateUser(state, updatedUser: User) {
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) state.users.splice(index, 1, updatedUser);
    },
    removeUser(state, id: string) {
      state.users = state.users.filter((u) => u.id !== id);
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      commit("setLoading", true);
      const { data } = await userApi.getAll();
      commit("setUsers", data);
      commit("setLoading", false);
    },

    async createUser({ commit }, user: User) {
      const { data } = await userApi.create(user);
      commit("addUser", data);
    },

    async updateUser({ commit }, user: User) {
      const { data } = await userApi.update(user.id!, user);
      commit("updateUser", data);
    },

    async deleteUser({ commit }, id: string) {
      await userApi.delete(id);
      commit("removeUser", id);
    },
  },
};
