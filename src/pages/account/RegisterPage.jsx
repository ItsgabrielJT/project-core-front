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
import { Collapse, TextField } from "@mui/material";
import { useRegister } from "@hook/accounts/useRegister";
import ButtonContained from "@components/buttons/ButtonContained";
import { Box } from "@mui/system";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const tab = false;

function RegisterPage({ open, handleClose }) {
  const { formRegister } = useRegister(handleClose);
  const [nextstep, setNextStep] = useState(false);

  const handleNextStep = () => {
    setNextStep(true);
  };

  const handleReturn = () => {
    setNextStep(false);
  };

  const onClose = () => {
    handleClose();
    formRegister.resetForm();
  };

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
          <form onSubmit={formRegister.handleSubmit}>
            {!nextstep && (
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      1 de 2 pasos
                    </p>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Crea tu cuenta
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
                  <Fab
                    sx={{
                      margin: "20px 0px 20px 0px",
                      width: "115px",
                      height: "115px",
                      fontSize: "12px",
                      flexDirection: "column", // Colocar los elementos en una columna
                      alignItems: "center", // Alinear en el centro horizontal
                      justifyContent: "center", // Alinear en el centro vertical
                    }}
                  >
                    <AddAPhotoIcon />
                    <div>Agrega una foto</div>
                  </Fab>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="nombres"
                    label="Full Name"
                    id="nombres"
                    autoComplete="current-name"
                    value={formRegister.values.nombres}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.nombres &&
                      Boolean(formRegister.errors.nombres)
                    }
                    helperText={
                      formRegister.touched.nombres &&
                      formRegister.errors.nombres
                    }
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="current-email"
                    value={formRegister.values.email}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.email &&
                      Boolean(formRegister.errors.email)
                    }
                    helperText={
                      formRegister.touched.email && formRegister.errors.email
                    }
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="contrasenia"
                    label="Password"
                    type="password"
                    id="contrasenia"
                    autoComplete="current-contrasenia"
                    value={formRegister.values.contrasenia}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.contrasenia &&
                      Boolean(formRegister.errors.contrasenia)
                    }
                    helperText={
                      formRegister.touched.contrasenia &&
                      formRegister.errors.contrasenia
                    }
                    sx={CssTexField}
                  />
                </div>
                <ButtonContained fullWidth onClick={handleNextStep} text={"Siguiente"} />
              </div>
            )}
            {nextstep && (
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      2 de 2 pasos
                    </p>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Crea tu cuenta
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
                  <TextField
                    margin="normal"
                    fullWidth
                    name="ocupacion"
                    label="Ocupation"
                    id="ocupacion"
                    autoComplete="current-name"
                    value={formRegister.values.ocupacion}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.ocupacion &&
                      Boolean(formRegister.errors.ocupacion)
                    }
                    helperText={
                      formRegister.touched.ocupacion && formRegister.errors.ocupacion
                    }
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="universidad"
                    label="Institute"
                    id="universidad"
                    autoComplete="current-universidad"
                    value={formRegister.values.universidad}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.universidad &&
                      Boolean(formRegister.errors.universidad)
                    }
                    helperText={
                      formRegister.touched.universidad &&
                      formRegister.errors.universidad
                    }
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="carrera"
                    label="Carrer"
                    id="carrera"
                    autoComplete="current-carrera"
                    value={formRegister.values.carrera}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.carrera &&
                      Boolean(formRegister.errors.carrera)
                    }
                    helperText={
                      formRegister.touched.carrera &&
                      formRegister.errors.carrera
                    }
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="numero_celular"
                    label="Number phone"
                    id="numero_celular"
                    autoComplete="current-numero_celular"
                    value={formRegister.values.numero_celular}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={
                      formRegister.touched.numero_celular &&
                      Boolean(formRegister.errors.numero_celular)
                    }
                    helperText={
                      formRegister.touched.numero_celular && formRegister.errors.numero_celular
                    }
                    sx={CssTexField}
                  />
                </div>
                <ButtonContained fullWidth text={"Guardar"} type="submit" />
              </div>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterPage;
