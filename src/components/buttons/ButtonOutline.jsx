
import { Button } from '@mui/material'
import React from 'react'
import { CssButtonOutline } from '@constants/styles'

function ButtonOutline( props ) {
    return (
        <Button
            {...props}
            fullWidth
            variant="outlined"
            sx={CssButtonOutline}
        >
            {props.text}
        </Button>
    )
}

export default ButtonOutline