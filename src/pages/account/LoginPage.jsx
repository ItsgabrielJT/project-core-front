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
import { Paper, ThemeProvider, createTheme, css, keyframes } from "@mui/material";
import styled from '@emotion/styled';

const theme = createTheme();

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromLeft2 = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromLeft3 = keyframes`
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    filter: brightness(100%);
  }
  to {
    filter: brightness(26%);  
  }
`;

const AnimatedGrid = styled(Grid)`
  animation: ${slideInFromLeft} 2s ease-out;
  // Otros estilos...
`;

const AnimatedGrid2 = styled(Grid)`
  animation: ${slideInFromLeft2} 2s ease-out;
  // Otros estilos...
`;

const AnimatedGrid3 = styled(Grid)`
  animation: ${slideInFromLeft3} 3s ease-out , ${fadeIn} 0.5s ease-in 3s forwards;

  
  // Otros estilos...
`;

const LoginPage = () => {
  const { formLogin } = useLogin();
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenReset = () => setOpenReset(true);
  const handleCloseReset = () => setOpenReset(false);

  return (
    <Grid container component="main" sx={{ height: "97vh" }}>
      <RegisterPage open={open} handleClose={handleClose} />
      <ResetPage open={openReset} handleClose={handleCloseReset} />


      <AnimatedGrid2
        item
        xs={false}
        sm={2}
        md={7}
        sx={{
          position: 'absolute',
          zIndex: "2"
        }}
      >
        <div style={{
          fontSize: "8em",
          color: "#9BBEC8",
          fontWeight: "500",
          fontFamily: "Bahnschrift Condensed",
          lineHeight: "130px",
          overflow: "hidden",
          marginTop: "150px",
          marginLeft: "40px"
        }}>
          BIENVENIDO AL PORTAL DE

        </div>
        
        <div style={{
          fontSize: "4em",
          color: "#319795",
          fontWeight: "500",
          fontFamily: "Bahnschrift Condensed",
          overflow: "hidden",
          marginLeft: "40px"

        }}>
          PROYECTOS INVESTIGATIVOS
        </div>
        <div style={{
          fontSize: "2.5em",
          color: "#9AD0C2",
          fontWeight: "250",
          fontFamily: "Bahnschrift Condensed",
          overflow: "hidden",
          marginLeft: "40px"

        }}>
          Maneja eficientemente todos tus proyectos !
        </div>
      </AnimatedGrid2>

      <AnimatedGrid3
         item
         xs={false}
         sm={4}
         md={7}
         sx={{
           backgroundImage: `url(${personas})`,
           backgroundRepeat: "no-repeat",
           backgroundColor: "#319795",
           backgroundSize: "1110px 700px",
           backgroundPosition: "bottom",
         }}
      >

      </AnimatedGrid3>

      <AnimatedGrid item xs={12} sm={7} md={5} component={Paper} elevation={6} square >
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
              width: '40%', // Ajusta el ancho de la imagen según sea necesario
              height: 'auto', // Ajusta la altura de la imagen automáticamente
              marginTop: '60px',
              borderRadius: '8px', // Ajusta el radio de las esquinas según sea necesario
              marginBottom: '16px', // Ajusta el margen inferior según sea necesario
            }}
          />


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
              type="password"
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

            <ButtonOutline text={"Crear cuenta"} onClick={handleOpen} fullWidth style={{
              marginTop: "20px"
            }} />

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
      </AnimatedGrid>
    </Grid>
  );
};

export default LoginPage;
