import { Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from './EditUser';


function UserPage() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid item xs={12}>
            <EditUser
                open={open}
                handleClose={handleClose}
            />
            <Paper
                sx={{
                    marginTop: "53px",
                    height: '110vh',
                    backgroundColor: '#FFFDFA',
                    position: 'overflow',
                }}
            >
                <div style={{
                    backgroundColor: "#ACCDDC",
                    height: '28%'
                }} />
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    marginTop: "20px"
                }}>
                    <div style={{
                        paddingLeft: "30px"
                    }}>

                        <Typography variant="h6">
                            Joel Tates Asimbaya

                        </Typography>
                        <Typography variant="overline">
                            EPN - Tescnologo en software
                        </Typography>
                    </div>
                    <div style={{

                        paddingRight: "30px"
                    }}>
                        <ButtonOutline text={"Editar"} onClick={handleOpen} />
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
                            gabrielasimbaya@gmail.com
                        </Typography>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                            Celular
                        </Typography>
                        <Typography variant='body2'>
                            09871287831
                        </Typography>
                    </div>
                </div>
                <div style={CssContentInfo}>
                    <Typography variant='h6' sx={{ marginBottom: '20px' }}>
                        Estadisticas
                    </Typography>

                </div>
            </Paper>
        </Grid>
    )
}

export default UserPage