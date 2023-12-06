
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';

const LoginPage = () => {


  const handleSubmit = (e) => {
    console.log(e)
  }

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#9BBEC8',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '50px',
        border: '3px solid #9BBEC8',
      },
      '&:hover fieldset': {
        borderColor: '#9BBEC8',

      },
      '&.Mui-focused fieldset': {
        borderColor: '#44C6C3',
      },
    },
  });

  const ContainedButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '3px solid',
    borderRadius: '25px',
    backgroundColor: '#319795',
    borderColor: '#319795',
    '&:hover': {
      backgroundColor: '#44C6C3',
      borderColor: '#44C6C3',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#44C6C3',
      borderColor: '#44C6C3',
    },

  });

  const OutlinedButton = styled(Button)({
    color: '#319795',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '3px solid',
    borderRadius: '25px',
    borderColor: '#319795',
    '&:hover': {
      borderColor: '#44C6C3',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      borderColor: '#44C6C3',
    },

  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
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
      <Grid item xs={14} sm={8} md={5} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="body2" variant="h3" className='color-primary'>
            Bienvenido al portal de proyectos de investigacion
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ContainedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
            >
              Iniciar sesion
            </ContainedButton>
            
            <Grid sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }} >            
              <Grid item >
                <div >
                  o
                </div>
              </Grid>
            </Grid>
            <OutlinedButton
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Crear cuenta
            </OutlinedButton>
            <Grid content 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }} 
            >            
              <Grid item  >
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
