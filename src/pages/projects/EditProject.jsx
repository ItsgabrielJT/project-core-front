import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import { CssTexField } from "@constants/styles";
import { useEdit } from "@hook/projects/useEdit";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";
import CloudinaryUploadWidget from "@components/modals/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import CustomSelect from "@components/selects/CustomSelect";
import ModalInvitations from "./ModalInvitations";


const options = [
  {
    label: 'Iniciando',
    value: 1,
  },
  {
    label: 'En proceso',
    value: 2,
  },
  {
    label: 'Finalizado',
    value: 3,
  },
  {
    label: 'En revision',
    value: 4,
  },

];

function EditProject() {
  const { id } = useParams();
  const [publicId, setPublicId] = useState("");

  const {
    formProject,
    specifics,
    references,
    loading,
    handleAddInput,
    handleAddLink,
    handleObjectSpecifics,
    cleanObjectSpecifics,
    handleReferences,
    cleanReferences,
  } = useEdit(id, publicId, setPublicId);
  const [uploadPreset] = useState("o0bi0kjz");
  const [cloudName] = useState("dnkst5hjn");
  const [openInvitations, setOpenInvitations] = useState(false);


  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "project-core-projects", //upload files to the specified folder
    clientAllowedFormats: ["jpg", "png"], //restrict uploading to image files only
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    theme: "blue", //change to a purple theme
  });

  

  const handleClose = () => {
    setOpenInvitations(false);
  };

  const handleOpenModal = () => {
    setOpenInvitations(true)
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const proyecto = cld.image(publicId);
  const proyectoEdit = cld.image(
    id ? formProject.values.link_imagen : ""
  );

  const handleSelectOcupacion = (e) => {
    formProject.setFieldValue("estado", e)
  }

  return (
    <Grid item xs={12}>
      <ModalInvitations
        open={openInvitations}
        onClose={handleClose}
        idProjecto={id}
      />
      <Box
        sx={{
          marginTop: "90px",
          height: "100%",
          backgroundColor: "#FFFDFA",
          position: "overflow",
          boxShadow: "none",
          paddingX: "15px",
        }}
      >
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        {!publicId == "" ? (
          <AdvancedImage
            style={{
              width: "100%",
              height: "290px",
              marginRight: "10px",
              backgroundColor: "#F2F1EE",
              objectFit: "cover",
              borderRadius: "30px",
              overflow: "hidden",
            }}
            cldImg={proyecto}
            plugins={[responsive(), placeholder()]}
          />
        ) : (
          <>
            <AdvancedImage
              style={{
                width: "100%",
                height: "290px",
                marginRight: "10px",
                backgroundColor: "#F2F1EE",
                objectFit: "cover",
                borderRadius: "30px",
                overflow: "hidden",
              }}
              cldImg={proyectoEdit}
              plugins={[responsive(), placeholder()]}
            />
          </>
        )}

        <Grid
          component="form"
          onSubmit={formProject.handleSubmit}
          sx={{
            marginTop: "10px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >

              {id && (
                <ButtonContained
                  onClick={handleOpenModal}
                  text={"Invitar"}
                  style={{
                    width: "100px",
                    marginLeft: "10px",
                    height: "40px",
                  }}
                ></ButtonContained>
              )}
              <ButtonOutline
                type="submit"
                text={"Guardar"}
                style={{
                  width: "100px",
                  height: "40px",
                  marginLeft: "10px",
                }}
              />
            </div>
          </div>
          {
            id && (
              <div style={{ marginTop: "20px" }}>
                <InputLabel id="label" sx={{ fontSize: 12, marginLeft: "15px" }}>Estado</InputLabel>
                <CustomSelect
                  placeholder="Selecciona un estado"
                  options={options}
                  item={formProject.values.estado}
                  onSelect={handleSelectOcupacion}
                />
              </div>

            )
          }
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="titulo"
            label="Titulo"
            id="titulo"
            autoComplete="current-name"
            value={formProject.values.titulo}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.titulo && Boolean(formProject.errors.titulo)
            }
            helperText={formProject.touched.titulo && formProject.errors.titulo}
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="descripcion"
            label="Descripcion"
            id="descripcion"
            autoComplete="current-name"
            value={formProject.values.descripcion}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.descripcion &&
              Boolean(formProject.errors.descripcion)
            }
            helperText={
              formProject.touched.descripcion && formProject.errors.descripcion
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="objetivos_generales"
            label="Objetivo General"
            id="objetivos_generales"
            autoComplete="current-name"
            value={formProject.values.objetivos_generales}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.objetivos_generales &&
              Boolean(formProject.errors.objetivos_generales)
            }
            helperText={
              formProject.touched.objetivos_generales &&
              formProject.errors.objetivos_generales
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="alcance"
            label="Alcance"
            id="alcance"
            value={formProject.values.alcance}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.alcance && Boolean(formProject.errors.alcance)
            }
            helperText={
              formProject.touched.alcance && formProject.errors.alcance
            }
            sx={CssTexField}
          />
          <Divider textAlign="right">
            <Tooltip title="Agregar objetivo">
              <Fab
                size="small"
                aria-label="edit"
                onClick={handleAddInput}
                style={{
                  backgroundColor: "#FFFDFA",
                  boxShadow: "none",
                  zIndex: 0,
                }}
              >
                <AddCircleIcon
                  sx={{
                    color: "#319795",
                    fontSize: "35px",
                  }}
                />
              </Fab>
            </Tooltip>

          </Divider>
          {specifics.map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              {
                specifics.length > 1 && (
                  <Tooltip title="Eliminar">
                    <Fab
                      size="small"
                      aria-label="add"
                      onClick={() => cleanObjectSpecifics(index)}
                      sx={{
                        backgroundColor: "#FFFDFA",
                        boxShadow: "none",
                        marginTop: "22px",
                      }}
                    >
                      <ClearIcon />
                    </Fab>
                  </Tooltip>

                )
              }
              <TextField
                margin="normal"
                fullWidth
                multiline
                label="Objetivo especifico"
                value={specifics[index]}
                onChange={(event) => handleObjectSpecifics(event, index)}
                sx={CssTexField}
              />

            </div>
          ))}
          <Divider textAlign="right">
            <Tooltip title="Agregar referencia">
              <Fab
                size="small"
                aria-label="edit"
                onClick={handleAddLink}
                style={{
                  backgroundColor: "#FFFDFA",
                  boxShadow: "none",
                  zIndex: 0,
                }}
              >
                <AddCircleIcon
                  sx={{
                    color: "#319795",
                    fontSize: "35px",
                  }}
                />
              </Fab>
            </Tooltip>

          </Divider>
          {references.map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              {
                references.length > 1 && (
                  <Tooltip title="Eliminar">
                    <Fab
                      size="small"
                      aria-label="add"
                      onClick={() => cleanReferences(index)}
                      sx={{
                        backgroundColor: "#FFFDFA",
                        boxShadow: "none",
                        marginTop: "22px",
                      }}
                    >
                      <ClearIcon />
                    </Fab>
                  </Tooltip>

                )
              }
              <TextField
                margin="normal"
                fullWidth
                multiline
                label="Referencia Bibliografica"
                value={references[index]}
                onChange={(event) => handleReferences(event, index)}
                sx={CssTexField}
              />
            </div>
          ))}
        </Grid>
      </Box>
      <Backdrop
        sx={{
          backgroundColor: "rgba(155, 190, 200, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="primary" size={40} />
      </Backdrop>
    </Grid>
  );
}

export default EditProject;
