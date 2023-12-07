import React, { useState } from "react";
import {
  CssTexField,
  Modal,
  ModalContent,
  ModalButton,
  StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Collapse, Grid, Link, TextField, Typography } from "@mui/material";
import { useResetPassword } from "@hook/accounts/useResetPassword";
import ButtonContained from "@components/buttons/ButtonContained";
import { Box } from "@mui/system";
import LinearProgress from "@mui/material/LinearProgress";

const tab = false;

function ResetPage({ open, handleClose }) {
  const { formPassword } = useResetPassword();
  const [nextstep, setNextStep] = useState(false);
  const [progress, setProgress] = useState(10);

  const handleNextStep = () => {
    setNextStep(true);
  };

  const handleReturn = () => {
    setNextStep(false);
  };

  const onClose = () => {
    handleClose();
    formPassword.resetForm();
  };

  const handleChange = ({ target }) => {
    let progress = 0;

    if (/[A-Z]/.test(target.value)) {
      progress += 10;
    } 

    if (/\d/.test(target.value)) {
      progress += 10;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(target.value)) {
      progress += 10;
    }

    
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 100 : prevProgress + progress
    );
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 450 }}>
          {!nextstep && (
            <form onSubmit={formPassword.handleSubmit}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginTop: "10px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Recupera tu cuenta
                    </h2>
                  </div>
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
                </div>
                <div>
                  <div style={{ marginTop: "20px", marginRight: "10px" }}>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Escribe tu correo para poder enviarte un codigo temporal
                      para que puedas cambiar tu contrasena
                    </p>
                  </div>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    autoComplete="current-name"
                    value={formPassword.values.email}
                    onChange={formPassword.handleChange}
                    onBlur={formPassword.handleBlur}
                    error={
                      formPassword.touched.email &&
                      Boolean(formPassword.errors.email)
                    }
                    helperText={
                      formPassword.touched.email && formPassword.errors.email
                    }
                    sx={CssTexField}
                  />
                  <div style={{ marginTop: "40px", marginRight: "10px" }}>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Revisa tu correo o carpeta de spam
                    </p>
                  </div>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="codigo"
                    label="Codigo"
                    id="codigo"
                    autoComplete="current-name"
                    value={formPassword.values.codigo}
                    onChange={formPassword.handleChange}
                    onBlur={formPassword.handleBlur}
                    error={
                      formPassword.touched.codigo &&
                      Boolean(formPassword.errors.codigo)
                    }
                    helperText={
                      formPassword.touched.codigo && formPassword.errors.codigo
                    }
                    sx={CssTexField}
                  />
                  <div
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Link variant="body2">Reenviar codigo</Link>
                  </div>
                </div>
                <ButtonContained
                  onClick={handleNextStep}
                  text={"Verificar Codigo"}
                />
              </div>
            </form>
          )}
          {nextstep && (
            <form onSubmit={formPassword.handleSubmit}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginTop: "10px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Modifica tu contrasena
                    </h2>
                  </div>
                  <Fab
                    size="small"
                    aria-label="add"
                    onClick={handleReturn}
                    sx={{
                      backgroundColor: "#FFFDFA",
                      boxShadow: "none",
                    }}
                  >
                    <KeyboardReturnIcon />
                  </Fab>
                </div>
                <div>
                  <div style={{ marginTop: "20px", marginRight: "10px" }}>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Para que tu contrasena sea segura te recomendamos:
                      <ul>
                        <li>Minimo 8 caracteres</li>
                        <li>Tener al menos una letra mayusucla</li>
                        <li>Tener al menos un caracter especial</li>
                        <li>Tener al menos un numero</li>
                      </ul>
                    </p>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="New password"
                    id="password"
                    autoComplete="current-name"
                    value={formPassword.values.password}
                    onChange={handleChange}
                    onBlur={formPassword.handleBlur}
                    error={
                      formPassword.touched.password &&
                      Boolean(formPassword.errors.password)
                    }
                    helperText={
                      formPassword.touched.password &&
                      formPassword.errors.password
                    }
                    sx={CssTexField}
                  />
                </div>
                <ButtonContained
                  onClick={handleNextStep}
                  text={"Guardar cambios"}
                />
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetPage;
