
import React from 'react'
import { CssTexField, Modal, ModalContent, ModalButton, StyledBackdrop } from '@constants/styles';


function RegisterPage({ open, handleClose }) {
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 400 }}>
        <h2 id="unstyled-modal-title" className="modal-title">
          Text in a modal
        </h2>
        <p id="unstyled-modal-description" className="modal-description">
          Aliquid amet deserunt earum!
        </p>
        <ModalButton onClick={handleClose}>Close Child Modal</ModalButton>
      </ModalContent>
    </Modal>
  )
}

export default RegisterPage
