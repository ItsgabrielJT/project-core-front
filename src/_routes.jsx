import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SideBar from "./layouts/SideBar";
import { Backdrop, CircularProgress } from "@mui/material";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated ) return <Navigate to="/"  />;
  return (
    <SideBar>
      <Outlet />;
    </SideBar>
  );
};
