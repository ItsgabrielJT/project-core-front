
import { Grid, Paper } from '@mui/material'
import React from 'react'
import HomePage from '../pages/home/HomePage'
import Header from './Header'
import RightBar from './RightBar'
import { Outlet } from 'react-router'
import ButtonContained from "@components/buttons/ButtonContained";
import NavFocusOutline from '@components/navs/NavFocusOutline'
import { routes } from '../routes'

function SideBar({ children }) {
    return (
        <Grid container sx={{
            paddingY: '0px',
            marginTop: '0px',
            backgroundColor: "#FFFDFA"
        }}>
            {/* Header */}
            <Grid item xs={12}>
                <Header />
            </Grid>

            {/* Sidebar */}
            <Grid item xs={3}>
                <div style={{
                    width: '22%',
                    paddingLeft: '10px',
                    marginTop: '70px',
                    position: 'fixed'
                }}>
                    {
                        routes.map( (item, index) => (
                            <NavFocusOutline 
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                path={item.path}
                            />
                        ))
                    }
                    <ButtonContained text={"Crear proyecto"} type="submit" />
                </div>
            </Grid>

            {/* Contenido principal */}
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Outlet />
                </Grid>
            </Grid>

            {/* Rightbar */}

            <Grid item xs={3}>
                <RightBar />
            </Grid>
        </Grid>

    )
}

export default SideBar