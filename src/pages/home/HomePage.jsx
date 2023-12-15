import { Container, Grid, Paper, Typography } from '@mui/material'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";

import React from 'react'

const HomePage = () => {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          height: '100%',
          backgroundColor: '#FFFDFA',
          position: 'overflow',
          boxShadow: 'none',
          paddingLeft: "65px"

        }}
      >
        <Grid content sx={{
          borderBottom: '1px solid gray',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: "space-between",
            marginTop: "90px",

          }}>
            <Typography variant="body1">
              <div style={{ display: 'flex' }}>
                Roberto Andrade Marin
                <Typography variant='subtitle2' sx={{
                  marginLeft: "5px",
                  marginTop: "2px",
                  color: "#319795"
                }}>
                  / Profesor
                </Typography>
              </div>
            </Typography>

          </div>
          <div>
                <Typography variant='body1'>
                   Inteligencia artifical en la biologia
                </Typography>
                <Typography variant='body2'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda id veritatis mollitia aliquid culpa! Possimus accusamus eum cumque voluptatibus nostrum aspernatur, unde pariatur et, magni consequatur aut inventore, ipsa ducimus.
                </Typography>
                
          </div>
          <div style={{ display: "flex"}}>
            <ButtonOutline text={"Editar"}  />
            <ButtonContained text={"Editar"}  />
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default HomePage