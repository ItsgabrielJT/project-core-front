import { Backdrop, Box, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from './EditUser';
import { ResponsiveBarCanvas } from '@nivo/bar'
import { useUser } from '@hook/securities/useUser';
import { useParams } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useAuth } from '../../context/AuthContext';


function UserPage() {

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cloudName] = useState("dnkst5hjn");
  const { id } = useParams();
  const { user } = useAuth()
  const { profile, loading } = useUser(success, id)
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  useEffect(() => {
    console.log(user)
  }, [user])

  const myImage = cld.image(profile ? profile.link_image : "");

  const handleOpen = () => {
    setOpen(true)
    setSuccess(false)
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {
        profile ? (
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
              <div style={{ position: 'relative' }}>
                <div style={{
                  backgroundColor: "#ACCDDC",
                  height: '200px',
                }} />

                    <AdvancedImage
                      style={{
                        position: 'absolute',
                        top: '90%',
                        left: '10%',
                        transform: 'translate(-50%, -50%)',
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      cldImg={myImage}
                      plugins={[responsive(), placeholder()]}
                    />
                  
              </div>
              <div style={{
                display: 'flex',
                marginTop: '60px',

                top: '350px',
                justifyContent: 'space-between',
              }}>
                <div >

                  <Typography variant="h6">
                    {profile.full_name}

                  </Typography>
                  <Typography variant="overline">
                    <div style={{ display: 'flex' }}>
                      {profile.university_name} - {profile.career}
                      <Typography variant='subtitle2' sx={{
                        marginLeft: "5px",
                        marginTop: "3px",
                        color: "#319795"
                      }}>
                        / {profile.occupation}
                      </Typography>
                    </div>
                  </Typography>
                </div>
                <div >
                  {
                    profile.id == user.id && (
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
                    {profile.email_user}
                  </Typography>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Celular
                  </Typography>
                  <Typography variant='body2'>
                    {profile.cellphone_number}
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
