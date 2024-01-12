import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";


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

export const useRegister = (handleClose, publicId, ocupacion) => {

    const { singUp, isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            handleClose();
            formRegister.resetForm();
        }
    }, [isAuthenticated])

    const validationSchema = yup.object({
        nombres: yup
            .string('Enter your fullname')
            .max(50, 'El nombre debe ser maximo de 50 caracteres'),

        email: yup
            .string('Enter your email')
            .max(30, 'El email debe ser maximo de 30 caracteres')
            .email('Introduzca un email valido'),
        contrasenia: yup
            .string('Enter your password')
            .min(8, 'La contraseña debe tener un minima de 8 caracteres'),
        ocupacion: yup
            .string('Enter your ocupation'),
        universidad: yup
            .string('Enter your institute')
            .max(50, 'La longitud maxima debe ser de 50 caracteres'),

        carrera: yup
            .string('Enter your carrer')
            .max(50, 'La longitud maxima debe ser de 50 caracteres'),
        numero_celular: yup
            .number('Enter your phone number'),
    });

    const formRegister = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            //singUp(values);
            let json = {
                ...values,
                link_imagen_perfil: publicId,
                ocupacion: ocupacion
            }
            console.log(json)

        }
    });

    return {
        formRegister,
    }
}
