import React, { useEffect, useState } from "react";
import {
    CssTexField,
    Modal,
    ModalContent,
    StyledBackdrop,
} from "@constants/styles";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Checkbox, Collapse, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import ButtonContained from "@components/buttons/ButtonContained";
import ModalDialog from "@components/modals/ModalDialog";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useEdit } from "@hook/securities/useEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';

const PERMISSIONS = [
    'Editar',
    'Eliminar',
    'Lectura',
    'Editar'
]

function EditColaborators({ open, handleClose, onSuccess, colaborators }) {

    const { formUser } = useEdit(handleClose, onSuccess);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [checked, setChecked] = React.useState([0]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(colaborators)
    }, [colaborators])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const onClose = () => {
        handleClose();
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

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
                }}
            >
                <ModalContent sx={{ width: 650 }}>
                    {
                        users.length == 0 ? (
                            <center>
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
                                <Typography variant="h6" >
                                    <FaceRetouchingOffIcon
                                        style={{ marginRight: '10px', fontSize: 30 }}
                                    />
                                    Aun no tienes colaboradores !
                                </Typography>
                            </center>
                        ) : (
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
                                                Configurar colaboradores
                                            </h2>
                                        </div>
                                        <ButtonContained
                                            type='submit'
                                            text={"Guardar"} style={{
                                                height: '37px',
                                                width: '115px',
                                                marginTop: '20px'
                                            }} />

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                        <Grid container spacing={1} columns={16}>
                                            <Grid item xs={7} sx={{ marginTop: '30px' }}>
                                                {
                                                    users && users.map((item, index) => (
                                                        <ListItemButton
                                                            key={index}
                                                            selected={selectedIndex === index}
                                                            onClick={(event) => handleListItemClick(event, index)}
                                                            sx={{
                                                                borderRadius: '30px',
                                                                marginBottom: '10px',

                                                                '&.Mui-selected': {
                                                                    backgroundColor: 'rgba(92, 221, 219, 0.3)',
                                                                }
                                                            }}

                                                        >
                                                            <ListItemText primary={item.user.full_name} />
                                                        </ListItemButton>
                                                    ))
                                                }

                                            </Grid>
                                            <Grid item xs={9} sx={{ marginTop: '22px' }}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#FFFDFA' }}>
                                                    {PERMISSIONS.map((value, index) => {
                                                        const labelId = `checkbox-list-label-${index}`;

                                                        return (
                                                            <ListItem
                                                                key={index}
                                                                disablePadding
                                                            >
                                                                <ListItemButton
                                                                    sx={{
                                                                        borderRadius: '30px',
                                                                    }}
                                                                    role={undefined} onClick={handleToggle(index)} dense>
                                                                    <ListItemIcon>
                                                                        <Checkbox
                                                                            edge="start"
                                                                            checked={checked.indexOf(index) !== -1}
                                                                            tabIndex={-1}
                                                                            disableRipple
                                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                                            sx={{
                                                                                color: '#319795',
                                                                                '&.Mui-checked': {
                                                                                    color: 'rgba(92, 221, 219)',
                                                                                },
                                                                            }}
                                                                        />
                                                                    </ListItemIcon>
                                                                    <ListItemText id={labelId} primary={value} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>

                            </form>
                        )
                    }

                </ModalContent>
            </Modal>
        </>
    )
}

export default EditColaborators