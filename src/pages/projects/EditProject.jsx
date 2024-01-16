import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { CssTexField } from "@constants/styles";
import { useEdit } from "@hook/projects/useEdit";
import Fab from "@mui/material/Fab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MagicMotion } from "react-magic-motion";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";
import CloudinaryUploadWidget from "@components/modals/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { CustomizedPopover } from "../../assets/statics/constants/styles";
import { useUsers } from "@hook/colaborators/useUsers";
import notificationService from "@services/notificationService";
import { colaboratorService } from "@services/colaborators/colaboratorService";

function EditProject() {
  const { id } = useParams();
  const [publicId, setPublicId] = useState("");

  const {
    formProject,
    specifics,
    references,
    loading,
    handleObjectSpecifics,
    cleanObjectSpecifics,
    handleReferences,
    cleanReferences,
  } = useEdit(id, publicId, setPublicId);
  const [inputs, setInputs] = useState([""]);
  const [links, setLinks] = useState([""]);
  const [uploadPreset] = useState("o0bi0kjz");
  const { users } = useUsers();
  const [cloudName] = useState("dnkst5hjn");

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const [proyecto, setPrpyectoImage] = useState("")
  const [proyectoEdit, setProyectoEditImage] = useState("")

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "project-core-projects", //upload files to the specified folder
    clientAllowedFormats: ["jpg", "png"], //restrict uploading to image files only
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    theme: "blue", //change to a purple theme
  });

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (event) => {
    handleClick(event);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    cleanObjectSpecifics(index);
  };

  const handleAddLink = () => {
    setLinks([...links, ""]);
  };

  const handleRemoveLink = (index) => {
    const newInputs = [...links];
    newInputs.splice(index, 1);
    setLinks(newInputs);
    cleanReferences(index);
  };

  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName,
      },
    });

    const proyecto = cld.image(publicId);
    const proyectoEdit = cld.image(
      formProject ? formProject.values.link_imagen : ""
    );
    setPrpyectoImage(proyecto);
    setProyectoEditImage(proyectoEdit);
  }, [publicId])



  const handleInvite = (idUser) => {
    let json = {
      id_proyecto: id,
      id_usuario_colaborador: idUser,
    };
    colaboratorService
      .inviteColaborate(json)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha enviado la invitacion");
          setAnchorEl(null);

        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      });
  };

  return (
    <Grid item xs={12}>
      <CustomizedPopover
        id={idPopover}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          sx={{
            maxHeight: "150px", // ajusta la altura máxima según sea necesario
            overflowY: "auto", // añade un scrollbar si el contenido excede la altura máxima
          }}
        >
          {users &&
            users.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  borderRadius: "30px",
                  marginBottom: "10px",

                  "&.Mui-selected": {
                    backgroundColor: "rgba(92, 221, 219, 0.3)",
                  },
                }}
              >
                <AccountCircleIcon
                  style={{
                    width: "30px",
                    height: "auto",
                    borderRadius: "8px",
                    marginRight: "7px",
                  }}
                />
                <ListItemText primary={item.full_name} />
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => handleInvite(item.id)}
                >
                  <PersonAddAlt1Icon />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </CustomizedPopover>
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
        )}

        <Grid
          component="form"
          onSubmit={formProject.handleSubmit}
          sx={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              justifyContent: "end",
            }}
          >
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
            autoComplete="current-name"
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
          {inputs.map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              {
                inputs.length > 1 && (
                  <Tooltip title="Eliminar">
                    <Fab
                      size="small"
                      aria-label="add"
                      onClick={() => handleRemoveInput(index)}
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
                  label="Objetivo Specifico"
                  autoComplete="current-name"
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
          {links.map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              {
                links.length > 1 && (
                  <Tooltip title="Eliminar">
                    <Fab
                      size="small"
                      aria-label="add"
                      onClick={() => handleRemoveLink(index)}
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
                autoComplete="current-name"
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
