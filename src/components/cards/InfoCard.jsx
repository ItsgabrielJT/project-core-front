import { Fade, Grid, Link, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import React, { useState } from "react";
var idLogin = JSON.parse(localStorage.getItem("id"));
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

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
      cloudName,
    },
  });

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[2],
      borderRadius: "10px",
      padding: "15px",
      fontSize: 11,
    },
  }));

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
      <div style={{ display: "flex" }}>
        {userImage == "default" ? (
          <AccountCircleIcon
            sx={{
              width: "50px",
              height: "50px",
              marginTop: "9px",
              marginRight: "10px",
              objectFit: "cover",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          />
        ) : (
          <AdvancedImage
            style={{
              width: "50px",
              height: "50px",
              marginTop: "9px",
              marginRight: "10px",
              objectFit: "cover",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            cldImg={perfil}
            plugins={[responsive(), placeholder()]}
          />
        )}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <HtmlTooltip
            title={
              <React.Fragment>
                <div>
                  <div style={{ display: "flex" }}>
                    {userImage == "default" ? (
                      <AccountCircleIcon
                        sx={{
                          width: "50px",
                          height: "50px",
                          marginTop: "9px",
                          marginRight: "10px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      />
                    ) : (
                      <AdvancedImage
                        style={{
                          width: "50px",
                          height: "50px",
                          marginTop: "9px",
                          marginRight: "10px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                        cldImg={perfil}
                        plugins={[responsive(), placeholder()]}
                      />
                    )}
                    <div style={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: "20px",
                        }}
                      >
                        {full_name}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <AssignmentIndIcon
                        sx={{
                          marginTop: "17px",
                          marginLeft: "5px",
                          color: "black",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: "17px",
                          marginLeft: "5px",
                          color: "black",
                        }}
                      >
                        {occupation}
                      </Typography>
                    </div>
                    <ButtonOutline
                      fullWidth
                      text={"Ver perfil"}
                      onClick={handleSearch}
                      style={{ height: "30px", marginTop: "10px" }}
                    />
                  </div>
                </div>
              </React.Fragment>
            }
          >
            <div style={{ display: "flex" }}>
              <Typography
                variant="body1"
                sx={{
                  marginTop: "13px",
                }}
              >
                {full_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "17px",
                  marginLeft: "5px",
                  color: "#319795",
                  fontWeight: "bold",
                }}
              >
                /{occupation}
              </Typography>
            </div>
          </HtmlTooltip>

          <Typography
            variant="body1"
            sx={{
              fontSize: 13,
              marginBottom: "3px",
              color: "#355890",
              fontWeight: "bold",
            }}
          >
            {fecha}
          </Typography>
        </div>
      </div>

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
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
        {projectImage != "default" && (
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
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        {!isFollower && (
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
