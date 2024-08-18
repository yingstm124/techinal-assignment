import { Navigate } from "react-router";
import { ReactNode } from "react";
import Breadcrumb from "../Breadcrumb";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const currentUser = window.sessionStorage.getItem("userId");

    if (!currentUser) return <Navigate to={"/select-user"} replace />;
    return (
        <>
            <Breadcrumb />
            {children}
        </>
    );
}
export default ProtectedRoute;
