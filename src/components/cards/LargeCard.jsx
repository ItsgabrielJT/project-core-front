import {
  Backdrop,
  Box,
  CircularProgress,
  Fab,
  Fade,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

function LargeCard({ title, state, handleDetail, handleDelete,handleEdit, ...props }) {
  return (
    <Grid
    {...props}
      container
      sx={{
        marginTop: "20px",
        borderBottom: "2px solid #D9D9D9",
        borderRadius: "30px",
        padding: "40px 5px 15px 25px",
      }}
    >
      <Grid item xs={9}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
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
              {state === 1
                    ? "Iniciado"
                    : state === 2
                      ? "En curso"
                      : state === 3
                        ? "Finalizado"
                        : "En revision"}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "25px",
            }}
          >
            <PersonRoundedIcon />
            <Typography variant="body1">4</Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "40px",
          }}
        >
          <Fab
            size="small"
            aria-label="edit"
            onClick={handleEdit}
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
            onClick={handleDelete}
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
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ButtonOutline
          text={"Ver detalles"}
          style={{
            height: "33px",
            width: "120px",
            marginBottom: "10px",
          }}
          onClick={handleDetail}
        />
      </Grid>
    </Grid>
  );
}

export default LargeCard;
