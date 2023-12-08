
import { Button, Typography } from '@mui/material'
import React from 'react'
import { CssNavOutline } from '@constants/styles'
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from 'react-router-dom';

function NavFocusOutline(props) {

    const navigation = useNavigate()

    const handleRedirecTo = (path) => {
        navigation(path)
    }

    return (
        <Button
            {...props}
            fullWidth
            variant="outlined"
            sx={CssNavOutline}
            onClick={() => handleRedirecTo(props.path)}
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