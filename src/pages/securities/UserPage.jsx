import { Backdrop, Box, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from './EditUser';
import { ResponsiveBarCanvas } from '@nivo/bar'
import { useUser } from '@hook/securities/useUser';
import { useParams } from 'react-router-dom';

var idLogin = JSON.parse(localStorage.getItem("id"));

function UserPage() {

  const [open, setOpen] = useState(false);
  const [ success, setSuccess] = useState(false);
  const { id } = useParams();
  const { user, loading } = useUser(success, id)


  const handleOpen = () => {
    setOpen(true)
    setSuccess(false)
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {
        user ? (
          <Grid item xs={12}>
                <EditUser
              open={open}
              handleClose={handleClose}
              onSuccess={setSuccess}
            />
            <Box
              sx={{
                marginTop: "53px",
                height: '100%',
                backgroundColor: '#FFFDFA',
                position: 'overflow',
                boxShadow: 'none',
                paddingX: '15px',

              }}
            >
              <div style={{
                backgroundColor: "#ACCDDC",
                height: '200px'
              }} />
              <div style={{
                display: 'flex',
                justifyContent: "space-between",
                marginTop: "20px"
              }}>
                <div >

                  <Typography variant="h6">
                    {user.full_name}

                  </Typography>
                  <Typography variant="overline">
                    <div style={{ display: 'flex' }}>
                      {user.university_name} - {user.career}
                      <Typography variant='subtitle2' sx={{
                        marginLeft: "5px",
                        marginTop: "3px",
                        color: "#319795"
                      }}>
                         / {user.occupation}
                      </Typography>
                    </div>
                  </Typography>
                </div>
                <div >
                  {
                    user.id == idLogin && (
                      <ButtonOutline text={"Editar"} onClick={handleOpen} />
                    )
                  }
                </div>
              </div>
              <div style={CssContentInfo}>
                <Typography variant='h6' sx={{ marginBottom: '20px' }}>
                  Acerca de
                </Typography>
                <div>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Correo electronico
                  </Typography>
                  <Typography variant='body2'>
                    {user.email_user}
                  </Typography>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Celular
                  </Typography>
                  <Typography variant='body2'>
                    {user.cellphone_number}
                  </Typography>
                </div>
              </div>
              <div style={CssContentInfo}>
                <Typography variant='h6' sx={{ marginBottom: '20px' }}>
                  Estadisticas
                </Typography>

              </div>

        
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                marginTop: "53px",
                height: '100%',
                backgroundColor: '#FFFDFA',
                position: 'overflow',
                boxShadow: 'none',
              }}
            >
              <Backdrop
                sx={{ color: '#blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                invisible={true}
              >
                <CircularProgress color="primary"
                  size={40}
                />
              </Backdrop>
            </Paper>
          </Grid>
        )
      }
    </>
  )
}

export default UserPage
