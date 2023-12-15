
import { Button } from '@mui/material'
import React from 'react'
import { CssButtonContained } from '@constants/styles'

function ButtonContained( props ) {
    return (
        <Button
            {...props}
            
            variant="contained"
            sx={CssButtonContained}
        >
            {props.text}
        </Button>
    )
}

export default ButtonContained