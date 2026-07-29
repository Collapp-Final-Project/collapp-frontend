import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  let redirectTo = null;
  if (!isAuthenticated) {
    redirectTo = "/login";
  } else if (user?.role !== "ROLE_ADMIN") {
    redirectTo = "/feed";
  }

  return redirectTo ? <Navigate to={redirectTo} replace /> : <Outlet />;
};