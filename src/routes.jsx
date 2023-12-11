import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const routes = [
    {
        title: 'Home',
        path: '/home',
        icon: <HomeRoundedIcon />
    },
    {
        title: 'Notificaciones',
        path: '/home',
        icon: <MailOutlineIcon/>
    },
    {
        title: 'Mis proyectos',
        path: '/home',
        icon: <FileCopyOutlinedIcon/>
    },
    {
        title: 'Perfil',
        path: '/user',
        icon: <PersonRoundedIcon/>
    }
]