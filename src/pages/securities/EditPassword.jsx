import React, { useEffect, useState } from "react";
import {
    CssTexField,
    Modal,
    ModalContent,
    StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Box, Button, Collapse, Fade, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import { usePassword } from "@hook/securities/usePassword";
import { useSnackbar } from "@hook/accounts/useSnackbar";


function EditPassword({ user, open, handleClose, onSuccess }) {

    const { formPassword ,
        vertical,
        horizontal,
        openSnack,
        message,
        handleCloseSnack
    } = usePassword(handleClose, onSuccess);
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    

    const onClose = () => {
        formPassword.resetForm()
        handleClose();
    };

    const handleChange = (event) => {
        const newPassword = event.target.value;
        formPassword.setFieldValue("contrasenia_nueva", event.target.value)
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
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
                    <ModalContent sx={{ width: 450 }}>
                        <form onSubmit={formPassword.handleSubmit}>

                            <div>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div>
                                        <Fab
                                            size="small"
                                            aria-label="add"
                                            onClick={onClose}
                                            sx={{
                                                backgroundColor: "#FFFDFA",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <ClearIcon />
                                        </Fab>
                                        <h2 id="unstyled-modal-title" className="modal-title" style={{ marginLeft: '10px' }}>
                                            Editar contraseña
                                        </h2>
                                    </div>
                                    <ButtonContained
                                        type='submit'
                                        text={"Guardar"} style={{
                                            height: '37px',
                                            width: '115px',
                                            marginTop: '32px'
                                        }} />


                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', }}>



                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="contrasenia_anterior"
                                        label="contrasenia anterior"
                                        id="contraseña anterior"
                                        autoComplete="current-name"
                                        value={formPassword.values.contrasenia_anterior}
                                        onChange={formPassword.handleChange}
                                        onBlur={formPassword.handleBlur}
                                        
                                        sx={CssTexField}
                                    />
                                    <div style={{ marginTop: "20px", marginRight: "10px" }}>
                                        <p
                                            id="unstyled-modal-description"
                                            className="modal-description"
                                        >
                                            Para que tu contrasena sea segura te recomendamos:
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
                                            name="contrasenia_nueva"
                                            label="contraseña nueva"
                                            id="contrasenia_nueva"
                                            autoComplete="current-contrasenia_nueva"
                                            value={formPassword.values.contrasenia_nueva}
                                            onChange={handleChange}
                                            onBlur={formPassword.handleBlur}
                                            
                                            sx={CssTexField}

                                        />
                                    </div>

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="confirmar_contrasenia_nueva"
                                        label="confirmar contraseña nueva"
                                        id="confirmar contraseña nueva"
                                        autoComplete="current-confirmar_contrasenia_nueva"
                                        value={formPassword.values.confirmar_contrasenia_nueva}
                                        onChange={formPassword.handleChange}
                                        onBlur={formPassword.handleBlur}
                                        
                                        sx={CssTexField}
                                    />

                                </div>
                            </div>

                        </form>
                    </ModalContent>
                </Fade>

            </Modal>
        </>
    )
}

export default EditPassword