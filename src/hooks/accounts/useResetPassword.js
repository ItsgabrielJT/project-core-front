import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";


const FORM_VALUES = {
    email: "",
}

export const useResetPassword = () => {

    const navigate = useNavigate()

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        
    });

    const formPassword = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            navigate("/login")
        }
    });

    return {
        formPassword,
    }
}
