import React, { useState } from "react";
import {
    Modal,
    ModalContentConfirm,
} from "@constants/styles";
import ButtonContained from "@components/buttons/ButtonContained";
import ButtonOutline from "@components/buttons/ButtonOutline";

function ModalDialog({ open, onClose, onConfirm, title, slots= {} }) {



    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            closeAfterTransition
            slots={slots}

        >
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
                    <ButtonContained text={"Descartar"} 
                        onClick={onConfirm}
                        style={{
                        backgroundColor: '#DC3545',
                        borderColor: '#DC3545'
                    }} />
                    <ButtonOutline text={"Cancelar"} 
                    fullWidth
                    
                        onClick={onClose}
                        style={{
                            marginTop: '10px',
                        }}
                    />

                </div>
            </ModalContentConfirm>
        </Modal>

    )
}

export default ModalDialog