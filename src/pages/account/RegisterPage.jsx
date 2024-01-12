import React, { useEffect, useState } from "react";
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
import { Alert, Collapse, Fade, Snackbar, TextField } from "@mui/material";
import { useRegister } from "@hook/accounts/useRegister";
import ButtonContained from "@components/buttons/ButtonContained";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "@components/modals/CloudinaryUpload";
import CustomSelect from "@components/selects/CustomSelect";

const options = [
  {
    label: 'Profesor',
    value: 'Profesor',
  },
  {
    label: 'Estudiante',
    value: 'Estudiante',
  },

];


function RegisterPage({ open, handleClose }) {
  const [nextstep, setNextStep] = useState(false);
  const [validate, setValidate] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [ocupacion, setOcupacion] = useState("");

  const [cloudName] = useState("dnkst5hjn");
  const [uploadPreset] = useState("o0bi0kjz");
  const { formRegister } = useRegister(handleClose, publicId, ocupacion);

  const [state, setState] = React.useState({
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: 'Existen campos requeridos'
  });
  const { vertical, horizontal, openSnack, message } = state;

  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };

  const handleNextStep = () => {
    setValidate(true);
  };

  const handleReturn = () => {
    setNextStep(false);
  };

  const onClose = () => {
    handleClose();
    formRegister.resetForm();
  };

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "project-core-users", //upload files to the specified folder
    clientAllowedFormats: ["jpg", "png"], //restrict uploading to image files only
    maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    theme: "blue", //change to a purple theme
  });

  const handleSelectOcupacion = (e) => {
    setOcupacion(e)
  }

  const handleChangeNumber = (e) => {
    if (/^\d*$/.test(e.target.value) && e.target.value.length < 11) {
      formRegister.handleChange(e)
    }
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  useEffect(() => {
    if (validate) {
      if (formRegister.values.nombres.trim() == "" || formRegister.errors.nombres) {
        setState({ ...state, openSnack: true, message: formRegister.errors.nombres ? formRegister.errors.nombres : "El campo nombre es requerido" });
      } else if (formRegister.values.email.trim() == "" || formRegister.errors.email) {
        setState({ ...state, openSnack: true, message: formRegister.errors.email ? formRegister.errors.email : "El campo email es requerido" });
      } else if (formRegister.values.contrasenia.trim() == "" || formRegister.errors.contrasenia) {
        setState({ ...state, openSnack: true, message: formRegister.errors.contrasenia ? formRegister.errors.contrasenia : "El campo contraseña es requerido" });
      }
      setValidate(false);
    }
  }, [validate])

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
        open={open}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: "20px" }}>
                    <AdvancedImage
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        backgroundColor: "#F2F1EE",
                        overflow: "hidden",
                      }}
                      cldImg={myImage}
                      plugins={[responsive(), placeholder()]}
                    />
                    <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="nombres"
                      label="Nombre completo"
                      autoComplete="current-name"
                      value={formRegister.values.nombres}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      autoComplete="current-email"
                      value={formRegister.values.email}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="contrasenia"
                      label="Contraseña"
                      type="password"
                      autoComplete="current-contrasenia"
                      value={formRegister.values.contrasenia}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      sx={CssTexField}
                    />
                  </div>
                  <ButtonContained
                    fullWidth
                    onClick={handleNextStep}
                    text={"Siguiente"}
                  />
                </div>
              )}
              {nextstep && (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
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
                  <div style={{ marginBottom: "20px" }}>
                    <CustomSelect
                      placeholder="Selecciona tu perfil"
                      options={options}
                      onSelect={handleSelectOcupacion}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="universidad"
                      label="Instituto o Universidad"
                      id="universidad"
                      autoComplete="current-universidad"
                      value={formRegister.values.universidad}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      helperText={
                        formRegister.touched.universidad && formRegister.errors.universidad
                      }
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="carrera"
                      label="Carrera"
                      id="carrera"
                      autoComplete="current-carrera"
                      value={formRegister.values.carrera}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      helperText={
                        formRegister.touched.carrera && formRegister.errors.carrera
                      }
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="numero_celular"
                      label="Numero de telefono"
                      id="numero_celular"
                      autoComplete="current-numero_celular"
                      value={formRegister.values.numero_celular}
                      onChange={handleChangeNumber}
                      onBlur={formRegister.handleBlur}

                      helperText={
                        formRegister.touched.numero_celular && formRegister.errors.numero_celular
                      }
                      sx={CssTexField}
                    />
                  </div>
                  <ButtonContained fullWidth text={"Finalizar"} type="submit" />
                </div>
              )}
            </form>
          </ModalContent>
        </Fade>

      </Modal>
    </>
  );
}

export default RegisterPage;
