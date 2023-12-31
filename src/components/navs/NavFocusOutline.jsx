
import { Button, Typography } from '@mui/material'
import React from 'react'
import { CssNavOutline } from '@constants/styles'
import ClearIcon from "@mui/icons-material/Clear";
import { Navigate, useNavigate } from 'react-router-dom';

function NavFocusOutline(props) {

    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("id"));


    const handleRedirecTo = (value) => {
        if(value.title == "Perfil") {
            navigate(`${value.path}/${userId}`);      

        }  else {
            navigate(value.path);      
        }
    }

    return (
        <Button
            {...props}
            fullWidth
            variant="outlined"
            sx={CssNavOutline}
            onClick={() => handleRedirecTo(props)}
        >
            {props.icon}
            <Typography variant='body1' sx={{
                marginLeft: '10px',
                color: "#6C757D"
            }}>
                {props.title}

            </Typography>
        </Button>
    )
}

export default NavFocusOutline