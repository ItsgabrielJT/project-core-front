import LittleCard from "@components/cards/LittleCard"
import { Box } from "@mui/system"
import { useProjects } from "@hook/colaborators/useProjects"
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { format } from "date-fns";

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
                    backgroundColor: '#FFFDFA',
                    position: 'fixed',
                    borderLeft: '2px solid #F2F1EE',
                    marginTop: '50px',
                    paddingTop: '50px',
                    marginLeft: '35px',
                }}
            >
                {projects && projects.map((item, index) => (
                    <LittleCard
                        key={index}
                        title={item.title_project}
                        image={item.link_image}
                        fecha={format(new Date(item.fecha), 'EEEE, d MMMM yyyy')}
                        description={item.description}
                        onDetail={() => handleDetail(item.id)}
                    />
                ))}
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