import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";


const FORM_VALUES = {
    email: "",
    contrasenia: ""
}

export const useLogin = () => {

    const { singIn, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        
        if (isAuthenticated) {
            navigate("/home")
        }
    }, [isAuthenticated])

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Introduce un email valido'),
        contrasenia: yup
            .string('Enter your password')
            .required('Password is required'),
    });

    const formLogin = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            singIn(values)
        }
    });

    return {
        formLogin,
    }
}
