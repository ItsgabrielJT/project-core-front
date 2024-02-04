import {
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { CssContentInfo, StyledBackdrop } from "@constants/styles";
import ModalDialog from "@components/modals/ModalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useDetail } from "@hook/projects/useDetail";
import { useParams } from "react-router";
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService";
import { useNavigate } from "react-router";
import { CssButtonContained } from "@constants/styles";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { CustomizedPopover } from "../../assets/statics/constants/styles";
import { format } from "date-fns";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useAuth } from "../../context/AuthContext";
import ListColaborators from "./ListColaborators";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { usePermissions } from "../../hooks/colaborators/usePermissions";

function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [success, setSuccess] = useState(true);
  const [open, setOpen] = useState(false);
  const [cloudName] = useState("dnkst5hjn");
  const { user } = useAuth();
  const { project, loading, isColaborator } = useDetail(id, user, success);
  const { permission } = usePermissions(id, user.id, isColaborator)
  const [openModal, setOpenModal] = useState(false);
  const [openListColaborator, setOpenListColaborators] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseListColaborators = () => {
    setOpenListColaborators(false);
  };

  const handleConfirm = () => {
    projectService
      .deleteProject(id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha eliminado correctamente");
          navigate("/admin/projects");
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handleOpenModal = (event) => {
    setSuccess(false);
    if (project.userId != user.id) {
      setOpenListColaborators(true);
    } else {
      setOpenModal(true);
      setSuccess(false);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const perfil = cld.image(project ? project.link_image_user : "");
  const proyecto = cld.image(project ? project.link_image_project : "");

  return (
    <Grid item xs={12}>
      
      <ListColaborators
        open={openListColaborator}
        handleClose={handleCloseListColaborators}
        idProject={id}
        colaborators={project ? project.colaborators : []}
      />
      <ModalDialog
        title={"Quieres eliminar este proyecto ?"}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        slots={{ backdrop: StyledBackdrop }}
      />
      {project ? (
        <Grid
          sx={{
            marginTop: "80px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "15px",
            boxShadow: "none",
          }}
        >
          {project.userId != user.id && (
            <>
              <div style={{ display: "flex" }}>
                {project.link_image_user == "default" ? (
                  <AccountCircleIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden", 
                    }}
                  />
                ) : (
                  <AdvancedImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                    cldImg={perfil}
                    plugins={[responsive(), placeholder()]}
                  />
                )}

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {project.full_name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    marginLeft: "5px",
                    marginTop: "2px",
                    color: "#319795",
                    fontWeight: "bold",
                  }}
                >
                  / {project.occupation}
                </Typography>
              </div>
              <Typography variant="overline" sx={{ display: "flex" }}>
                {project.university_name} - {project.career}
              </Typography>
            </>
          )}
          <Typography
            variant="body1"
            sx={{
              fontSize: 13,
              marginBottom: "3px",
              color: "#355890",
              fontWeight: "bold",
            }}
          >
            {format(new Date(project.fecha), "EEEE, d MMMM yyyy")}
          </Typography>

          <AdvancedImage
            style={{
              width: "100%",
              height: "290px",
              margin: "17px 0px 0px 0px",
              backgroundColor: "#D9D9D9",
              objectFit: "cover",
              borderRadius: "30px",
              overflow: "hidden",
            }}
            cldImg={proyecto}
            plugins={[responsive(), placeholder()]}
          />

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: `${project.color}`,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50px",
                  }}
                />
                <Typography
                  variant="body1"
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {project.state === 1
                    ? "Iniciado"
                    : project.state === 2
                    ? "En curso"
                    : project.state === 3
                    ? "Finalizado"
                    : "En revision"}
                </Typography>
              </div>
              <Tooltip title="Colaboradores">
                <Fab
                  size="small"
                  aria-label="edit"
                  onClick={handleOpenModal}
                  style={{
                    backgroundColor: "#E1F9F3",
                    boxShadow: "none",
                    zIndex: 0,
                    marginRight: "10px",
                    marginTop: "15px",
                  }}
                >
                  <GroupIcon
                    sx={{
                      color: "#319795",
                    }}
                  />
                </Fab>
              </Tooltip>
             
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "15px",
                    }}
                  >
                   
                    <Tooltip title="Eliminar">
                      <Fab
                        size="small"
                        aria-label="edit"
                        onClick={() => setOpen(true)}
                        style={{
                          backgroundColor: "#FFB1B8",
                          boxShadow: "none",
                          zIndex: 0,
                        }}
                      >
                        <DeleteIcon
                          sx={{
                            color: "#DC3545",
                          }}
                        />
                      </Fab>
                    </Tooltip>
                  </div>
                </>
            </div>
          </div>

          <div style={CssContentInfo}>
            <div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {project.title_project}
              </Typography>
              <List dense={true}>
                <Badge
                  color="primary"
                  variant="dot"
                  badgeContent=" "
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                />
                <ListItem sx={{}}>
                  <ListItemText primary={project.description} />
                </ListItem>
              </List>
            </div>
            <div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Objetivo General
              </Typography>
              <List dense={true}>
                {project.general_objetive.map((item, index) => (
                  <div key={index}>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    />
                    <ListItem sx={{}}>
                      <ListItemText primary={item} />
                    </ListItem>
                  </div>
                ))}
              </List>
            </div>
            <div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Objetivos Especificos
              </Typography>
              <List dense={true}>
                {project.specific_object.map((item, index) => (
                  <div key={index}>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    />
                    <ListItem sx={{}}>
                      <ListItemText primary={item} />
                    </ListItem>
                  </div>
                ))}
              </List>
            </div>
            <div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Alcance
              </Typography>
              <List dense={true}>
                <Badge
                  color="primary"
                  variant="dot"
                  badgeContent=" "
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                />
                <ListItem sx={{}}>
                  <ListItemText primary={project.scope} />
                </ListItem>
              </List>
            </div>
            <div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Referencias
              </Typography>
              <List dense={true}>
                {project.bibliographic_references.map((item, index) => (
                  <div key={index}>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    />
                    <ListItem sx={{}}>
                      <ListItemText
                        primary={item}
                        sx={{
                          whiteSpace: "pre-line",
                          overflowWrap: "break-word",
                          textOverflow: "ellipsis",
                          maxHeight: "3em", // Establece la altura máxima que deseas
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          marginBottom: "10px", // Ajusta el margen inferior según tus preferencias
                        }}
                      />
                    </ListItem>
                  </div>
                ))}
              </List>
            </div>
          </div>
        </Grid>
      ) : (
        <Box
          sx={{
            marginTop: "60px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "15px",
            boxShadow: "none",
          }}
        >
          <Backdrop
            sx={{ color: "#blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            invisible={true}
          >
            <CircularProgress color="primary" size={40} />
          </Backdrop>
        </Box>
      )}
    </Grid>
  );
}

export default ProjectDetail;
