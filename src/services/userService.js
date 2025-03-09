import axios from "axios";

const api = axios.create({ baseURL: "https://api.example.com/users" });

export default {
  getAll() {
    return api.get("/").then(res => res.data);
  },
  create(user) {
    return api.post("/", user);
  },
  update(id, user) {
    return api.put(`/${id}`, user);
  },
  delete(id) {
    return api.delete(`/${id}`);
  },
};
