import { Box, CircularProgress, Fab, Fade, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ClearIcon from "@mui/icons-material/Clear";
import ModalDialog from "@components/modals/ModalDialog";

const NotificationsPage = () => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        setOpen(false);
    }

    return (
        <Grid item xs={12}>
            <ModalDialog
                title={"Quieres eliminar esta notificacion ?"}
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
            />
            <Box
                sx={{
                    marginTop: "60px",
                    height: '100%',
                    backgroundColor: '#FFFDFA',
                    position: 'overflow',
                    paddingX: '15px',

                    boxShadow: 'none',

                }}
            >
                <Grid container sx={{
                    borderBottom: '2px solid #D9D9D9',
                    borderRadius: '30px',
                    padding: '40px 5px 15px 25px',

                }}>

                    <Grid item xs={9}>
                        <Typography variant='subtitle1' sx={{
                            fontWeight: "bold",
                        }}>

                            Roberto Carlos Andrade
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonOutline
                            text={"Aceptar"}
                            style={{
                                height: '33px',
                                width: '115px',
                                marginBottom: '10px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='body2'>
                            Te ha pedido unirse a tu proyecto IA en Biologia !
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonOutline
                            text={"Rechazar"}
                            style={{
                                height: '33px',
                                width: '115px',
                                marginBottom: '10px',

                            }}
                        />
                    </Grid>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Grid>
            </Box>
        </Grid>
    )
}

export default NotificationsPage