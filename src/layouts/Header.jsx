import { Fab, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import logo from "@images/logos/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
    return (
        <Grid item xs={12} sx={{
            backgroundColor: "#F2F1EE",
            backdropFilter: 'blur(100px)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '99%',
            position: 'fixed'
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
                    }
                }>
                    <AccountCircleIcon
                    style={{
                        width: '30px',
                        height: 'auto',
                        borderRadius: '8px',
                    }}
                    />
                    <Typography variant='body2' sx={{
                        marginRight: '15px',
                        marginLeft: '10px',
                    }}>
                        Joel Tates Asimbaya

                    </Typography>
                </Fab>
            </div>
        </Grid>
    )
}

export default Header