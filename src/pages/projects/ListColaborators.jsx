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
  Autocomplete,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import GroupIcon from "@mui/icons-material/Group";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ListColaborators({ open, handleClose, idProject, colaborators }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [checked, setChecked] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [dense, setDense] = React.useState(false);
  const [value, setValue] = useState(null);
  const [cloudName] = useState("dnkst5hjn");

  useEffect(() => {
    let data = [];
    if (colaborators) {
      colaborators.map((item) => {
        data.push(item.user);
      });
      setUsers(data);
    }
  }, [colaborators]);

  const onClose = () => {
    handleClose();
    setChecked([]);
    setSelectedIndex(null);
  };

  const selectUser = (value) => {
    navigate(`/user/${value}`);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
        sx={{
          padding: "20px 20px 20px 20px",
          height: "auto",
        }}
      >
        <ModalContent sx={{ width: 400 }}>
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
                  Aun no hay colaboradores en el proyecto
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
                  <Typography variant="h6">Colaboradores</Typography>
                </div>
              </div>
              
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                  maxHeight: "240px",
                }}
              >
                <List dense={dense}>
                  {users.map((item, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <Tooltip title="Ver perfil">
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => selectUser(item.id)}
                          >
                            <PersonSearchIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {item.link_image == "default" ? (
                            <AccountCircleIcon
                              sx={{
                                width: "48px",
                                height: "48px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                            />
                          ) : (
                            <AdvancedImage
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                              cldImg={cld.image(item.link_image)}
                              plugins={[responsive(), placeholder()]}
                            />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.occupation}
                        secondary={item.full_name}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListColaborators;
