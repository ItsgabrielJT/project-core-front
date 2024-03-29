import React, { useEffect, useState } from "react";
import {
  CssTexField,
  Modal,
  ModalContent,
  StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalDialog from "@components/modals/ModalDialog";
import { useEdit } from "@hook/securities/useEdit";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import { colaboratorService } from "../../services/colaborators/colaboratorService";
import notificationService from "@services/notificationService";
import GroupIcon from "@mui/icons-material/Group";

const PERMISSIONS = ["Editar", "Eliminar"];

function EditColaborators({
  open,
  handleClose,
  idProject,
  onSuccess,
  colaborators,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [checked, setChecked] = useState([]);
  const [loadingPermission, setLoadingPermission] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);


  useEffect(() => {
    setUsers(colaborators);
  }, [colaborators]);

  useEffect(() => {}, [selectedIndex]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onClose = () => {
    handleClose();
    setChecked([]);
    setSelectedIndex(null);
    setLoadingPermission(false);
  };

  const handleListItemClick = (event, index, item) => {
    setLoadingPermission(true);
    setSelectedIndex(index);
    setUser(item.user);
    colaboratorService
      .getPermissions(idProject, item.user.id)
      .then((res) => {
        if (res.data.status) {
          let data = [];
          let { update_project, delete_project } = res.data.permiso.permission;
          if (update_project) {
            data.push(0);
          }
          if (delete_project) {
            data.push(1);
          }
          setChecked(data);
          setLoadingPermission(false);
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
        setLoadingPermission(false);
      });
  };

  const handleDeleteColaborator = () => {

    colaboratorService
      .deleteColaborator(user.id, idProject)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Colaborador eliminado correctamente");
          onClose();
          onSuccess(true);
          setOpenConfirm(false);
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      });
  };

  const handleSavePermission = () => {
    let json = {
      crear: false,
      actualizar: checked.indexOf(0) !== -1,
      eliminar: checked.indexOf(1) !== -1,
      visualizar: false,
    };
    colaboratorService
      .updatePermissions(idProject, user.id, json)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Permisos actualizados correctamente");
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      });
  };

  return (
    <>
    <ModalDialog
        title={`Quieres eliminar al usuario ${user.full_name}?` }
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteColaborator}
        slots={{ backdrop: StyledBackdrop }}
      />
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
        sx={{
          padding: "20px 20px 20px 20px",
        }}
      >
        <ModalContent sx={{ width: 600 }}>
          {users.length == 0 ? (
            <div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div>
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
              </div>
              <div style={{ marginTop: "5px", textAlign: "center" }}>
                <FaceRetouchingOffIcon
                  sx={{
                    fontSize: "50px",
                    color: "#9BBEC8",
                  }}
                />
                <Typography variant="h6">
                  Aun no hay colaboradores en tu proyecto
                </Typography>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div>
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
                </div>
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  <GroupIcon
                    sx={{
                      fontSize: "50px",
                      color: "#9BBEC8",
                    }}
                  />
                  <Typography variant="h6">
                    {" "}
                    Configurar Colaboradores
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={1} columns={16}>
                  <Grid
                    item
                    xs={7}
                    sx={{
                      marginTop: "30px",
                      overflow: "auto",
                      maxHeight: "190px",
                    }}
                  >
                    {users &&
                      users.map((item, index) => (
                        <ListItemButton
                          key={index}
                          selected={selectedIndex === index}
                          onClick={(event) =>
                            handleListItemClick(event, index, item)
                          }
                          sx={{
                            borderRadius: "30px",
                            marginBottom: "10px",

                            "&.Mui-selected": {
                              backgroundColor: "rgba(92, 221, 219, 0.3)",
                            },
                          }}
                        >
                          <ListItemText primary={item.user.full_name} />
                        </ListItemButton>
                      ))}
                  </Grid>
                  <Grid item xs={9} sx={{ marginTop: "22px" }}>
                    <List
                      sx={{ width: "100%", maxWidth: 360, bgcolor: "#FFFDFA" }}
                    >
                      {loadingPermission && (
                        <ListItem>
                          <Fade
                            in={loadingPermission}
                            style={{
                              transitionDelay: loadingPermission
                                ? "800ms"
                                : "0ms",
                            }}
                          >
                            <CircularProgress sx={{ marginLeft: "20px" }} />
                          </Fade>
                        </ListItem>
                      )}
                      {selectedIndex == null && (
                        <ListItem>
                          <Typography
                            variant="body1"
                            sx={{ marginTop: "5px", color: "#9AD0C2" }}
                          >
                            {" "}
                            Selecione un colaborador !{" "}
                          </Typography>
                        </ListItem>
                      )}

                      {PERMISSIONS.map((value, index) => {
                        const labelId = `checkbox-list-label-${index}`;

                        return (
                          <div key={index} >
                            {selectedIndex != null && !loadingPermission && (
                              <Fade
                                in={selectedIndex != null && !loadingPermission}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton
                                    sx={{
                                      borderRadius: "30px",
                                    }}
                                    role={undefined}
                                    onClick={handleToggle(index)}
                                    dense
                                  >
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(index) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                          "aria-labelledby": labelId,
                                        }}
                                        sx={{
                                          color: "#319795",
                                          "&.Mui-checked": {
                                            color: "rgba(92, 221, 219)",
                                          },
                                        }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      id={labelId}
                                      primary={value}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              </Fade>
                            )}
                          </div>
                        );
                      })}
                      {selectedIndex != null && (
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              marginTop: "15px",
                            }}
                          >
                            <Tooltip title="Guardar">
                              <Fab
                                size="small"
                                aria-label="edit"
                                disabled={selectedIndex == null}
                                onClick={handleSavePermission}
                                style={{
                                  boxShadow: "none",
                                  zIndex: 0,
                                  marginRight: "10px",
                                }}
                              >
                                <CheckIcon />
                              </Fab>
                            </Tooltip>
                            <Tooltip title="Eliminar Colaborador">
                              <Fab
                                size="small"
                                aria-label="edit"
                                onClick={() => setOpenConfirm(true)}
                                style={{
                                  backgroundColor: "#FFB1B8",
                                  boxShadow: "none",
                                  zIndex: 0,
                                }}
                              >
                                <PersonRemoveIcon
                                  sx={{
                                    color: "#DC3545",
                                  }}
                                />
                              </Fab>
                            </Tooltip>
                          </div>
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditColaborators;
