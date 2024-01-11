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
import { Collapse, Fade, TextField } from "@mui/material";
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
  const [publicId, setPublicId] = useState("");
  const [ocupacion, setOcupacion] = useState("");

  const [cloudName] = useState("dnkst5hjn");
  const [uploadPreset] = useState("o0bi0kjz");
  const { formRegister } = useRegister(handleClose, publicId, ocupacion);

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
    console.log(e)
    setOcupacion(e)
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
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
                      id="nombres"
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
                      id="email"
                      autoComplete="current-email"
                      value={formRegister.values.email}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}

                      helperText={
                        formRegister.touched.email && formRegister.errors.email
                      }
                      sx={CssTexField}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="contrasenia"
                      label="Contraseña"
                      type="password"
                      id="contrasenia"
                      autoComplete="current-contrasenia"
                      value={formRegister.values.contrasenia}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}

                      helperText={
                        formRegister.touched.contrasenia &&
                        formRegister.errors.contrasenia
                      }
                      sx={CssTexField}
                    />
                  </div>
                  <ButtonContained
                    disabled={Boolean(formRegister.errors.contrasenia) || Boolean(formRegister.errors.email) || !Boolean(formRegister.values.nombres) || !Boolean(formRegister.values.email) || !Boolean(formRegister.values.contrasenia)}
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
                      onChange={formRegister.handleChange}
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
