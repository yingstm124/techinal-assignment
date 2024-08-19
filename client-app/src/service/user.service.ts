import httpRequest from "../httpRequest";
import { userContract } from "./contract/user.contract";

const userService = {
  getUsers: () => httpRequest.get<userContract[]>(`/users`),
};
export default userService;
