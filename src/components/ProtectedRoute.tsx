import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const account = useSelector((state: RootState) => state.account.account);
    if (!account) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};