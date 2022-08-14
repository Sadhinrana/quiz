import {useAuth} from "../contexts/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export default function PublicRoute() {
    const {currentUser} = useAuth();

    return currentUser ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
}