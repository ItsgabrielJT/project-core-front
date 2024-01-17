import React, { useEffect, useState } from "react";
import {
    CssTexField,
    Modal,
    ModalContent,
    StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Button, Collapse, Fade, Snackbar, TextField } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import { useEdit } from "@hook/securities/useEdit";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "@components/modals/CloudinaryUpload";

function EditUser({ user, open, handleClose, onSuccess }) {

    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("dnkst5hjn");
    const [uploadPreset] = useState("o0bi0kjz");
    const {
        formUser,
        vertical,
        horizontal,
        openSnack,
        message,
        handleCloseSnack
    } = useEdit(handleClose, onSuccess, publicId, setPublicId, user, open);


    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        folder: "project-core-users", //upload files to the specified folder
        clientAllowedFormats: ["jpg", "png"], //restrict uploading to image files only
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        theme: "blue", //change to a purple theme
    });

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName
        }
    });

    const myImage = cld.image(publicId);

    const onClose = () => {
        handleClose();
    };

    const handleChangeNumber = (e) => {
        if (/^\d*$/.test(e.target.value) && e.target.value.length < 14) {
            formUser.handleChange(e)
        }
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={handleCloseSnack}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
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
                                            onClick={onClose}
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

                                    <AdvancedImage
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            backgroundColor: '#F2F1EE',
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                        }}
                                        cldImg={myImage}
                                        plugins={[responsive(), placeholder()]}
                                    />
                                    <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="universidad"
                                        label="Universidad"
                                        id="universidad"
                                        autoComplete="current-name"
                                        value={formUser.values.universidad}
                                        onChange={formUser.handleChange}
                                        onBlur={formUser.handleBlur}
                                       
                                        sx={CssTexField}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="carrera"
                                        label="Carrera"
                                        id="carrera"
                                        autoComplete="current-carrera"
                                        value={formUser.values.carrera}
                                        onChange={formUser.handleChange}
                                        onBlur={formUser.handleBlur}
                                       
                                        sx={CssTexField}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="numero_celular"
                                        label="Numero celular"
                                        id="numero_celular"
                                        autoComplete="current-numero_celular"
                                        value={formUser.values.numero_celular}
                                        onChange={handleChangeNumber}
                                        onBlur={formUser.handleBlur}
                                       
                                        sx={CssTexField}
                                    />

                                </div>
                            </div>

                        </form>
                    </ModalContent>
                </Fade>

            </Modal>
        </>
    )
}

export default EditUser