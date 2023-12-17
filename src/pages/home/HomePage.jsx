import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";

import React from 'react'

const HomePage = () => {
  return (
      <Box
        sx={{
          height: '100%',
          backgroundColor: '#FFFDFA',
          position: 'overflow',
          boxShadow: 'none',
          paddingX: '15px',
        }}
      >
        <Grid content sx={{
          borderBottom: '1px solid gray',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: "space-between",
            marginTop: "90px",
            marginBottom: "25px",
          }}>
            <Typography variant="body1">
              <div style={{ display: 'flex' }}>
                Roberto Andrade Marin
                <Typography variant='subtitle2' sx={{
                  marginLeft: "5px",
                  marginTop: "2px",
                  color: "#319795",
                  fontWeight: "bold",
                }}>
                  / Profesor
                </Typography>
              </div>
            </Typography>

          </div>
          <div>
                <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                   Inteligencia artifical en la biologia
                </Typography>
                <Typography variant='body2'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda id veritatis mollitia aliquid culpa! Possimus accusamus eum cumque voluptatibus nostrum aspernatur, unde pariatur et, magni consequatur aut inventore, ipsa ducimus.
                </Typography>
                <img  
                style={{ width: '100%', maxWidth: '100%', borderRadius: '25px' }}
                alt="Biotechnology"
                src='https://concepto.de/wp-content/uploads/2020/04/biotecnologia-e1585967651782.jpg'/>
          </div>
          <div style={{ display: "flex", justifyContent: 'end', marginTop: '10px', marginBottom: '15px'}}>
            <ButtonContained text={"Unirse"}  style={{ width: '25px', height: '30px', marginRight: '10px' }} />
            <ButtonOutline text={"Ver"} style={{ width: '25px', height: '30px' }} />
          </div>
        </Grid>
      </Box>
  )
}

export default HomePage