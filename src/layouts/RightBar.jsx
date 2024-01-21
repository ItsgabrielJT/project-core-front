import LittleCard from "@components/cards/LittleCard"
import { Box } from "@mui/system"
import { useProjects } from "@hook/colaborators/useProjects"
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import Diversity3Icon from '@mui/icons-material/Diversity3';

function RightBar() {

    const { projects, loading } = useProjects()
    const navigate = useNavigate();

    const handleDetail = (id) => {
        navigate(`/projects/${id}`);
    };

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    width: '20%',
                    
                    backgroundColor: '#FFFDFA',
                    position: 'fixed',
                    borderLeft: '2px solid #F2F1EE',
                    marginTop: '50px',
                    paddingTop: '50px',
                    marginLeft: '40px',
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
            </Box >
            <Backdrop
                sx={{ backgroundColor: "rgba(155, 190, 200, 0.3)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}

            >
                <CircularProgress color="primary" size={40} />
            </Backdrop>
        </>
    )
}

export default RightBar