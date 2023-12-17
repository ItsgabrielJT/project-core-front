import LittleCard from "@components/cards/LittleCard"
import { Box } from "@mui/system"

function RightBar() {
    return (
        <Box 
        sx={{
            height: '100vh',
            backgroundColor: '#FFFDFA',
            position: 'fixed',
            borderLeft : '2px solid #F2F1EE',
            marginTop: '50px',
            paddingTop: '50px',
            marginLeft: '35px',
        }}
         >
            <LittleCard />
        </Box>
    )
}

export default RightBar