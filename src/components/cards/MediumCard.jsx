import { Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import ClearIcon from "@mui/icons-material/Clear";

function MediumCard({
  user,
  content,
  onConfirm,
  onRefuse,
  ...props
}) {

  const isSmallScreen = useMediaQuery('(max-width:900px)');


  return (
    <Grid
      {...props}
      item
      sx={{
        borderBottom: "2px solid #D9D9D9",
        borderRadius: "30px",
        padding: "40px 55px 15px 25px",
      }}
    >
      <Grid container>
        <Grid item xs={10} md={10}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
            }}
          >
            {user}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
        </Grid>
        
        <Grid item xs={3} md={2} sx={{
          display: isSmallScreen ? "flex" : "",
          marginTop: isSmallScreen ? "15px" : "0px",
          maxWidth: isSmallScreen ? "60%" : "25%",


        }}>

          <ButtonContained
            text={"Aceptar"}
            onClick={onConfirm}
            style={{
              height: "33px",
              width: "115px",
              marginBottom: "10px",
          
            }}
          />
          <ButtonOutline
            text={"Rechazar"}
            onClick={onRefuse}
            style={{
              height: "33px",
              width: "115px",
              marginBottom: "10px",
              marginLeft: isSmallScreen ? "10px" : '0px',
            }}
          />
        </Grid>

      </Grid>




    </Grid>
  );
}

export default MediumCard;
