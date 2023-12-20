import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ClearIcon from "@mui/icons-material/Clear";

function MediumCard({
  user,
  content,
  onConfirm,
  onRefuse,
  ...props
}) {
  return (
    <Grid
      {...props}
      container
      sx={{
        borderBottom: "2px solid #D9D9D9",
        borderRadius: "30px",
        padding: "40px 5px 15px 25px",
      }}
    >
      <Grid item xs={9}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
          }}
        >
          {user}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ButtonOutline
          text={"Aceptar"}
          onClick={onConfirm}
          style={{
            height: "33px",
            width: "115px",
            marginBottom: "10px",
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          {content}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ButtonOutline
          text={"Rechazar"}
          onClick={onRefuse}
          style={{
            height: "33px",
            width: "115px",
            marginBottom: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default MediumCard;
