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
import { Alert, Collapse, Grid, Link, Snackbar, TextField, Typography } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import { accountService } from "../../services/account/accountService";
import notificationService from "@services/notificationService"


const tab = false;

function ResetPage({ open, handleClose }) {

  const [email, setEmail] = useState("")
  const [validate, setValidate] = useState(false)
  const [state, setState] = useState({
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: 'Existen campos requeridos'
  });
  const { vertical, horizontal, openSnack, message } = state;

  const handleSendEmail = () => {
    let json = {
      email: email
    }
    accountService.sendEmailPassword(json)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha verificado su correo con exito")
          handleClose();
          setEmail("");
        }
      })
      .catch((err) => {
        notificationService.error(err.message)
      })
  };

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputEmail);

    if (!isValidEmail) {
      setState({ ...state, openSnack: true, message: "El formato de email es invalido" });
    } else {
      setValidate(true)
    }
  }

  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };

  const onClose = () => {
    handleClose();
    setEmail("");
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
        <ModalContent sx={{ width: 450 }}>
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
                <div style={{ marginTop: "20px", marginRight: "10px", marginBottom: "20px" }}>
                  <Typography variant="body2" color={"#319795"}>
                    * Revisa tu correo o carpeta de spam
                  </Typography>
                </div>
              </div>
              <TextField
                margin="normal"
                fullWidth
                name="email"
                label="Email"
                id="email"
                autoComplete="current-name"
                value={email}
                onChange={handleChange}
                sx={CssTexField}
              />

            </div>
            <ButtonContained
              fullWidth
              disabled={!validate}
              onClick={handleSendEmail}
              text={"Verificar correo"}
              style={{ marginTop: "30px" }}
            />
          </div>

        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetPage;
