import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { projectService } from "@services/projects/projectService";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


const FORM_VALUES = {
    id_usuario: 0,
    estado: 0,
    titulo: "",
    descripcion: "",
    objetivos_generales: [],
    alcance: "",
    objetivos_especificos: [],
    referencias_bibliograficas: [],
    link_imagen: ""
}

export const useEdit = (id = null, image, setPublicId) => {

    const validationSchema = yup.object({

        titulo: yup
            .string('Enter your password')
            .required('El titulo es requerido'),

        descripcion: yup
            .string('Enter your institute')
            .max(1200, 'La descripcion debe ser maximo de 1200 caracteres')
            .required('La descripcion es requerido'),
            
        alcance: yup
            .string('Enter your carrer')
            .max(1200, 'El alcance debe ser maximo de 1200 caracteres')
            .required('El alcance es requerido'),
        objetivos_generales: yup
            .string('Enter your phone number')
            .max(1200, 'El objetivo general debe ser maximo de 1200 caracteres')
            .required('El objetivo general es requerido'),
    });

    const [specifics, setSpecifics] = useState([''])
    const [loading, setLoading] = useState(true)
    const [references, setReferences] = useState([''])
    const navigate = useNavigate()


    useEffect(() => {
        if (id != null) {
            projectService.getProjectById(id)
                .then((res) => {
                    if (res.data.status) {
                        formProject.setValues({
                            titulo: res.data.proyecto.title_project,
                            estado: res.data.proyecto.state,
                            descripcion: res.data.proyecto.description,
                            link_imagen: res.data.proyecto.link_image,
                            alcance: res.data.proyecto.scope,
                            id_usuario: res.data.proyecto.users[0].user.id,
                            objetivos_generales: res.data.proyecto.general_objetive[0],
                        })
                        setSpecifics(res.data.proyecto.specific_object)
                        setReferences(res.data.proyecto.bibliographic_references)
                    }
                })
                .catch((err) => {
                    notificationService.error(err.message);
                })
        }
        setLoading(false)

    }, [id])

    const handleAddInput = () => {
        setSpecifics([...specifics, ""]);
      };

    const handleObjectSpecifics = (event, index) => {
        const newSpecifics = [...specifics];
        newSpecifics[index] = event.target.value;
        setSpecifics(newSpecifics);
    }

    const cleanObjectSpecifics = (index) => {
        const newInputs = [...specifics];
        newInputs.splice(index, 1);
        console.log(newInputs)
        setSpecifics(newInputs);
    }

    const handleAddLink = () => {
        setReferences([...references, ""]);
      };

    const handleReferences = (event, index) => {
        const newSpecifics = [...references];
        newSpecifics[index] = event.target.value;
        setReferences(newSpecifics);
    }

    const cleanReferences = (index) => {
        const newInputs = [...references];
        newInputs.splice(index, 1);
        setReferences(newInputs);
    }

    const formProject = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            let json = {
                ...values,

                link_imagen: image
            };
            json.objetivos_especificos = specifics
            json.referencias_bibliograficas = references
            json.objetivos_generales = [json.objetivos_generales]

            if (id != null) {
                delete json.id_usuario;
                projectService.updateProject(id, json)
                    .then((res) => {
                        if (res.data.status) {
                            notificationService.success("Se ha actulizado el proyecto")
                            formProject.resetForm();
                            setReferences([''])
                            setSpecifics([''])
                            setPublicId("")
                            navigate(`/projects/${id}`)

                        }
                    })
                    .catch((err) => {
                        notificationService.error(err)
                    })
            } else {
                json.id_usuario = JSON.parse(localStorage.getItem("id"));
                json.estado = 1
                projectService.createProject(json)
                    .then((res) => {
                        if (res.data.status) {
                            notificationService.success("Se ha creado el proyecto")
                            formProject.resetForm();
                            setPublicId("")

                            setReferences([''])
                            setSpecifics([''])
                        }
                    })
                    .catch((err) => {
                        notificationService.error(err)
                    })
            }

        }
    });

    return {
        formProject,
        specifics,
        references,
        loading,
        handleAddInput,
        handleAddLink,
        handleObjectSpecifics,
        cleanObjectSpecifics,
        handleReferences,
        cleanReferences
    }
}
