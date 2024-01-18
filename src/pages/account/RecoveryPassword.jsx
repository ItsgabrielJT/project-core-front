import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import personas from "@images/estudiantes.png";
import logo from "@images/logos/logo.png";
import { Paper, ThemeProvider, createTheme, css, keyframes } from "@mui/material";
import styled from '@emotion/styled';
import {
    CssTexField,
} from "@constants/styles";
import { Alert, Box, Button, Collapse, Fade, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from "../../hooks/accounts/useResetPassword";

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    filter: brightness(100%);
  }
  to {
    filter: brightness(70%);  
  }
`;

const AnimatedGrid = styled(Grid)`
  animation: ${slideInFromLeft} 1s ease-out;
  // Otros estilos...
`;

const AnimatedGrid3 = styled(Grid)`
  animation:  ${fadeIn} 0.3s ease-in 0.5s forwards;

  
  // Otros estilos...
`;

function RecoveryPassword() {

    const { token } = useParams();
    const { formPassword,
        vertical,
        horizontal,
        openSnack,
        message,
        handleCloseSnack
    } = useResetPassword(token);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (event) => {
        const newPassword = event.target.value;
        formPassword.setFieldValue("contrasenia", event.target.value)
        const strength = calculatePasswordStrength(newPassword);
        setPasswordStrength(strength);
    };

    const calculatePasswordStrength = (password) => {
        // Expresión regular para validar la contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (passwordRegex.test(password)) {
            return 100; // Contraseña válida
        } else {
            const lengthScore = Math.min(password.length, 8) / 8 * 50;
            const complexityScore = password.match(/[A-Za-z]/) ? 25 : 0;
            const digitScore = password.match(/\d/) ? 15 : 0;
            const specialCharScore = password.match(/[@$!%*?&]/) ? 10 : 0;

            const totalScore = lengthScore + complexityScore + digitScore + specialCharScore;
            return Math.min(totalScore, 100);
        }
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={handleCloseSnack}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Grid container component="main" sx={{ height: "98vh" }}>


                <AnimatedGrid3
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: `url(${personas})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "#319795",
                        backgroundSize: "1110px 700px",
                        backgroundPosition: "bottom",
                    }}
                />

                <AnimatedGrid item xs={12} sm={7} md={5} component={Paper} square >
                    <Box
                        sx={{
                            my: 3,
                            mx: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                        }}
                    >
                        <img src={logo} alt=""
                            style={{
                                width: '40%', // Ajusta el ancho de la imagen según sea necesario
                                height: 'auto', // Ajusta la altura de la imagen automáticamente
                                marginTop: '20px',
                                borderRadius: '8px', // Ajusta el radio de las esquinas según sea necesario
                                marginBottom: '16px', // Ajusta el margen inferior según sea necesario
                            }}
                        />


                        <Box
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <form onSubmit={formPassword.handleSubmit}>

                                <div>
                                    <div
                                        style={{ display: "flex", justifyContent: "center" }}
                                    >
                                        <h2 id="unstyled-modal-title" className="modal-title" >
                                            Modificar contraseña
                                        </h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        <div>
                                            <p
                                                id="unstyled-modal-description"
                                                className="modal-description"
                                            >
                                                Para que tu contraseña sea segura te recomendamos:
                                                <ul>
                                                    <li>Minimo 8 caracteres</li>
                                                    <li>Tener letras mayusculas y minusculas</li>
                                                    <li>Tener al menos un caracter especial</li>
                                                    <li>Tener al menos un numero</li>
                                                </ul>
                                            </p>
                                        </div>
                                        <div>
                                            <Box sx={{ mr: 1 }}>
                                                <LinearProgress variant="determinate" value={passwordStrength} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{`${Math.round(passwordStrength)}%`}</Typography>
                                            </Box>
                                            <TextField
                                                type="password"
                                                margin="normal"
                                                fullWidth
                                                name="contrasenia"
                                                label="contraseña nueva"
                                                id="contrasenia"
                                                autoComplete="current-contrasenia"
                                                value={formPassword.values.contrasenia}
                                                onChange={handleChange}
                                                onBlur={formPassword.handleBlur}
                                                sx={CssTexField}

                                            />
                                        </div>

                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            name="confirmar_contrasenia"
                                            label="confirmar contraseña nueva"
                                            id="confirmar contraseña nueva"
                                            autoComplete="current-confirmar_contrasenia"
                                            value={formPassword.values.confirmar_contrasenia}
                                            onChange={formPassword.handleChange}
                                            onBlur={formPassword.handleBlur}

                                            sx={CssTexField}
                                        />

                                    </div>
                                </div>
                                <ButtonContained
                                    fullWidth
                                    type='submit'
                                    text={"Guardar"} style={{
                                        marginTop: "20px"
                                    }} />

                            </form>
                        </Box>
                    </Box>
                </AnimatedGrid>
            </Grid>
        </>
    )
}

export default RecoveryPassword