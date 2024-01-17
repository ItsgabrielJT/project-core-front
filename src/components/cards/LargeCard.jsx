import {
  Backdrop,
  Box,
  CircularProgress,
  Fab,
  Fade,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function LargeCard({ title, state, color, handleDetail, handleDelete, handleEdit, ...props }) {

  const isSmallScreen = useMediaQuery('(max-width:900px)');


  return (
    <Grid
      {...props}
      item
      sx={{
        marginTop: "20px",
        borderBottom: "2px solid #D9D9D9",
        borderRadius: "30px",
        padding: "40px 35px 15px 25px",
      }}
    >
      <Grid container>
        <Grid item xs={9}>

          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                backgroundColor: `${color}`,
                width: "20px",
                height: "20px",
                borderRadius: "50px",
              }}
            />
            <Typography
              variant="body1"
              style={{
                marginLeft: "10px",
              }}
            >
              {state === 1
                ? "Iniciado"
                : state === 2
                  ? "En curso"
                  : state === 3
                    ? "Finalizado"
                    : "En revision"}
            </Typography>
          </div>

          <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: "15px" }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{
          maxWidth: '50%',
          marginTop: isSmallScreen ? '15px' : '0px',
        }}>
          <div
            style={{
              display: "flex",
            }}
          >
            <Tooltip title="Editar">
              <Fab
                size="small"
                aria-label="edit"
                onClick={handleEdit}
                style={{
                  boxShadow: "none",
                  marginRight: "10px",

                }}
              >
                <CreateIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Eliminar">
              <Fab
                size="small"
                aria-label="edit"
                onClick={handleDelete}
                style={{
                  backgroundColor: "#FFB1B8",
                  boxShadow: "none",
                }}
              >
                <DeleteIcon
                  sx={{
                    color: "#DC3545",
                  }}
                />
              </Fab>
            </Tooltip>
            <Tooltip title="Ver detalles">
              <Fab
                size="small"
                aria-label="edit"
                onClick={handleDetail}
                style={{
                  backgroundColor: "#E1F9F3",
                  marginLeft: "10px",
                  boxShadow: "none",
                }}
              >
                <ContentPasteSearchIcon
                  sx={{
                    color: "#319795",
                  }}
                />
              </Fab>
            </Tooltip>


          </div>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default LargeCard;
