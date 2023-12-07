
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLogin } from '@hook/accounts/useLogin';
import { CssTexField } from '@constants/styles';
import ButtonContained from '@components/buttons/ButtonContained';
import ButtonOutline from '@components/buttons/ButtonOutline';
import RegisterPage from './RegisterPage';


const LoginPage = () => {

  const { formLogin } = useLogin()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <RegisterPage 
        open={open}
        handleClose={handleClose}
      />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}

      >
        <Grid item sx={{
        }}>
        </Grid>
        <Grid item sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'contain',
          backgroundPosition: 'end',
        }}>
        </Grid>
      </Grid>
      <Grid item xs={14} sm={8} md={5} elevation={6} >
        <Box
          sx={{
            my: 8,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3" className='color-primary'>
            Bienvenido al portal de proyectos de investigacion
          </Typography>
          <Box component="form" noValidate onSubmit={formLogin.handleSubmit} sx={{ mt: 5 }}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formLogin.values.password}
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}
              error={formLogin.touched.password && Boolean(formLogin.errors.password)}
              helperText={formLogin.touched.password && formLogin.errors.password}
              sx={CssTexField}
            />
            <ButtonContained
              text={"Iniciar sesion"}
              type="submit"
            />
            <Grid sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }} >
              <div >
                o
              </div>
            </Grid>
            <ButtonOutline
              text={"Crear cuenta"}
              onClick={handleOpen}
            />

            <Grid item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
