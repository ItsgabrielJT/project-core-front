import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const routes = [
    {
        title: 'Home',
        path: 'auth/home',
        icon: <HomeRoundedIcon />
    },
    {
        title: 'Notificaciones',
        path: 'auth/home',
        icon: <MailOutlineIcon/>
    },
    {
        title: 'Mis proyectos',
        path: 'auth/home',
        icon: <FileCopyOutlinedIcon/>
    },
    {
        title: 'Perfil',
        path: 'auth/home',
        icon: <PersonRoundedIcon/>
    }
]