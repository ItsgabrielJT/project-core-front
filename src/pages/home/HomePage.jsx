import { Container, Grid, Paper } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          height: '100vh',
          backgroundColor: 'blue',
          position: 'overflow',
        }}
      />
    </Grid>
  )
}

export default HomePage