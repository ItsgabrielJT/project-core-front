import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from "./EditUser";
import { ResponsiveBar, ResponsiveBarCanvas } from "@nivo/bar";
import { useUser } from "@hook/securities/useUser";
import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useAuth } from "../../context/AuthContext";
import { useStaticts } from "@hook/securities/useStaticts";

const data = [
  {
    iniciado: 1,
    enProceso: 0,
    enRevision: 1,
    finalizado: 0,
    mes: "Enero",
  },
  {
    iniciado: 0,
    enProceso: 0,
    enRevision: 0,
    finalizado: 0,
    mes: "Febrero",
  },
  {
    iniciado: 0,
    enProceso: 0,
    enRevision: 0,
    finalizado: 0,
    mes: "Marzo",
  },
];

function UserPage() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cloudName] = useState("dnkst5hjn");
  const { id } = useParams();
  const { user } = useAuth();
  const { profile, loading } = useUser(success, id);
  const { staticts } = useStaticts(success, id);
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    console.log(staticts);
  }, [staticts]);

  const myImage = cld.image(profile ? profile.link_image : "");

  const handleOpen = () => {
    setOpen(true);
    setSuccess(false);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {profile ? (
        <Grid item xs={12}>
          <EditUser
            open={open}
            handleClose={handleClose}
            onSuccess={setSuccess}
          />

          <Box
            sx={{
              marginTop: "53px",
              width: "48%",
              height: "100%",
              backgroundColor: "#FFFDFA",
              position: "absolute",
              boxShadow: "none",
              paddingX: "15px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  backgroundColor: "#ACCDDC",
                  height: "200px",
                }}
              />

              <AdvancedImage
                style={{
                  position: "absolute",
                  top: "90%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "60px",

                top: "350px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="h6">{profile.full_name}</Typography>
                <Typography variant="overline">
                  <div style={{ display: "flex" }}>
                    {profile.university_name} - {profile.career}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        marginLeft: "5px",
                        marginTop: "3px",
                        color: "#319795",
                      }}
                    >
                      / {profile.occupation}
                    </Typography>
                  </div>
                </Typography>
              </div>
              <div>
                {profile.id == user.id && (
                  <ButtonOutline text={"Editar"} onClick={handleOpen} />
                )}
              </div>
            </div>
            <div style={CssContentInfo}>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Acerca de
              </Typography>
              <div>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Correo electronico
                </Typography>
                <Typography variant="body2">{profile.email_user}</Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Celular
                </Typography>
                <Typography variant="body2">
                  {profile.cellphone_number}
                </Typography>
              </div>
            </div>
            <div style={CssContentInfo}>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Estadisticas
              </Typography>
            </div>
            <ResponsiveBar
              data={staticts ? staticts : []}
              height={300}
              keys={["iniciado", "enProceso", "enRevision", "finalizado"]}
              indexBy="mes"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              tooltip={(value) => {
                console.log(value);
                if (value.id == "iniciado")
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: value.color,
                          marginRight: "5px",
                        }}
                      ></div>
                      <center>
                        Iniciados - {value.indexValue}:{" "}
                        <b>{value.data.iniciado}</b>
                      </center>
                    </div>
                  );
                else if (value.id == "finalizado")
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: value.color,
                          marginRight: "5px",
                        }}
                      ></div>
                      <center>
                        Finalizados - {value.indexValue}:{" "}
                        <b>{value.data.finalizado}</b>
                      </center>
                    </div>
                  );
                else if (value.id == "enProceso")
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: value.color,
                          marginRight: "5px",
                        }}
                      ></div>
                      <center>
                        En Proceso - {value.indexValue}:{" "}
                        <b>{value.data.enProceso}</b>
                      </center>
                    </div>
                  );
                  else if (value.id == "enRevision")
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: value.color,
                          marginRight: "5px",
                        }}
                      ></div>
                      <center>
                        En Revision - {value.indexValue}:{" "}
                        <b>{value.data.enRevision}</b>
                      </center>
                    </div>
                  );
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "MESES",
                legendPosition: "middle",
                legendOffset: 32,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "PROYECTOS",
                legendPosition: "middle",
                legendOffset: -40,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
            />
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Paper
            sx={{
              marginTop: "53px",
              height: "100%",
              backgroundColor: "#FFFDFA",
              position: "overflow",
              boxShadow: "none",
            }}
          >
            <Backdrop
              sx={{
                color: "#blue",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
              invisible={true}
            >
              <CircularProgress color="primary" size={40} />
            </Backdrop>
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default UserPage;
