import {
  Backdrop,
  Badge,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonContained from "@components/buttons/ButtonContained";
import Fab from "@mui/material/Fab";
import { CssContentInfo, StyledBackdrop } from "@constants/styles";
import ModalDialog from "@components/modals/ModalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useDetail } from "@hook/projects/useDetail";
import { useParams } from "react-router";
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"
import { useNavigate } from "react-router";


var idLogin = JSON.parse(localStorage.getItem("id"));

function DetailProject() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { project, loading } = useDetail(id);
  const navigate = useNavigate()

  const handleConfirm = () => {
    projectService.deleteProject(id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha eliminado correctamente")
          navigate("/home")
        }
      })
      .catch((err) => {
        notificationService.error(err.message)
      })
      .finally(() => {
        setOpen(false);
      })
  };

  const editProject = () => {
    navigate(`/projects/${id}/edit`)
  }

  return (
    <Grid item xs={12}>
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
          {project.userId != idLogin && (
            <>
              <div style={{ display: 'flex' }}>
                <Typography variant="body1" sx={{
                  fontWeight: "bold",
                  fontSize: "16px"
                }}>
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
              <Typography variant="overline" sx={{ display: 'flex' }}>
                {project.university_name} -

              </Typography>
            </>
          )}

          <div
            style={{
              backgroundColor: "#D9D9D9",
              height: "250px",
              margin: "17px 0px 0px 0px",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>

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
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "orange",
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
              <ButtonContained
                text={"Colaboradores"}
                style={{
                  width: "120px",
                  height: "32px",
                  marginTop: "20px",
                }}
              ></ButtonContained>
              {project.userId == idLogin && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "15px",
                    }}
                  >
                    <Fab
                      size="small"
                      aria-label="edit"
                      onClick={editProject}
                      style={{
                        backgroundColor: "#FFFDFA",
                        boxShadow: "none",
                        zIndex: 0,
                      }}
                    >
                      <CreateIcon />
                    </Fab>
                    <Fab
                      size="small"
                      aria-label="edit"
                      onClick={() => setOpen(true)}
                      style={{
                        backgroundColor: "#FFFDFA",
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
                  </div>
                </>
              )}

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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}

                />
                <ListItem sx={{ height: '20px', marginBottom: '30px' }}>
                  <ListItemText
                    primary={project.description}
                    sx={{
                      whiteSpace: 'pre-line', overflowWrap: 'break-word', maxHeight: '3em', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,

                    }}
                  />
                </ListItem>
              </List>
            </div>
            <div >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Objetivo General
              </Typography>
              <List dense={true}>
                {project.general_objetive.map((item, index) => (
                  <>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}

                    />
                    <ListItem sx={{ height: '20px', marginBottom: '40px' }}>

                      <ListItemText
                        primary={item}
                        sx={{
                          whiteSpace: 'pre-line', overflowWrap: 'break-word', maxHeight: '3em', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,

                        }}
                      />
                    </ListItem>
                  </>

                ))}
              </List>
            </div>
            <div >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Objetivos Especificos
              </Typography>
              <List dense={true}>

                {project.specific_object.map((item, index) => (
                  <>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}

                    />
                    <ListItem sx={{ height: '20px', marginBottom: '40px' }}>
                      <ListItemText
                        primary={item}
                        sx={{
                          whiteSpace: 'pre-line', overflowWrap: 'break-word', maxHeight: '3em', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,

                        }}
                      />
                    </ListItem>
                  </>
                ))}
              </List>
            </div>
            <div >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Alcance
              </Typography>
              <List dense={true}>
                <Badge
                  color="primary"
                  variant="dot"
                  badgeContent=" "
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                />
                <ListItem sx={{ height: '20px', marginBottom: '40px' }}>

                  <ListItemText
                    primary={project.scope}
                    sx={{
                      whiteSpace: 'pre-line', overflowWrap: 'break-word', maxHeight: '3em', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,

                    }}
                  />
                </ListItem>
              </List>
            </div>
            <div >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Referencias
              </Typography>
              <List dense={true}>
                {project.bibliographic_references.map((item, index) => (
                  <>
                    <Badge
                      color="primary"
                      variant="dot"
                      badgeContent=" "
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}

                    />
                    <ListItem sx={{ height: '20px', marginBottom: '40px' }}>
                      <ListItemText
                        primary={item}
                        sx={{
                          whiteSpace: 'pre-line', overflowWrap: 'break-word', maxHeight: '3em', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,

                        }}
                      />
                    </ListItem>
                  </>
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

export default DetailProject;
