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
import notificationService from "@services/notificationService"
import { useNavigate } from "react-router";
import {
  CssButtonContained
} from "@constants/styles";
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditColaborators from "./EditColaborators";
import { CustomizedPopover } from "../../assets/statics/constants/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";


var idLogin = JSON.parse(localStorage.getItem("id"));

function DetailProject() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { project, loading } = useDetail(id);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleOpenModal = (event) => {
    if (project.userId != idLogin) {
      handleClick(event)
    } else {
      setOpenModal(true)
      setSuccess(false)
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Grid item xs={12}>
      <EditColaborators
        open={openModal}
        handleClose={handleCloseModal}
        onSuccess={setSuccess}
        colaborators={project ? project.colaborators : []}
      />
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
        <List>
          {
            project && project.colaborators.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  borderRadius: '30px',
                  marginBottom: '10px',

                  '&.Mui-selected': {
                    backgroundColor: 'rgba(92, 221, 219, 0.3)',
                  }
                }}

              >
                <AccountCircleIcon
                  style={{
                    width: "30px",
                    height: "auto",
                    borderRadius: "8px",
                    marginRight: '7px'
                  }}
                />
                <ListItemText primary={item.user.full_name} />
              </ListItem>
            ))
          }
        </List>
      </CustomizedPopover>
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
          <Typography
            variant="body1"
            sx={{ fontSize: 13, marginBottom: "3px", color: "#355890", fontWeight: "bold" }}
          >
            {format(new Date(project.fecha), 'EEEE, d MMMM yyyy')}
          </Typography>

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
                  justifyContent: 'end',
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
              {/* <Button
                style={{
                  color: "white",
                  width: "110px",
                  height: "30px",
                  marginTop: '15px'
                }}
                sx={CssButtonContained}
              >
                <PersonAddIcon />
                Invitar
              </Button> */}

              <Button
                aria-describedby={idPopover}
                style={{
                  color: "white",
                  width: "170px",
                  height: "30px",
                  marginTop: '15px'
                }}
                onClick={handleOpenModal}
                sx={CssButtonContained}
              >
                <GroupIcon />
                Colaboradores
              </Button>
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
