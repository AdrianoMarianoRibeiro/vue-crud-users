const state = {
    users: [],
  };
  
  const mutations = {
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
  };
  
  const actions = {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch("https://api.example.com/users");
        const users = await response.json();
        commit("SET_USERS", users);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
  
    async createUser({ commit }, user) {
      try {
        const response = await fetch("https://api.example.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const newUser = await response.json();
        commit("ADD_USER", newUser);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
      }
    },
  
    async deleteUser({ commit }, userId) {
      try {
        await fetch(`https://api.example.com/users/${userId}`, {
          method: "DELETE",
        });
        commit("DELETE_USER", userId);
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
      }
    },
  };
  
  const getters = {
    getUsers: (state) => state.users,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  