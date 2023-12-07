
import React, { useState } from 'react'
import { CssTexField, Modal, ModalContent, ModalButton, StyledBackdrop } from '@constants/styles';
import Fab from '@mui/material/Fab';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Collapse, TextField } from '@mui/material';
import { useRegister } from '@hook/accounts/useRegister';
import ButtonContained from '@components/buttons/ButtonContained';
import { Box } from '@mui/system';

const tab = false

function RegisterPage({ open, handleClose }) {

  const { formRegister } = useRegister()
  const [nextstep, setNextStep] = useState(false)

  const handleNextStep = () => {
    setNextStep(true)
  }

  const handleReturn = () => {
    setNextStep(false)
  }

  const onClose = () => {
    handleClose()
    formRegister.resetForm()
  }

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 600 }}>
          <form onSubmit={formRegister.handleSubmit}>

          {
            !nextstep && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p id="unstyled-modal-description" className="modal-description">
                      1 de 2 pasos
                    </p>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Crea tu cuenta
                    </h2>
                  </div>
                  <Fab size="small" aria-label="add"
                    onClick={onClose}
                    sx={{
                      backgroundColor: "#FFFDFA",
                      boxShadow: "none"
                    }}>
                    <ClearIcon />
                  </Fab>
                </div>
                <div>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="fullname"
                    label="Full Name"
                    id="fullname"
                    autoComplete="current-name"
                    value={formRegister.values.fullname}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.fullname && Boolean(formRegister.errors.fullname)}
                    helperText={formRegister.touched.fullname && formRegister.errors.fullname}
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="current-email"
                    value={formRegister.values.email}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.email && Boolean(formRegister.errors.email)}
                    helperText={formRegister.touched.email && formRegister.errors.email}
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formRegister.values.password}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.password && Boolean(formRegister.errors.password)}
                    helperText={formRegister.touched.password && formRegister.errors.password}
                    sx={CssTexField}
                  />
                </div>
                <ButtonContained onClick={handleNextStep} text={"Siguiente"} />
              </div>
            )
          }
          {
            nextstep && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p id="unstyled-modal-description" className="modal-description">
                      2 de 2 pasos
                    </p>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Crea tu cuenta
                    </h2>
                  </div>
                  <Fab size="small" aria-label="add"
                    onClick={handleReturn}
                    sx={{
                      backgroundColor: "#FFFDFA",
                      boxShadow: "none"
                    }}>
                    <KeyboardReturnIcon />
                  </Fab>
                </div>
                <div>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="nif"
                    label="Ruc o Nif"
                    id="nif"
                    autoComplete="current-name"
                    value={formRegister.values.nif}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.nif && Boolean(formRegister.errors.nif)}
                    helperText={formRegister.touched.nif && formRegister.errors.nif}
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="institute"
                    label="Institute"
                    id="institute"
                    autoComplete="current-institute"
                    value={formRegister.values.institute}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.institute && Boolean(formRegister.errors.institute)}
                    helperText={formRegister.touched.institute && formRegister.errors.institute}
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="profesion"
                    label="Carrer"
                    id="profesion"
                    autoComplete="current-profesion"
                    value={formRegister.values.profesion}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.profesion && Boolean(formRegister.errors.profesion)}
                    helperText={formRegister.touched.profesion && formRegister.errors.profesion}
                    sx={CssTexField}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="number"
                    label="Number phone"
                    id="number"
                    autoComplete="current-number"
                    value={formRegister.values.number}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    error={formRegister.touched.number && Boolean(formRegister.errors.number)}
                    helperText={formRegister.touched.number && formRegister.errors.number}
                    sx={CssTexField}
                  />
                </div>
                <ButtonContained
                  text={"Guardar"}
                  type="submit"
                />
              </div>
            )
          }
          </form>

        </ModalContent>

      </Modal>

    </>
  )
}

export default RegisterPage
