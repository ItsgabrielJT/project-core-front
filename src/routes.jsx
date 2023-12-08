import HouseSidingRoundedIcon from "@mui/icons-material/HouseSidingRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";


export const routes = [
    {
        title: 'Home',
        path: 'auth/home',
        icon: <HouseRoundedIcon />
    },
    {
        title: 'Notificaciones',
        path: 'auth/home',
        icon: <MessageRoundedIcon/>
    },
    {
        title: 'Mis proyectos',
        path: 'auth/home',
        icon: <FilePresentRoundedIcon/>
    },
    {
        title: 'Perfil',
        path: 'auth/home',
        icon: <HouseSidingRoundedIcon/>
    }
]