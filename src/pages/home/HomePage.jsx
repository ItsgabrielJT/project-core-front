import { Backdrop, Box, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material'


import React, { useState } from 'react'
import InfoCard from '@components/cards/InfoCard'
import { useProjects } from '@hook/projects/useProjects'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const { dataHome, loading } = useProjects()
  const navigate = useNavigate()

  const handleDetail = (id) => {
      navigate(`/projects/${id}`)
  }

  const handleSearchPerfil = (value) => {
    navigate(`/user/${value}`)
  }

  return (
    <>
      {
        dataHome ? (
          <Box
            sx={{
              marginTop: "90px",
              height: '100%',
              backgroundColor: '#FFFDFA',
              position: 'overflow',
              paddingX: '15px',
              boxShadow: 'none',
            }}
          >
            {
              dataHome.map((item, index) => (
                <InfoCard
                  key={index}
                  occupation={item.occupation}
                  full_name={item.full_name}
                  description={item.description}
                  title_project={item.title_project}
                  onDetail={() => handleDetail(item.idProject)}
                  handleSearch={() => handleSearchPerfil(item.userId)}
                />

              ))
            }
          </Box >
        ) : (
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
            <Backdrop
              sx={{ color: '#blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
              invisible={true}
            >
              <CircularProgress color="primary"
                size={40}
              />
            </Backdrop>
          </Box >

        )
      }
    </>

  )
}

export default HomePage