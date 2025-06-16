import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout() {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthLayout;
