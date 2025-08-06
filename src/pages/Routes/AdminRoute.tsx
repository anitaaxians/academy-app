import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "Admin") {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default AdminRoute;
