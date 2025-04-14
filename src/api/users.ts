// src/api/users.ts
import axios from "axios";
import { User } from "@/types/user";

const api = axios.create({
  baseURL: "https://sua-api.com/api", // troque pela URL real
});

export default {
  getAll(): Promise<User[]> {
    return api.get("/users");
  },
  getById(id: string): Promise<User> {
    return api.get(`/users/${id}`);
  },
  create(user: User): Promise<User> {
    return api.post("/users", user);
  },
  update(id: string, user: User): Promise<User> {
    return api.put(`/users/${id}`, user);
  },
  delete(id: string): Promise<void> {
    return api.delete(`/users/${id}`);
  },
};
