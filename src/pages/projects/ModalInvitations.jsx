import React, { useEffect, useState } from "react";
import {
    CssTexField,
    Modal,
    ModalContent,
    StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Autocomplete, Box, Button, Collapse, Fade, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import { useUsers } from "@hook/colaborators/useUsers";
import notificationService from "@services/notificationService";
import { colaboratorService } from "@services/colaborators/colaboratorService";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styled from "@emotion/styled";

function ModalInvitations({ open, onClose, idProjecto }) {

    const { users } = useUsers();
    const [value, setValue] = useState(null);
    const [dataSelect, setDataSelect] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        let data = [];
        if (users) {
            users.map((item) => {
                data.push({
                    label: item.email_user,
                    idUser: item.id,
                });
            });
            setDataSelect(data);
        }
    }, [users]);

    const handleInvite = () => {
        let json = {
            id_proyecto: Number(idProjecto),
            id_usuario_colaborador: value.idUser,
        };
        colaboratorService
            .inviteColaborate(json)
            .then((res) => {
                if (res.data.status) {
                    notificationService.success("Se ha enviado la invitacion");
                    handleClose();
                }
            })
            .catch((err) => {
                notificationService.error(err.message);
            });
    };

    const selectUser = (value) => {
        setValue(value);
    };

    const handleClose = () => {
        onClose(false);
        setValue(null);
        setInputValue("");
    };

    const CustomPopper = styled.div`
  max-height: 110px; /* Altura máxima según tus necesidades */
  overflow-y: auto;

    `;


    return (
        <>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
                sx={{
                    padding: "20px 20px 20px 20px",
                    height: "auto",
                }}
            >
                <Fade in={open}>
                    <ModalContent sx={{ width: 450 }}>

                        <div>
                            <div
                                style={{ display: "flex", justifyContent: "end" }}
                            >
                                <div>
                                    <Fab
                                        size="small"
                                        aria-label="add"
                                        onClick={handleClose}
                                        sx={{
                                            backgroundColor: "#FFFDFA",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <ClearIcon />
                                    </Fab>

                                </div>

                            </div>
                            <div style={{ marginTop: "5px", textAlign: 'center' }}>
                                <PersonAddIcon
                                    sx={{
                                        fontSize: "50px",
                                        color: "#9BBEC8",
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                >
                                    Agrega colaboradores a tu proyecto

                                </Typography>
                            </div>
                            <div style={{ marginTop: "20px", display: 'flex', flexDirection: 'column', }}>
                                <Autocomplete
                                    freeSolo
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        selectUser(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    PopperComponent={({ children, ...popperProps }) => (
                                        <CustomPopper {...popperProps}>
                                            {children}
                                        </CustomPopper>
                                    )}
                                    options={dataSelect}
                                    sx={{
                                        '& .MuiAutocomplete-inputRoot': {
                                            '& fieldset': {
                                                borderRadius: '50px',
                                                border: '1.2px solid #319795',

                                            },
                                            '&:hover fieldset': {
                                                border: '1.2px solid #9AD0C2',
                                                borderRadius: '50px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: '1.2px solid #5CDDDB',
                                                borderRadius: '50px',
                                            },
                                        },

                                    }}
                                    renderInput={(params) => <TextField {...params} label="Buscar por email" />}
                                />
                            </div>
                            <ButtonContained
                                onClick={handleInvite}
                                disabled={!value}
                                fullWidth
                                text={"Invitar"} style={{
                                    height: '37px',
                                    marginTop: '32px'
                                }} />
                        </div>

                    </ModalContent>
                </Fade>

            </Modal>
        </>
    )
}

export default ModalInvitations