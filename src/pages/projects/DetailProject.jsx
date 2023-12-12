import {
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import Fab from "@mui/material/Fab";
import { CssContentInfo, StyledBackdrop } from "@constants/styles";
import ModalDialog from "@components/modals/ModalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

function DetailProject() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12}>
      <ModalDialog
        title={"Quieres eliminar este proyecto ?"}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        slots={{ backdrop: StyledBackdrop }}
      />
      <Paper
        sx={{
          marginTop: "90px",
          height: "100%",
          backgroundColor: "#FFFDFA",
          position: "overflow",
          boxShadow: "none",
        }}
      >
        <div
          style={{
            backgroundColor: "#D9D9D9",
            height: "200px",
            margin: "40px 40px 0px 65px",
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
              padding: "20px 35px 10px 65px",
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
                Iniciado
              </Typography>
            </div>
            <ButtonContained
              text={"Colaboradores"}
              style={{
                width: "120px",
                height: "32px",
              }}
            ></ButtonContained>
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
                style={{
                  backgroundColor: "#FFFDFA",
                  boxShadow: "none",
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
                }}
              >
                <DeleteIcon
                  sx={{
                    color: "#DC3545",
                  }}
                />
              </Fab>
            </div>
          </div>
        </div>

        <div style={CssContentInfo}>
          <div>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Inteligencia articial en el mundo de la Biotecnologia
            </Typography>
            <Typography variant="body2" sx={{}}>
              En el mundo del sfotware se ha dado bastante obejtivos
              dadhskjdhhfkdhfhskfhasdkfhskdhfksdhfkasdhfkasdhlfkhasdkfhskhk
              hsdkhjkshfklshfkjshfkasfhkaslfhasdklfhasdfsd
            </Typography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Objetivo General
            </Typography>
            <Typography variant="body2">
              En el mundo del sfotware se ha dado bastante obejtivos
              dadhskjdhhfkdhfhskfhasdkfhskdhfksdhfkasdhfkasdhlfkhasdkfhskhk
              hsdkhjkshfklshfkjshfkasfhkaslfhasdklfhasdfsd
            </Typography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Objetivos Especificos
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "7px",
                  backgroundColor: "blue",
                  width: "15px",
                  height: "8px",
                  borderRadius: "100px",
                  marginRight: "10px",
                }}
              />
              En el mundo del sfotware se ha dado bastante obejtivos
              dadhskjdhhfkdhfhskfhasdkfhskdhfksdhfkasdhfkasdhlfkhasdkfhskhk
              hsdkhjkshfklshfkjshfkasfhkaslfhasdklfhasdfsd
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  marginTop: "7px",
                  backgroundColor: "blue",
                  width: "15px",
                  height: "8px",
                  borderRadius: "100px",
                  marginRight: "10px",
                }}
              />
              En el mundo del sfotware se ha dado bastante obejtivos
              dadhskjdhhfkdhfhskfhasdkfhskdhfksdhfkasdhfkasdhlfkhasdkfhskhk
              hsdkhjkshfklshfkjshfkasfhkaslfhasdklfhasdfsd
            </Typography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Alcance
            </Typography>
            <Typography variant="body2">
              En el mundo del sfotware se ha dado bastante obejtivos
              dadhskjdhhfkdhfhskfhasdkfhskdhfksdhfkasdhfkasdhlfkhasdkfhskhk
              hsdkhjkshfklshfkjshfkasfhkaslfhasdklfhasdfsd
            </Typography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Referencias
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "7px",
                  backgroundColor: "blue",
                  width: "8px",
                  height: "8px",
                  borderRadius: "100px",
                  marginRight: "10px",
                }}
              />
              https://github.com/ItsgabrielJT
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  marginTop: "7px",
                  backgroundColor: "blue",
                  width: "8px",
                  height: "8px",
                  borderRadius: "100px",
                  marginRight: "10px",
                }}
              />
              https://github.com/ItsgabrielJT
            </Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default DetailProject;
