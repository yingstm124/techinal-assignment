import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import { IUser } from "../../pages/SelectUserPage";
import { IOnlineUsers } from "../../websocket/param";

interface IAuthContext {
    user: IUser | undefined;
    selectUser: (user: IUser) => void;
    logout: () => void;
    onlineUsers: IOnlineUser;
    updateOnlineUsers: (param: IOnlineUsers) => void;
}
interface IOnlineUser {
    [userName: string]: string;
}

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>();
    const [onlineUsers, setOnlineUsers] = useState<IOnlineUser>({});

    const updateOnlineUsers = useCallback((param: IOnlineUsers) => {
        setOnlineUsers(param);
    }, []);

    const selectUser = useCallback((user: IUser) => {
        setUser(user);
        window.sessionStorage.setItem("userId", user.userName);
    }, []);

    const logout = useCallback(() => {
        setUser(undefined);
        window.sessionStorage.removeItem("userId");
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                selectUser,
                logout,
                onlineUsers,
                updateOnlineUsers,
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
});
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
