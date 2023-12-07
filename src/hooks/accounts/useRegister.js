import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";


const FORM_VALUES = {
    email: "",
    password: ""
}

export const useRegister = () => {

    const { singUp, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formLogin = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            singUp("value");
            notificationService.success("Sing in successfully")
            navigate("/home")
        }
    });

    return {
        formLogin,
    }
}
