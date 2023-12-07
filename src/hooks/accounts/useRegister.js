import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";


const FORM_VALUES = {
    fullname: "",
    email: "",
    password: "",
    nif: "",
    institute: "",
    profesion: "",
    number: "",
    image_url: "",
}

export const useRegister = () => {

    const { singUp, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const validationSchema = yup.object({
        fullname: yup
            .string('Enter your fullname')
            .required('Fullname is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        nif: yup
            .string('Enter your ruc or nif')
            .required('Ruc or Nif is required'),
        institute: yup
            .string('Enter your institute')
            .required('Institute is required'),
        profesion: yup
            .string('Enter your carrer')
            .required('Carrer is required'),
        number: yup
            .string('Enter your phone number')
            .required('Phone number is required'),
    });

    const formRegister = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            singUp("value");
            navigate("/home")
        }
    });

    return {
        formRegister,
    }
}
