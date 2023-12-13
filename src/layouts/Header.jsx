import { Fab, Grid, Paper, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "@images/logos/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CustomizedPopover } from "@constants/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logOut, user } = useAuth();

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "rgba(242, 241, 238, 0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        width: "99%",
        position: "fixed",
      }}
    >
      <div>
        <img
          src={logo}
          alt=""
          style={{
            width: "80px",
            height: "auto",
            borderRadius: "8px",
            marginTop: "6px",
            marginLeft: "20px",
          }}
        />
      </div>
      <div>
        <Fab
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            width: "40vh",
            height: "10px",
            borderRadius: "20px",
            boxShadow: "none",
            backgroundColor: "#F2F1EE",
            marginTop: "6px",
            marginRight: "20px",
            display: "flex",
          }}
        >
          <AccountCircleIcon
            style={{
              width: "30px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              marginRight: "15px",
              marginLeft: "10px",
            }}
          >
            {user.nombreCompleto}
          </Typography>
        </Fab>
        <CustomizedPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Fab
            style={{ display: "flex" }}
            sx={{
              width: "40vh",
              height: "10px",
              borderRadius: "20px",
              boxShadow: "none",
              backgroundColor: "#F2F1EE",
              display: "flex",
            }}
            onClick={logOut}
          >
            <PowerSettingsNewIcon />
            <Typography
              variant="body2"
              style={{
                marginLeft: "10px",
                marginTop: "3px",
              }}
            >
              Cerrar sesion.
            </Typography>
          </Fab>
        </CustomizedPopover>
      </div>
    </Grid>
  );
}

export default Header;
