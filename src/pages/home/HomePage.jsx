import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import InfoCard from "@components/cards/InfoCard";
import { useProjects } from "@hook/projects/useProjects";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { colaboratorService } from "../../services/colaborators/colaboratorService";
import notificationService from "@services/notificationService";

const HomePage = () => {
  const { dataHome, loading } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleSearchPerfil = (value) => {
    navigate(`/user/${value}`);
  };

  const handleFollow = (id) => {
    let json = {
      id_proyecto: id,
      id_usuario_colaborador: user.id,
    };
    colaboratorService
      .requestFollow(json)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha enviado su solicitud");
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      });
  };

  return (
    <>
      {dataHome ? (
        <Box
          sx={{
            marginTop: "90px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "15px",
            boxShadow: "none",
          }}
        >
          {dataHome.map((item, index) => (
            <InfoCard
              key={index}
              occupation={item.occupation}
              full_name={item.full_name}
              description={item.description}
              title_project={item.title_project}
              onDetail={() => handleDetail(item.idProject)}
              handleSearch={() => handleSearchPerfil(item.userId)}
              onFollow={() => handleFollow(item.idProject)}
              id={item.userId}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "60px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "15px",
            boxShadow: "none",
          }}
        >
          <Backdrop
            sx={{ color: "#blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            invisible={true}
          >
            <CircularProgress color="primary" size={40} />
          </Backdrop>
        </Box>
      )}
    </>
  );
};

export default HomePage;
