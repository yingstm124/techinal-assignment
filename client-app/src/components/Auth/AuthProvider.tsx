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
import { getName } from "../../helper/getUserNameJWT";
import { socket } from "../../websocket/socket";

interface IAuthContext {
  user: userContract | undefined;
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
    console.log("online user");
    setOnlineUsers(param);
  }, []);

  const login = useCallback(async (userName: string, password: string) => {
    const response = await authService.login(userName, password);
    const token = response.data;
    if (!token) return;
    window.sessionStorage.setItem("token", token);
    const name = getName(token);
    setUser({
      userName: userName,
      name: name,
    });
    socket.connect()
    
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    window.sessionStorage.removeItem("token");
    socket.disconnect()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
