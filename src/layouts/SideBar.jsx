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
        container
        sx={{
          paddingY: "0px",
          marginTop: "0px",
          backgroundColor: "#FFFDFA",
        }}
      >
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Sidebar */}
        <Grid item xs={3}>
          <div
            style={{
              width: "22%",
              height: "100%",
              paddingLeft: "30px",
              paddingRight: "30px",
              marginTop: "50px",
              paddingTop: "50px",
              position: "fixed",
              borderRight: "3px solid #F2F1EE",
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
          </div>
        </Grid>

        {/* Contenido principal */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Outlet />
          </Grid>
        </Grid>

        {/* Rightbar */}

        <Grid item xs={3}>
          <RightBar />
        </Grid>
      </Grid>
    </>
  );
}

export default SideBar;
