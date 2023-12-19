import { Grid, Typography } from '@mui/material'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";

function InfoCard({ key, occupation, full_name, description, title_project, onDetail }) {
  return (
    <Grid
      content
      key={key}
      sx={{
        borderBottom: '1px solid gray',
        marginTop: "30px",

      }}>
      <div style={{
        display: 'flex',
        justifyContent: "space-between",
        marginBottom: "25px",
      }}>
        <Typography variant="body1">
          <div style={{ display: 'flex' }}>
            {full_name}
            <Typography variant='subtitle2' sx={{
              marginLeft: "5px",
              marginTop: "2px",
              color: "#319795",
              fontWeight: "bold",
            }}>
              / {occupation}
            </Typography>
          </div>
        </Typography>

      </div>
      <div>
        <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {title_project}
        </Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
        <img
          style={{ width: '100%', maxWidth: '100%', borderRadius: '25px' , height: '310px', maxHeight: '310px' }}
          alt="Biotechnology"
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
      </div>
      <div style={{ display: "flex", justifyContent: 'end', marginTop: '10px', marginBottom: '15px' }}>
        <ButtonContained text={"Unirse"} style={{ width: '25px', height: '30px', marginRight: '10px' }} />
        <ButtonOutline text={"Ver"} onClick={onDetail} style={{ width: '25px', height: '30px' }} />
      </div>
    </Grid>
  )
}

export default InfoCard