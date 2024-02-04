import { Backdrop, CircularProgress, Grid, Paper } from "@mui/material";
import React from "react";
import HomePage from "../pages/home/HomePage";
import Header from "./Header";
import RightBar from "./RightBar";
import { Outlet } from "react-router";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonContained from "@components/buttons/ButtonContained";
import NavFocusOutline from "@components/navs/NavFocusOutline";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


function SideBar({ children }) {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  return (
    <>
      <Backdrop
        sx={{ color: "#red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Sidebar */}
        <Grid item xs={false} md={3}>
          <Paper
            style={{
              height: "100vh",
              width: "19vw",
              backgroundColor: "#FFFDFA",
              position: "fixed",
              borderRight: "2px solid #F2F1EE",
              marginTop: "50px",
              paddingTop: "50px",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            {
              user && user.rol === "Admin" ? (
              <div> 
                <NavFocusOutline
                    icon={<FileCopyOutlinedIcon/>}
                    title={"Proyectos"}
                    path={"/admin/projects"}
                    style={{
                      marginBottom: "17px",
                    }}
                  />  
                  <NavFocusOutline
                    icon={<GroupIcon/>}
                    title={"Usuarios"}
                    path={"/admin/users"}
                    style={{
                      marginBottom: "17px",
                    }}
                  /> 
                  <NavFocusOutline
                    icon={<AdminPanelSettingsIcon />}
                    title={"Perfil administrador"}
                    path={"/admin/user"}
                    style={{
                      marginBottom: "17px",
                    }}
                  /> 
              </div>
            ) : (
              <>
                {routes.map((item, index) => (
                  <NavFocusOutline
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    path={item.path}
                    style={{
                      marginBottom: "17px",
                    }}
                  />
                ))}
                <ButtonContained
                  fullWidth
                  text={"Crear proyecto"}
                  type="submit"
                  onClick={() => navigate("/create/project")}
                />
              </>
            )}
          </Paper>
        </Grid>

        {/* Contenido principal */}
        <Grid item xs={12} md={6}>
          <Outlet />
        </Grid>

        {/* Rightbar */}

        <Grid item xs={false} md={3}>
          <RightBar />
        </Grid>
      </Grid>
    </>
  );
}

export default SideBar;
