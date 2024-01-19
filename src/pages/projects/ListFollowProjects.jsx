import {
    Backdrop,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "@hook/colaborators/useProjects"
import LittleCard from "@components/cards/LittleCard"
import { format } from "date-fns";
import Diversity3Icon from '@mui/icons-material/Diversity3';



function ListFolloProjects() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const { projects, loading } = useProjects()



    const handleDetail = (id) => {
        navigate(`/projects/${id}`);
    };

    const openModal = (id) => {
        setId(id);
        setOpen(true)
    }

    const editProject = (id) => {
        navigate(`/projects/${id}/edit`)
    }

    return (
        <>

            {projects ? (
                <Box
                    sx={{
                        marginTop: "60px",
                        height: "100%",
                        backgroundColor: "#FFFDFA",
                        position: "overflow",
                        marginRight: "40px",
                        boxShadow: "none",
                    }}
                >
                    {projects && projects.map((item, index) => (
                        <LittleCard
                            key={index}
                            title={item.title_project}
                            image={item.link_image}
                            user={item.propietario}
                            fecha={format(new Date(item.fecha), 'EEEE, d MMMM yyyy')}
                            description={item.description}
                            onDetail={() => handleDetail(item.id)}
                        />
                    ))}
                    {
                        projects.length == 0 && (
                            <center>
                                <Diversity3Icon sx={{
                                    color: "#9BBEC8",
                                    fontSize: "80px",
                                    marginTop: "140px",
                                }} />

                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#9BBEC8",
                                    }}
                                >
                                    Aqui apareceran los proyectos en los que colaboras!
                                </Typography>
                            </center>
                        )
                    }
                </Box>
            ) : (
                <Box
                    sx={{
                        marginTop: "60px",
                        height: "100%",
                        backgroundColor: "#FFFDFA",
                        position: "overflow",
                        paddingX: "15px",
                        boxShadow: "none",
                    }}
                >
                    <Backdrop
                        sx={{ color: "#blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                        invisible={true}
                    >
                        <CircularProgress color="primary" size={40} />
                    </Backdrop>
                </Box>
            )}
        </>
    );
}

export default ListFolloProjects;
