import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
    token: string | undefined;
    user: IUser | undefined;
}
interface IUser {
    id: string;
    name: string;
}

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>({
        id: "99",
        name: "zimzalabim",
    });
    const [token, setToken] = useState("test-token");

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const AuthContext = createContext<IAuthContext>({
    token: undefined,
    user: undefined,
});
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
