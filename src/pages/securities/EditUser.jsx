import React, { useEffect, useState } from "react";
import {
    CssTexField,
    Modal,
    ModalContent,
    StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Collapse, TextField } from "@mui/material";
import { useUser } from "@hook/securities/useUser";
import ButtonContained from "@components/buttons/ButtonContained";
import ModalDialog from "@components/modals/ModalDialog";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function EditUser({ open, handleClose }) {


    const [ close, setClose] = useState(false);
    const { formUser } = useUser(handleClose);



    
    const onClose = () => {
        handleClose();
        setClose(false);
        formUser.resetForm();
    };

    return (
        <>

            <ModalDialog
                title={"Quieres descartar los cambios ?"}
                open={close}
                onClose={() => setClose(false)}
                onConfirm={onClose}
            />
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{ width: 450 }}>
                    <form onSubmit={formUser.handleSubmit}>

                        <div>
                            <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div>
                                    <Fab
                                        size="small"
                                        aria-label="add"
                                        onClick={() => setClose(true)}
                                        sx={{
                                            backgroundColor: "#FFFDFA",
                                            boxShadow: "none",
                                        }}
                                    >
                                        <ClearIcon />
                                    </Fab>
                                    <h2 id="unstyled-modal-title" className="modal-title" style={{ marginLeft: '10px' }}>
                                        Editar perfil
                                    </h2>
                                </div>
                                <ButtonContained 
                                    type='submit'
                                text={"Guardar"} style={{
                                    height: '37px',
                                    width: '115px',
                                    marginTop: '32px'
                                }} />

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Fab
                                    sx={{
                                        margin: "20px 0px 20px 0px",
                                        width: "115px",
                                        height: "115px",
                                        fontSize: "12px",
                                        flexDirection: "column", // Colocar los elementos en una columna
                                        alignItems: "center", // Alinear en el centro horizontal
                                        justifyContent: "center", // Alinear en el centro vertical
                                    }}
                                >
                                    <AddAPhotoIcon />
                                    <div>Agrega una foto</div>
                                </Fab>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="institute"
                                    label="Institute"
                                    id="institute"
                                    autoComplete="current-name"
                                    value={formUser.values.institute}
                                    onChange={formUser.handleChange}
                                    onBlur={formUser.handleBlur}
                                    error={
                                        formUser.touched.institute &&
                                        Boolean(formUser.errors.institute)
                                    }
                                    helperText={
                                        formUser.touched.institute &&
                                        formUser.errors.institute
                                    }
                                    sx={CssTexField}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="profesion"
                                    label="Carrer"
                                    id="profesion"
                                    autoComplete="current-profesion"
                                    value={formUser.values.profesion}
                                    onChange={formUser.handleChange}
                                    onBlur={formUser.handleBlur}
                                    error={
                                        formUser.touched.profesion &&
                                        Boolean(formUser.errors.profesion)
                                    }
                                    helperText={
                                        formUser.touched.profesion && formUser.errors.profesion
                                    }
                                    sx={CssTexField}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="number"
                                    label="Phone number"
                                    id="number"
                                    autoComplete="current-number"
                                    value={formUser.values.number}
                                    onChange={formUser.handleChange}
                                    onBlur={formUser.handleBlur}
                                    error={
                                        formUser.touched.number &&
                                        Boolean(formUser.errors.number)
                                    }
                                    helperText={
                                        formUser.touched.number &&
                                        formUser.errors.number
                                    }
                                    sx={CssTexField}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formUser.values.password}
                                    onChange={formUser.handleChange}
                                    onBlur={formUser.handleBlur}
                                    error={
                                        formUser.touched.password &&
                                        Boolean(formUser.errors.password)
                                    }
                                    helperText={
                                        formUser.touched.password &&
                                        formUser.errors.password
                                    }
                                    sx={CssTexField}
                                />
                            </div>
                        </div>

                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditUser