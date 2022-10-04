import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
