import { Fab, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import logo from "@images/logos/logo.png";

function Header() {
    return (
        <Grid item xs={12} sx={{
            backgroundColor: "#F2F1EE",
            display: 'flex',
            justifyContent: 'space-between',

        }}>

            <div>
                <img src={logo} alt=""
                    style={{
                        width: '80px',
                        height: 'auto',
                        borderRadius: '8px',
                        marginTop: '6px',
                        marginLeft: '20px'
                    }}
                />
            </div>
            <div>
                <Fab sx={
                    {
                        width: '40vh',
                        height: '10px',
                        borderRadius: '20px',
                        boxShadow: 'none',
                        backgroundColor: "#F2F1EE",
                        marginTop: '6px',
                        marginRight: '20px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }
                }>
                    <img src={logo} alt=""
                        style={{
                            width: '30px',
                            height: 'auto',
                            borderRadius: '8px',
                            marginTop: '6px',
                            marginLeft: '20px'
                        }}
                    />
                    <Typography variant='body2' sx={{
                        marginRight: '15px',
                    }}>
                        Joel Tates Asimbaya

                    </Typography>
                </Fab>
            </div>
        </Grid>
    )
}

export default Header