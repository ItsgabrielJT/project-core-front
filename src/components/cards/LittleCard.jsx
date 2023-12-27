import { Grid, Paper, Typography } from '@mui/material'
import ButtonOutline from "@components/buttons/ButtonOutline";

function LittleCard({
    title,
    image,
    fecha,
    description,
    onDetail,
    ...props
}) {
    return (
        <Grid 
            {...props}
        sx={{
            backgroundColor: '#F2F1EE',
            borderRadius: '25px',
            padding: '15px 15px 15px 15px',
            margin: '0px 0px 20px 40px'
        }}>
            <Typography variant='subtitle2' sx={{ fontWeight: "bold", fontSize: '18px' }}>
               {title}
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: "bold", color: '#6C757D' }}>
                {fecha}
            </Typography>
            <Typography variant='body2' sx={{
                marginTop: '10px',
                marginBottom: '10px',
                overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2
            }}>
                {description}
            </Typography>
            <div style={{
                display: 'flex',
                justifyContent: 'end'
            }}>
                <ButtonOutline text={"Ver detalles"}
                    onClick={onDetail}
                    style={{
                        height: '30px'
                    }}
                />
            </div>

        </Grid>
    )
}

export default LittleCard