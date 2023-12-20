import {
    Backdrop,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { StyledBackdrop } from "@constants/styles";
import ModalDialog from "@components/modals/ModalDialog";
import { Link, useNavigate } from "react-router-dom";
import { useUserProjects } from "@hook/projects/useUserProjects";
import LargeCard from "@components/cards/LargeCard";
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"


function ListProjects() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(false);
  const { projects, loading } = useUserProjects(success, setSuccess);

  const handleConfirm = () => {
    projectService.deleteProject(id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha eliminado correctamente")
          setSuccess(true);
        }
      })
      .catch((err) => {
        notificationService.error(err.message)
        setSuccess(false);
      })
      .finally(() => {
        setOpen(false);
      })
  };

  const handleDetail = (id) => {
    navigate(`/projects/${id}`);
  };

  const openModal = (id) => {
    setId(id);
    setOpen(true)
  }

  const editProject = (id) => {
    navigate(`/projects/${id}/edit`)
  }

  return (
    <>
      <ModalDialog
        title={"Quieres eliminar este proyecto ?"}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        slots={{ backdrop: StyledBackdrop }}
      />
      {projects ? (
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
          {
            projects.map( (item, index) => (
              <LargeCard 
                key={index}
                title={item.title_project}
                state={item.estado}
                handleDetail={() => handleDetail(item.idProject)}
                handleDelete={() => openModal(item.idProject)}
                handleEdit={() => editProject(item.idProject)}
          />
            ) )
          }
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
}

export default ListProjects;
