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
import { useSnackbar } from "@hook/accounts/useSnackbar";
import ModalDialog from "@components/modals/ModalDialog";


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
  const {
    vertical,
    horizontal,
    openSnack,
    message,
    handleCloseSnack
  } = useSnackbar(formRegister, validate, setValidate, setNextStep)

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "project-core-users", //upload files to the specified folder
    clientAllowedFormats: ["jpg", "png"], //restrict uploading to image files only
    maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    theme: "blue", //change to a purple theme
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  const handleReturn = () => {
    setNextStep(false);
  };

  const handleSelectOcupacion = (e) => {
    formRegister.setFieldValue("ocupacion", e)
  }

  const handleChangeNumber = (e) => {
    if (/^\d*$/.test(e.target.value) && e.target.value.length < 14) {
      formRegister.handleChange(e)
    }
  }

  const [close, setClose] = useState(false);

  const onCloseDialog = () => {
    setClose(false);
    setPublicId("")
    handleClose();
    formRegister.resetForm();
  };

  const handleOpenDialog = () => {
      if (
        publicId == "" && formRegister.values.nombres == "" &&
        formRegister.values.email == "" &&
        formRegister.values.contrasenia == "" &&
        formRegister.values.ocupacion == "" 
      ) {
        onCloseDialog()
      } else {
        setClose(true)
      }
  } 


  return (
    <>
      <ModalDialog
        title={"Quieres descartar los cambios ?"}
        open={close}
        onClose={() => setClose(false)}
        onConfirm={onCloseDialog}
      />
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
                      onClick={handleOpenDialog}
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
                    onClick={() => setValidate(true)}
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
                      autoComplete="current-universidad"
                      value={formRegister.values.universidad}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="carrera"
                      label="Carrera"
                      autoComplete="current-carrera"
                      value={formRegister.values.carrera}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="numero_celular"
                      label="Numero de telefono: 593XXXXXXXXX"
                      autoComplete="current-numero_celular"
                      value={formRegister.values.numero_celular}
                      onChange={handleChangeNumber}
                      onBlur={formRegister.handleBlur}
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
