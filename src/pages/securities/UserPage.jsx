import {
  Avatar,
  Backdrop,
  Box,
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
import React, { useEffect, useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from "./EditUser";
import { ResponsiveBar, ResponsiveBarCanvas } from "@nivo/bar";
import { useUser } from "@hook/securities/useUser";
import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useAuth } from "../../context/AuthContext";
import { useStaticts } from "@hook/securities/useStaticts";
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomizedPopover } from "../../assets/statics/constants/styles";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditPassword from "./EditPassword";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';


const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

function UserPage() {
  const [open, setOpen] = useState(false);
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
  const isSmallScreen = useMediaQuery('(max-width:800px)');


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

  const valueFormatter = (value) => `${value} proyecto`;

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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                {profile.id == user.id && (
                  <Tooltip title="Configuraciones">
                    <Fab
                      aria-describedby={idPopover}
                      size="small"
                      aria-label="edit"
                      onClick={handleOpenModal}
                      style={{
                        boxShadow: "none",
                        marginRight: "10px",
                        zIndex: 0
                      }}
                    >
                      <SettingsIcon
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
            <div style={CssContentInfo}>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Estadisticas
              </Typography>
              <BarChart
                dataset={staticts ? staticts : dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'mes' }]}
                margin={{ top: 80, left: 10, right: 30, bottom: 20 }}
                width={isSmallScreen ? 300 : 650}
                series={[
                  { dataKey: 'iniciado', label: 'Iniciado', valueFormatter },
                  { dataKey: 'enProceso', label: 'En proceso', valueFormatter },
                  { dataKey: 'finalizado', label: 'Finalizado', valueFormatter },
                  { dataKey: 'enRevision', label: 'En revision', valueFormatter },
                ]}
                {...chartSetting}
              />
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

export default UserPage;
