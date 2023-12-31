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

export const useRegister = (handleClose) => {

    const { singUp, isAuthenticated } = useAuth()

    useEffect   (() => {
        if (isAuthenticated) {
            handleClose();
            formRegister.resetForm();
        }
    }, [isAuthenticated])

    const validationSchema = yup.object({
        nombres: yup
            .string('Enter your fullname')
            .required('Fullname is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        contrasenia: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        ocupacion: yup
            .string('Enter your ocupation')
            .required('Ocupation is required'),
        universidad: yup
            .string('Enter your institute')
            .required('Institute is required'),
        carrera: yup
            .string('Enter your carrer')
            .required('Carrer is required'),
        numero_celular: yup
            .number('Enter your phone number')
            .required('Phone number is required'),
    });

    const formRegister = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            singUp(values);

        }
    });

    return {
        formRegister,
    }
}
