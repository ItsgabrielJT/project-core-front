import { Box, Typography } from '@mui/material'
import React from 'react'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';


function ErrorPage() {
    return (
        <Box
            sx={{
                marginTop: "90px",
                height: "100%",
                backgroundColor: "#FFFDFA",
                position: "overflow",
                paddingX: "15px",
                boxShadow: "none",
            }}
        >
            <center>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "100px",
                        color: "#6C757D",
                        marginTop: "210px",
                    }}
                >
                    500
                </Typography>


                <Typography
                    variant="button"
                    sx={{
                        color: "#6C757D",
                        fontSize: "20px"
                    }}
                >

                    Lo sentimos, parece que ocurrio un error con el servidor
                </Typography>

                <Typography
                    variant="button"
                    sx={{
                        display: 'block',
                        marginTop: '40px',
                        color: "#6C757D",
                    }}
                >
                    Intentelo mas tarde !
                </Typography>
                <RunningWithErrorsIcon sx={{
                    color: "#6C757D",
                    fontSize: "60px",
                    marginTop: "10px",
                }} />
            </center>
        </Box>
    )
}

export default ErrorPage