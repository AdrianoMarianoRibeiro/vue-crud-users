import api from "@/plugins/api";
import { User } from "@/types/user";

export default {
  getAll() {
    return api.get<User[]>("/user");
  },
  create(user: User) {
    return api.post<User>("/user", user);
  },
  update(id: string, user: User) {
    return api.patch<User>(`/user/${id}`, user);
  },
  getById(id: string) {
    return api.get<User>(`/user/${id}`);
  },
  delete(id: string) {
    return api.delete(`/user/${id}`);
  },
};
