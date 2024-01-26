import {
  Autocomplete,
  Avatar,
  Divider,
  Fab,
  Fade,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "@images/logos/logo.png";
import {
  CustomizedPopover,
  StyledBackdrop,
  ModalContent,
} from "@constants/styles";
import { useAuth } from "../context/AuthContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useProjects } from "@hook/projects/useProjects";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import QueueIcon from "@mui/icons-material/Queue";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logOut, user } = useAuth();
  const [cloudName] = useState("dnkst5hjn");
  const { dataHome, loading } = useProjects();
  const [dataSelect, setDataSelect] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  const openMenu = Boolean(anchorElMenu);

  useEffect(() => {
    let data = [];
    if (dataHome) {
      dataHome.map((item) => {
        data.push({
          label: item.title_project,
          idProject: item.idProject,
        });
      });
      setDataSelect(data);
    }
  }, [dataHome]);

  const handleRedirecTo = (value) => {
    navigate(value);
  };

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleClickSearch = () => {
    setSearchModal(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const perfil = cld.image(user ? user.linkImagen : "");

  const selectProject = (value) => {
    setValue(value);
    navigate(`/projects/${value.idProject}`);
    setSearchModal(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={searchModal}
        onClose={() => setSearchModal(false)}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
        sx={{
          padding: "20px 20px 20px 20px",
        }}
      >
        <Fade in={searchModal}>
          <ModalContent sx={{ width: 285, height: 300 }}>
            <Autocomplete
              freeSolo
              size="small"
              disablePortal
              id="combo-box-demo"
              value={value}
              onChange={(event, newValue) => {
                selectProject(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={dataSelect}
              sx={{
                "& .MuiAutocomplete-inputRoot": {
                  "& fieldset": {
                    borderRadius: "50px",
                    border: "1.2px solid #319795",
                  },
                  "&:hover fieldset": {
                    border: "1.2px solid #9AD0C2",
                    borderRadius: "50px",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1.2px solid #5CDDDB",
                    borderRadius: "50px",
                  },
                },
              }}
              renderInput={(params) => <TextField {...params} label="Buscar" />}
            />
          </ModalContent>
        </Fade>
      </Modal>
      <Grid
        item
        sx={{
          backgroundColor: "rgba(242, 241, 238, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          width: "99%",
          position: "fixed",
          top: 0,
        }}
      >
        <Grid item>
          <img
            src={logo}
            alt=""
            style={{
              width: "80px",
              height: "auto",
              borderRadius: "8px",
              marginTop: "6px",
              marginLeft: "20px",
              marginBottom: "6px",
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginLeft: isSmallScreen ? "auto" : "260px",
            width: isSmallScreen ? "0px" : "30%",
            marginTop: "6px",
            marginBottom: "6px",
          }}
        >
          {!isSmallScreen && (
            <Autocomplete
              freeSolo
              size="small"
              disablePortal
              id="combo-box-demo"
              value={value}
              onChange={(event, newValue) => {
                selectProject(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={dataSelect}
              sx={{
                "& .MuiAutocomplete-inputRoot": {
                  "& fieldset": {
                    borderRadius: "50px",
                    border: "1.2px solid #319795",
                  },
                  "&:hover fieldset": {
                    border: "1.2px solid #9AD0C2",
                    borderRadius: "50px",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1.2px solid #5CDDDB",
                    borderRadius: "50px",
                  },
                },
              }}
              renderInput={(params) => <TextField {...params} label="Buscar" />}
            />
          )}
        </Grid>
        <Grid item>
          {!isSmallScreen ? (
            <>
              <Fab
                aria-describedby={id}
                onClick={handleClick}
                sx={{
                  width: "70%",
                  height: "10px",
                  borderRadius: "20px",
                  boxShadow: "none",
                  backgroundColor: "#F2F1EE",
                  marginTop: "6px",
                  marginBottom: "6px",
                  marginLeft: "60px",
                  display: "flex",
                }}
              >
                {user.linkImagen == "default" ? (
                  <PersonRoundedIcon />
                ) : (
                  <AdvancedImage
                    style={{
                      width: "40px",
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
                  variant="body2"
                  sx={{
                    marginRight: "15px",
                    marginLeft: "10px",
                  }}
                >
                  {user.nombreCompleto}
                </Typography>
              </Fab>
              <CustomizedPopover
                id={id}
                open={open}
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
                <Fab
                  style={{ display: "flex" }}
                  sx={{
                    width: "40vh",
                    height: "10px",
                    borderRadius: "20px",
                    boxShadow: "none",
                    backgroundColor: "#F2F1EE",
                    display: "flex",
                  }}
                  onClick={logOut}
                >
                  <Logout />
                  <Typography
                    variant="body2"
                    style={{
                      marginLeft: "10px",
                      marginRight: "45px",
                      marginTop: "3px",
                    }}
                  >
                    Cerrar sesion.
                  </Typography>
                </Fab>
              </CustomizedPopover>
            </>
          ) : (
            <>
              <Tooltip title="search">
                <IconButton
                  onClick={handleClickSearch}
                  size="small"
                  sx={{ marginRight: "10px" }}
                >
                  <SearchIcon sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickMenu}
                  size="small"
                  sx={{ marginRight: "10px" }}
                >
                  {user.linkImagen == "default" ? (
                    <PersonRoundedIcon 
                      sx={{ fontSize: 30 }}
                    />
                  ) : (
                    <AdvancedImage
                      style={{
                        width: "35px",
                        height: "35px",
                        marginRight: "10px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      cldImg={perfil}
                      plugins={[responsive(), placeholder()]}
                    />
                  )}
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "100%",
                    height: "100%",
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
                <MenuItem onClick={() => handleRedirecTo("/home")}>
                  <ListItemIcon>
                    <HomeRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  Home
                </MenuItem>
                <MenuItem onClick={() => handleRedirecTo("/notifications")}>
                  <ListItemIcon>
                    <MailOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  Notificaciones
                </MenuItem>
                <MenuItem onClick={() => handleRedirecTo("/projects")}>
                  <ListItemIcon>
                    <FileCopyOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Mis proyectos
                </MenuItem>
                <MenuItem onClick={() => handleRedirecTo("/projects/follow")}>
                  <ListItemIcon>
                    <LibraryAddCheckIcon fontSize="small" />
                  </ListItemIcon>
                  Proyectos seguidos
                </MenuItem>
                <MenuItem onClick={() => handleRedirecTo("/user")}>
                  <ListItemIcon>
                    <PersonRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
                <MenuItem onClick={() => handleRedirecTo("/create/project")}>
                  <ListItemIcon>
                    <QueueIcon fontSize="small" />
                  </ListItemIcon>
                  Crear proyecto
                </MenuItem>
                <Divider />

                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesion
                </MenuItem>
              </Menu>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
