import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { IOnlineUsers } from "../../websocket/param";
import { userContract } from "../../service/contract/user.contract";
import authService from "../../service/auth.service";

interface IAuthContext {
  user: userContract | undefined;
  selectUser: (user: userContract) => void;
  logout: () => void;
  onlineUsers: IOnlineUser;
  updateOnlineUsers: (param: IOnlineUsers) => void;
  login: (userName: string, password: string) => Promise<void>;
}
interface IOnlineUser {
  [userName: string]: string;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userContract>();
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUser>({});

  const updateOnlineUsers = useCallback((param: IOnlineUsers) => {
    setOnlineUsers(param);
  }, []);

  const selectUser = useCallback((user: userContract) => {
    setUser(user);
    // window.sessionStorage.setItem("userId", user.userName);
  }, []);

  const login = useCallback(async (userName: string, password: string) => {
    const response = await authService.login(userName, password);
    const token = response.data;
    if (!token) return;
    window.sessionStorage.setItem("token", token);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    // window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        selectUser,
        logout,
        onlineUsers,
        updateOnlineUsers,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
  selectUser: () => {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
  onlineUsers: {},
  updateOnlineUsers: function (): void {
    throw new Error("Function not implemented.");
  },
  login: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
