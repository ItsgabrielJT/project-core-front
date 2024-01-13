import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { accountService } from "@services/account/accountService";


const FORM_VALUES = {
    nombres: "",
    email: "",
    contrasenia: "",
    ocupacion: "",
    universidad: "",
    carrera: "",
    numero_celular: "",
    link_imagen_perfil: "",
}

export const useRegister = (handleClose, publicId) => {

    // const { singUp, isAuthenticated } = useAuth()

    const validationSchema = yup.object({
        nombres: yup
            .string('Enter your fullname')
            .required()

            .max(50, 'El nombre debe ser maximo de 50 caracteres'),

        email: yup
            .string('Enter your email')
            .max(30, 'El email debe ser maximo de 30 caracteres')
            .required()

            .email('Introduzca un email valido'),
        contrasenia: yup
            .string('Enter your password')
            .required()
            .min(8, 'La contraseña debe tener un minima de 8 caracteres'),
        ocupacion: yup
            .string('Enter your ocupation')
            .required("No has selecionado tu perfil"),
        universidad: yup
            .string('Enter your institute')
            .required()

            .max(50, 'La longitud maxima debe ser de 50 caracteres'),

        carrera: yup
            .string('Enter your carrer')
            .required()

            .max(50, 'La longitud maxima debe ser de 50 caracteres'),
        numero_celular: yup
            .number('Enter your phone number')
            .required("No has colocado un numero"),
    });

    const formRegister = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            let json = {
                ...values,
                link_imagen_perfil: publicId,
            }
            accountService
                .singupUser(json)
                .then((res) => {
                    if (res.data.status) {
                        notificationService.success("Revisa tu correo !")
                        handleClose();
                        formRegister.resetForm();
                    }
                })
                .catch((err) => {
                    notificationService.warning(err.message);
                });
        
        }
    });

    return {
        formRegister,
    }
}
