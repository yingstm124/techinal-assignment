import { Navigate } from "react-router";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const currentUser = window.sessionStorage.getItem("userId");

    if (!currentUser) return <Navigate to={"/select-user"} replace />;
    return children;
}
export default ProtectedRoute;
