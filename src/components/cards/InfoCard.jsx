import { Grid, Link, Typography } from "@mui/material";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useState } from "react";
var idLogin = JSON.parse(localStorage.getItem("id"));
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function InfoCard({
  occupation,
  full_name,
  userImage,
  projectImage,
  fecha,
  description,
  title_project,
  onDetail,
  handleSearch,
  onFollow,
  isFollower,
  id,
  ...props
}) {

  const [cloudName] = useState("dnkst5hjn");


  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const perfil = cld.image(userImage);
  const proyecto = cld.image(projectImage);

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
        {
          userImage == "" ? (
            <AccountCircleIcon />
          ) : (
            <AdvancedImage
              style={{
                width: "50px",
                height: "50px",
                marginRight: '10px',
                objectFit: "cover",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              cldImg={perfil
              }
              plugins={[responsive(), placeholder()]}
            />
          )
        }
        <Typography variant="body1"
          sx={{
            marginTop: "13px",

          }}

        >{full_name}</Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: "15px",
            marginLeft: "5px",
            color: "#319795",
            fontWeight: "bold",
          }}
        >
          /{occupation}
        </Typography>
      </Link>
      <div>
        <Typography
          variant="body1"
          sx={{ fontSize: 13, marginBottom: "3px", color: "#355890", fontWeight: "bold" }}
        >
          {fecha}
        </Typography>
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
        <AdvancedImage
          style={{
            width: "100%",
            height: "290px",
            margin: "17px 0px 0px 0px",
            backgroundColor: "#D9D9D9",
            objectFit: "cover",
            borderRadius: "30px",
            overflow: "hidden",
          }}
          cldImg={proyecto}
          plugins={[responsive(), placeholder()]}
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
        
        {
          !isFollower && (
            <ButtonContained
            text={"Unirse"}
            onClick={onFollow}
            style={{ width: "25px", height: "30px", marginRight: "10px" }}
          />
          )
        }
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
