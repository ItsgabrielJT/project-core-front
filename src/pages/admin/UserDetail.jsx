import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Backdrop,
  CircularProgress,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CssContentInfo, StyledBackdrop } from "@constants/styles";
import EditUser from "./EditUser";
import { useUser } from "@hook/securities/useUser";
import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useAuth } from "../../context/AuthContext";
import { useStaticts } from "@hook/securities/useStaticts";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ModalDialog from "@components/modals/ModalDialog";
import LockResetIcon from "@mui/icons-material/LockReset";
import EditPassword from "./EditPassword";
import { accountService } from "@services/account/accountService";


function UserDetail() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cloudName] = useState("dnkst5hjn");
  const { id } = useParams();
  const { user } = useAuth();
  const { profile, loading } = useUser(success, id ? id : user.id);
  const { staticts } = useStaticts(success, id ? id : user.id);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const myImage = cld.image(profile ? profile.link_image : "");
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  const handleOpen = () => {
    setOpen(true);
    setSuccess(false);
  };
  const handleClose = () => setOpen(false);

  const handleOpenPassword = () => {
    setOpenPassword(true);
    setSuccess(false);
  };
  const handleClosePassword = () => setOpenPassword(false);

  const handleOpenModal = (event) => {
    handleClick(event);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    accountService
      .deleteUser(id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha eliminado correctamente");
          navigate("/admin/users");
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <>
      {profile ? (
        <Grid item xs={12}>
          <EditUser
            user={profile}
            open={open}
            handleClose={handleClose}
            onSuccess={setSuccess}
          />
          <ModalDialog
            title={"Quieres eliminar este usuario ?"}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleConfirm}
            slots={{ backdrop: StyledBackdrop }}
          />
          <EditPassword
            user={profile}
            open={openPassword}
            handleClose={handleClosePassword}
            onSuccess={setSuccess}
          />
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openPopover}
            onClose={handleClosePopover}
            onClick={handleClosePopover}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleOpen}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              Editar pefil
            </MenuItem>
            <MenuItem onClick={handleOpenPassword}>
              <ListItemIcon>
                <LockResetIcon />
              </ListItemIcon>
              Editar contraseña
            </MenuItem>
          </Menu>

          <Box
            sx={{
              marginTop: "53px",
              height: "100%",
              backgroundColor: "#FFFDFA",
              position: "overflow",
              boxShadow: "none",
              paddingX: "15px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  backgroundColor: "#ACCDDC",
                  height: "200px",
                }}
              />

              <AdvancedImage
                style={{
                  position: "absolute",
                  top: "90%",
                  left: isSmallScreen ? "21%" : "10%",
                  transform: "translate(-50%, -50%)",
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "60px",

                top: "350px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="h6">{profile.full_name}</Typography>
                <Typography variant="overline">
                  <div style={{ display: "flex" }}>
                    {profile.university_name} - {profile.career}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        marginLeft: "5px",
                        marginTop: "3px",
                        color: "#319795",
                      }}
                    >
                      / {profile.occupation}
                    </Typography>
                  </div>
                </Typography>
              </div>
              <div>
                {profile.id == user.id ? (
                  <Tooltip title="Configuraciones">
                    <Fab
                      aria-describedby={idPopover}
                      size="small"
                      aria-label="edit"
                      onClick={handleOpenModal}
                      style={{
                        boxShadow: "none",
                        marginRight: "10px",
                        zIndex: 0,
                      }}
                    >
                      <SettingsIcon />
                    </Fab>
                  </Tooltip>
                ) : (
                  <Tooltip title="Configuraciones">
                    <Fab
                      aria-describedby={idPopover}
                      size="small"
                      aria-label="edit"
                      onClick={() => setOpenDelete(true)}
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
                )}
              </div>
            </div>
            <div style={CssContentInfo}>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Acerca de
              </Typography>
              <div>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Correo electronico
                </Typography>
                <Typography variant="body2">{profile.email_user}</Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Celular
                </Typography>
                <Typography variant="body2">
                  {profile.cellphone_number}
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Paper
            sx={{
              marginTop: "53px",
              height: "100%",
              backgroundColor: "#FFFDFA",
              position: "overflow",
              boxShadow: "none",
            }}
          >
            <Backdrop
              sx={{
                color: "#blue",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
              invisible={true}
            >
              <CircularProgress color="primary" size={40} />
            </Backdrop>
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default UserDetail;
