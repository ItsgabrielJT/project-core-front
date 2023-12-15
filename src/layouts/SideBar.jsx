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

function SideBar({ children }) {
  const navigate = useNavigate();
  const { loading } = useAuth();

  return (
    <>
      <Backdrop
        sx={{ color: "#red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container >
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Sidebar */}
        <Grid item xs={false} md={3} >
          <Paper
            style={{
              width: '20%',
              height: '89vh',
              backgroundColor: '#FFFDFA',
              borderLeft: '3px solid #F2F1EE',
              marginTop: '50px',
              paddingTop: '50px',
            }}
          >
            {routes.map((item, index) => (
              <NavFocusOutline
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            ))}
            <ButtonContained
              text={"Crear proyecto"}
              type="submit"
              onClick={() => navigate("/create/project")}
            />
          </Paper>
        </Grid>

        {/* Contenido principal */}
        <Grid item xs={12} md={6} square>
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
