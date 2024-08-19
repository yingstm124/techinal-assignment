import { jwtDecode } from "jwt-decode";

export const getName = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.name;
  } catch (err) {
    return null;
  }
};
