import { Grid, Paper, Typography } from '@mui/material'
import ButtonOutline from "@components/buttons/ButtonOutline";

function LittleCard(props) {
    return (
        <Grid sx={{
            backgroundColor: '#F2F1EE',
            borderRadius: '25px',
            padding: '15px 15px 15px 15px',
            margin: '0px 23px 20px 23px'
        }}>
            <Typography variant='subtitle2' sx={{ fontWeight: "bold", fontSize: '18px' }}>
                Inteligencia en el mundo real
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: "bold", color: '#6C757D' }}>
                Ing Roberto Andrade
            </Typography>
            <Typography variant='body2' sx={{
                marginTop: '10px',
                marginBottom: '10px',
                overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2
            }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Beatae culpa suscipit vero sapiente! Odit, quidem sunt dolore
                autem dicta aliquid excepturi dolorum est fugit sed perspiciatis iste a voluptas blanditiis!
            </Typography>
            <div style={{
                display: 'flex',
                justifyContent: 'end'
            }}>
                <ButtonOutline text={"Ver detalles"}
                    style={{
                        height: '30px'
                    }}
                />
            </div>

        </Grid>
    )
}

export default LittleCard