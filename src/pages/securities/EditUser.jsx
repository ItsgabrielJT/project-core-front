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
import ButtonContained from "@components/buttons/ButtonContained";
import ModalDialog from "@components/modals/ModalDialog";
import { useEdit } from "@hook/securities/useEdit";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "@components/modals/CloudinaryUpload";

function EditUser({ open, handleClose, onSuccess }) {

    const [close, setClose] = useState(false);
    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("dnkst5hjn");
    const [uploadPreset] = useState("o0bi0kjz");
    const { formUser } = useEdit(handleClose, onSuccess, publicId);


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

                                <AdvancedImage
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
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
                                    error={
                                        formUser.touched.universidad &&
                                        Boolean(formUser.errors.universidad)
                                    }
                                    helperText={
                                        formUser.touched.universidad &&
                                        formUser.errors.universidad
                                    }
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
                                    error={
                                        formUser.touched.carrera &&
                                        Boolean(formUser.errors.carrera)
                                    }
                                    helperText={
                                        formUser.touched.carrera && formUser.errors.carrera
                                    }
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
                                    onChange={formUser.handleChange}
                                    onBlur={formUser.handleBlur}
                                    error={
                                        formUser.touched.numero_celular &&
                                        Boolean(formUser.errors.numero_celular)
                                    }
                                    helperText={
                                        formUser.touched.numero_celular &&
                                        formUser.errors.numero_celular
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