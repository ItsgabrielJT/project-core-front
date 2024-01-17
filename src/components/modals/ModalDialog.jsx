import React, { useState } from "react";
import {
    Modal,
    ModalContentConfirm,
} from "@constants/styles";
import ButtonOutline from "@components/buttons/ButtonOutline";
import { Button, Fade } from "@mui/material";

const CssButtonContained = {
    marginTop: "15px",
    boxShadow: 'none',
    borderRadius: '50px',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    color: "white",
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#DC3545',
    '&:hover': {
      backgroundColor: '#F85D6C',
      borderColor: '#F85D6C',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#F85D6C',
      borderColor: '#F85D6C',
    },
  }

function ModalDialog({ open, onClose, onConfirm, title, slots = {} }) {



    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            closeAfterTransition
            slots={slots}
            style={{
                zIndex: 2
            }}

        >
            <Fade in={open}>
            <ModalContentConfirm sx={{ width: 250 }}>
                <div>
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <div>

                            <h2 id="unstyled-modal-title" className="modal-title" style={{ marginLeft: '10px' }}>
                                {title}
                            </h2>
                        </div>

                    </div>
                    <Button
                        fullWidth

                        onClick={onConfirm}
                        sx={CssButtonContained}
                        >
                            Aceptar
                        </Button>
                    <ButtonOutline text={"Cancelar"}
                        fullWidth

                        onClick={onClose}
                        style={{
                            marginTop: '10px',
                        }}
                    />

                </div>
            </ModalContentConfirm>
            </Fade>
            
        </Modal>

    )
}

export default ModalDialog