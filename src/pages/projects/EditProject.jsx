import { Backdrop, Box, ButtonGroup, CircularProgress, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import ButtonContained from "@components/buttons/ButtonContained";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  CssTexField,
} from "@constants/styles";
import { useEdit } from "@hook/projects/useEdit";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useParams } from 'react-router-dom';

function EditProject() {

  const { id } = useParams();
  const {
    formProject,
    specifics,
    references,
    loading,
    handleObjectSpecifics,
    cleanObjectSpecifics,
    handleReferences,
    cleanReferences
  } = useEdit(id);
  const [inputs, setInputs] = useState(['']);
  const [links, setLinks] = useState(['']);


  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    cleanObjectSpecifics(index)
  };

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleRemoveLink = (index) => {
    const newInputs = [...links];
    newInputs.splice(index, 1);
    setLinks(newInputs);
    cleanReferences(index)
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


        <Grid component='form'
          onSubmit={formProject.handleSubmit}
          sx={{
            marginTop: '10px',
          }}>

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
              <ButtonOutline type='submit' text={"Guardar"} style={{
                width: '100px',
                height: '40px',
                marginLeft: '10px'
              }} />
            </div>

          </div>
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="titulo"
            label="Titulo"
            id="titulo"
            autoComplete="current-name"
            value={formProject.values.titulo}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.titulo &&
              Boolean(formProject.errors.titulo)
            }
            helperText={
              formProject.touched.titulo &&
              formProject.errors.titulo
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="descripcion"
            label="Descripcion"
            id="descripcion"
            autoComplete="current-name"
            value={formProject.values.descripcion}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.descripcion &&
              Boolean(formProject.errors.descripcion)
            }
            helperText={
              formProject.touched.descripcion &&
              formProject.errors.descripcion
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="objetivos_generales"
            label="Objetivo General"
            id="objetivos_generales"
            autoComplete="current-name"
            value={formProject.values.objetivos_generales}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.objetivos_generales &&
              Boolean(formProject.errors.objetivos_generales)
            }
            helperText={
              formProject.touched.objetivos_generales &&
              formProject.errors.objetivos_generales
            }
            sx={CssTexField}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            name="alcance"
            label="Alcance"
            id="alcance"
            autoComplete="current-name"
            value={formProject.values.alcance}
            onChange={formProject.handleChange}
            onBlur={formProject.handleBlur}
            error={
              formProject.touched.alcance &&
              Boolean(formProject.errors.alcance)
            }
            helperText={
              formProject.touched.alcance &&
              formProject.errors.alcance
            }
            sx={CssTexField}
          />
          <Divider textAlign="right">
            <Fab
              size="small"
              aria-label="edit"
              onClick={handleAddInput}
              style={{
                backgroundColor: "#FFFDFA",
                boxShadow: "none",
                zIndex: 0,
              }}
            >
              <AddCircleIcon sx={{
                color: '#319795',
                fontSize: '35px',
              }} />
            </Fab>

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
                label="Objetivo Specifico"
                autoComplete="current-name"
                value={specifics[index]}
                onChange={(event) => handleObjectSpecifics(event, index)}
                sx={CssTexField}
              />
            </div>
          ))}
          <Divider textAlign="right">
            <Fab
              size="small"
              aria-label="edit"
              onClick={handleAddLink}

              style={{
                backgroundColor: "#FFFDFA",
                boxShadow: "none",
                zIndex: 0,
              }}
            >
              <AddCircleIcon sx={{
                color: '#319795',
                fontSize: '35px',
              }} />
            </Fab>

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
                label="Referencia Bibliografica"
                autoComplete="current-name"
                value={references[index]}
                onChange={(event) => handleReferences(event, index)}
                sx={CssTexField}
              />
            </div>
          ))}
        </Grid>

      </Box>
      <Backdrop
        sx={{ backgroundColor: "rgba(155, 190, 200, 0.3)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" size={40} />
      </Backdrop>
    </Grid>
  )
}

export default EditProject