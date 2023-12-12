import { CircularProgress, Fab, Fade, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    StyledBackdrop,
} from "@constants/styles";
import ButtonOutline from "@components/buttons/ButtonOutline";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ModalDialog from "@components/modals/ModalDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

function ListProjects() {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        setOpen(false);
    }


    return (
        <Grid item xs={12}>
            
            <ModalDialog
                title={"Quieres eliminar este proyecto ?"}
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
                slots={{ backdrop: StyledBackdrop }}
            />
            <Paper
                sx={{
                    marginTop: "53px",
                    height: '100%',
                    backgroundColor: '#FFFDFA',
                    position: 'overflow',
                    padding: '40px 25px 0px 25px',
                    boxShadow: 'none',
                }}
            >
                <Grid container sx={{
                    borderBottom: '2px solid #D9D9D9',
                    borderRadius: '10px',
                    padding: '40px 5px 0px 25px',

                }}>

                    <Grid item xs={9}>
                        <div style={{
                            display: 'flex',
                        }}>
                            <div style={{
                                display: 'flex',
                            }}>
                                <div style={{
                                    backgroundColor: 'orange',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50px'
                                }}/>
                                <Typography variant='body1' style={{
                                    marginLeft: '8px'
                                }}>
                                    Iniciado
                                </Typography>
                            </div>
                            <div style={{
                                display: 'flex',
                                marginLeft: '25px'
                            }}>
                                <PersonRoundedIcon />
                                <Typography variant='body1' >
                                    4
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginRight: '40px',
                        }}>
                            <Fab size='small' aria-label="edit" style={{
                                backgroundColor: '#FFFDFA',
                                boxShadow: 'none'
                            }}>
                                <CreateIcon />

                            </Fab>
                            <Fab size='small' aria-label="edit" 
                                onClick={() => setOpen(true)}
                            style={{
                                backgroundColor: '#FFFDFA',
                                boxShadow: 'none'
                            }}>
                                <DeleteIcon sx={{
                                    color: '#DC3545'
                                }} />
                            </Fab>

                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='body1'>
                            Inteligencia Artificial  en Biologia
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonOutline
                            text={"Ver detalles"}
                            style={{
                                height: '33px',
                                width: '120px',
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
            </Paper>
        </Grid>
    )
}

export default ListProjects