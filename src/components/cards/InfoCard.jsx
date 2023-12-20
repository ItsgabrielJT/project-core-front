import { Grid, Link, Typography } from "@mui/material";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";

var idLogin = JSON.parse(localStorage.getItem("id"));

function InfoCard({
  occupation,
  full_name,
  description,
  title_project,
  onDetail,
  handleSearch,
  onFollow,
  id,
  ...props
}) {
  return (
    <Grid
      {...props}
      item
      sx={{
        borderBottom: "1px solid gray",
        marginTop: "30px",
      }}
    >
      <Link
        onClick={handleSearch}
        underline="hover"
        style={{
          display: "flex",
          marginBottom: "25px",
          color: "black",
        }}
      >
        <Typography variant="body1">{full_name}</Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: "2px",
            marginLeft: "5px",
            color: "#319795",
            fontWeight: "bold",
          }}
        >
          / {occupation}
        </Typography>
      </Link>
      <div>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          {title_project}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            maxHeight: "3em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
        <img
          style={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: "25px",
            height: "310px",
            maxHeight: "310px",
          }}
          alt="Biotechnology"
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        {id != idLogin && (
          <ButtonContained
            text={"Unirse"}
            onClick={onFollow}
            style={{ width: "25px", height: "30px", marginRight: "10px" }}
          />
        )}
        <ButtonOutline
          text={"Ver"}
          onClick={onDetail}
          style={{ width: "25px", height: "30px" }}
        />
      </div>
    </Grid>
  );
}

export default InfoCard;
