import httpRequest from "../httpRequest";

const authService = {
  login: (userName: string, password: string) =>
    httpRequest.post<string>("/login", {
      userName: userName,
      password: password,
    }),
};
export default authService;
