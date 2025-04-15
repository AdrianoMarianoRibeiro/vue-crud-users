// src/api/users.ts
import { User } from "@/types/user";
import api from "@/plugins/api"; // importa o axios global

export default {
  getAll(): Promise<User[]> {
    return api.get("/user");
  },
  getById(id: string): Promise<User> {
    return api.get(`/user/${id}`);
  },
  create(user: User): Promise<User> {
    return api.post("/user", user);
  },
  update(id: string, user: User): Promise<User> {
    return api.patch(`/user/${id}`, user);
  },
  delete(id: string): Promise<void> {
    return api.delete(`/user/${id}`);
  },
};
