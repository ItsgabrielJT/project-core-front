import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import ModalDialog from "@components/modals/ModalDialog";
import { useNotifications } from "@hook/colaborators/useNotifications";
import MediumCard from "@components/cards/MediumCard";
import { colaboratorService } from "@services/colaborators/colaboratorService";
import notificationService from "@services/notificationService";

const NotificationsPage = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { notifications, loading } = useNotifications(success, setSuccess);

  const handleConfirm = () => {
    setOpen(false);
  };

  const handleRefuse = (id) => {
    colaboratorService
    .refuseColaborator(id)
    .then((res) => {
      if (res.data.status) {
        notificationService.success("Se le notificara tu decision");
      }
    })
    .catch((err) => {
      notificationService.error(err.message);
    });
  };

  const handleAceppt = (id) => {
    colaboratorService
      .aceptColaborator(id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se agrego un colaborador a tu proyecto");
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
      });
  };

  return (
    <>
      <ModalDialog
        title={"Quieres eliminar esta notificacion ?"}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
      {notifications ? (
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
          {notifications.map((item, index) => (
            <MediumCard
            key={index}
            user={item.full_name}
            content={item.content}
            onRefuse={() => handleRefuse(item.idNotification)}
            onConfirm={() => handleAceppt(item.idNotification)}
          />
          ))}
        </Box>
      ) : (
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

export default NotificationsPage;
