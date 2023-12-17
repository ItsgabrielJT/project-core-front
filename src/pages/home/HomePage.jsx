import { Box, Container, Grid, Paper, Typography } from '@mui/material'


import React from 'react'
import InfoCard from '@components/cards/InfoCard'

const HomePage = () => {
  return (
    <Box
      sx={{
        marginTop: "60px",
        height: '100%',
        backgroundColor: '#FFFDFA',
        position: 'overflow',
        paddingX: '15px',
        boxShadow: 'none',
      }}
    >
      <InfoCard/>
    </Box>
  )
}

export default HomePage