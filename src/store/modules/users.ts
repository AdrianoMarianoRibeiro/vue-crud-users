// src/store/modules/users.ts
import { Module } from "vuex";
import { RootState } from "../index";
import { User } from "@/types/user";
import userApi from "@/api/users";

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
    updateUser(state, updated: User) {
      const index = state.users.findIndex((u) => u.id === updated.id);
      if (index !== -1) state.users.splice(index, 1, updated);
    },
    deleteUser(state, id: string) {
      state.users = state.users.filter((u) => u.id !== id);
    },
    setLoading(state, value: boolean) {
      state.loading = value;
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
      commit("deleteUser", id);
    },
  },

  getters: {
    allUsers(state): User[] {
      return state.users;
    },
    isLoading(state): boolean {
      return state.loading;
    },
  },
};
