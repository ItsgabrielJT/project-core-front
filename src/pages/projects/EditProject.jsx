import { Box, ButtonGroup, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  CssTexField,
  Modal,
  ModalContent,
  ModalButton,
  StyledBackdrop,
} from "@constants/styles";
import { useEdit } from "@hook/projects/useEdit";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";

function EditProject() {

  const { formProject } = useEdit();
  const [inputs, setInputs] = useState(['']);
  const [links, setLinks] = useState(['']);

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleRemoveLink = (index) => {
    const newInputs = [...links];
    newInputs.splice(index, 1);
    setLinks(newInputs);
  };


  return (
    <Grid item xs={12}>

      <Box
        sx={{
          marginTop: "90px",
          height: '100%',
          backgroundColor: '#FFFDFA',
          position: 'overflow',
          boxShadow: 'none',
          paddingX: '15px',

        }}
      >
        <div style={{
          backgroundColor: "#D9D9D9",
          height: '250px',
          margin: '40px 0px 15px 0px',
          borderRadius: "30px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} >
          <AddAPhotoIcon sx={{
            fontSize: 50
          }} />
          <Typography>
            Agrega una imagen
          </Typography>
        </div>

        <div style={{
          justifyContent: "end",
        }}>
          <div
            style={{
              display: 'flex',
              justifyContent: "end",
            }}
          >
            <ButtonContained text={"Invitar"} style={{
              width: '100px',
              marginLeft: '10px',
              height: '40px',

            }} >
            </ButtonContained>
            <ButtonOutline text={"Guardar"} style={{
              width: '100px',
              height: '40px',
              marginLeft: '10px'
            }} />
          </div>

        </div>

        <Grid component='form'
          onSubmit={formProject.handleSubmit}
          sx={{
            marginTop: '10px',
          }}>
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="title"
            label="Title"
            id="title"
            autoComplete="current-name"
            value={formProject.values.title}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.title &&
              Boolean(formProject.errors.title)
            }
            helperText={
              formProject.touched.title &&
              formProject.errors.title
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="description"
            label="Description"
            id="description"
            autoComplete="current-name"
            value={formProject.values.description}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.description &&
              Boolean(formProject.errors.description)
            }
            helperText={
              formProject.touched.description &&
              formProject.errors.description
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="generalObjective"
            label="General Objective"
            id="generalObjective"
            autoComplete="current-name"
            value={formProject.values.generalObjective}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.generalObjective &&
              Boolean(formProject.errors.generalObjective)
            }
            helperText={
              formProject.touched.generalObjective &&
              formProject.errors.generalObjective
            }
            sx={CssTexField}
          />
          <Divider textAlign="right">
            <ButtonContained text={"Agregar obejtivos"}
              onClick={handleAddInput}
              style={{
                width: '190px',
              }} >
            </ButtonContained>
          </Divider>
          {inputs.map((value, index) => (
            <div key={index} style={{
              display: 'flex'
            }}>
              <Fab
                size="small"
                aria-label="add"
                onClick={() => handleRemoveInput(index)}
                sx={{
                  backgroundColor: "#FFFDFA",
                  boxShadow: "none",
                  marginTop: '22px'
                }}
              >
                <ClearIcon />
              </Fab>
              <TextField
                margin="normal"
                fullWidth
                multiline
                name="specificObjective"
                label="Specific Objective"
                id="specificObjective"
                autoComplete="current-name"

                sx={CssTexField}
              />
            </div>
          ))}
          <Divider textAlign="right">
            <ButtonContained text={"Agregar referencias"}
              onClick={handleAddLink}
              style={{
                width: '190px',
              }} >
            </ButtonContained>
          </Divider>
          {links.map((value, index) => (
            <div key={index} style={{
              display: 'flex'
            }}>
              <Fab
                size="small"
                aria-label="add"
                onClick={() => handleRemoveLink(index)}
                sx={{
                  backgroundColor: "#FFFDFA",
                  boxShadow: "none",
                  marginTop: '22px'
                }}
              >
                <ClearIcon />
              </Fab>
              <TextField
                margin="normal"
                fullWidth
                multiline
                name="specificObjective"
                label="Specific Objective"
                id="specificObjective"
                autoComplete="current-name"

                sx={CssTexField}
              />
            </div>
          ))}
        </Grid>

      </Box>
    </Grid>
  )
}

export default EditProject