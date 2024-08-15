import { Navigate } from "react-router";
import { useAuthContext } from "./AuthProvider";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { token } = useAuthContext();

    if (!token) return <Navigate to={"/login"} replace />;
    return children;
}
export default ProtectedRoute;
