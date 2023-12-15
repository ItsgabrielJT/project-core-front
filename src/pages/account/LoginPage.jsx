import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLogin } from "@hook/accounts/useLogin";
import { CssTexField } from "@constants/styles";
import ButtonContained from "@components/buttons/ButtonContained";
import ButtonOutline from "@components/buttons/ButtonOutline";
import RegisterPage from "./RegisterPage";
import personas from "@images/estudiantes.png";
import logo from "@images/logos/logo.png";
import ResetPage from "./ResetPage";
import { Paper } from "@mui/material";

const LoginPage = () => {
  const { formLogin } = useLogin();
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenReset = () => setOpenReset(true);
  const handleCloseReset = () => setOpenReset(false);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <RegisterPage open={open} handleClose={handleClose} />
      <ResetPage open={openReset} handleClose={handleCloseReset} />

     
        <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${personas})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#FFFDFA",
          backgroundSize: "1110px 700px",
          backgroundPosition: "bottom",
        }}
      ></Grid>
      

      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 3,
            mx: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" 
            style={{
              width: '30%', // Ajusta el ancho de la imagen según sea necesario
              height: 'auto', // Ajusta la altura de la imagen automáticamente
              borderRadius: '8px', // Ajusta el radio de las esquinas según sea necesario
              marginBottom: '16px', // Ajusta el margen inferior según sea necesario
            }}
          />

          <Typography component="h1" variant="h3" className="color-primary">
            Bienvenido al portal de proyectos de investigacion
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formLogin.handleSubmit}
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              fullWidth
              autoComplete="email"
              id="email"
              name="email"
              label="Email"
              value={formLogin.values.email}
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}
              error={formLogin.touched.email && Boolean(formLogin.errors.email)}
              helperText={formLogin.touched.email && formLogin.errors.email}
              sx={CssTexField}
            />
            <TextField
              margin="normal"
              fullWidth
              name="contrasenia"
              label="Password"
              type="contrasenia"
              id="contrasenia"
              autoComplete="current-contrasenia"
              value={formLogin.values.contrasenia}
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}
              error={
                formLogin.touched.contrasenia && Boolean(formLogin.errors.contrasenia)
              }
              helperText={
                formLogin.touched.contrasenia && formLogin.errors.contrasenia
              }
              sx={CssTexField}
            />
            <ButtonContained fullWidth text={"Iniciar sesion"} type="submit" />
            <Grid
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>o</div>
            </Grid>
            
            <ButtonOutline  text={"Crear cuenta"} onClick={handleOpen} fullWidth style={{ 
              marginTop: "20px"
             }}/>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Link onClick={handleOpenReset} variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
