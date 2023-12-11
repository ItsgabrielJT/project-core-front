import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";


const FORM_VALUES = {
    password: "",
    institute: "",
    profesion: "",
    number: "",
    image_url: "",
}

export const useUser = ( handleClose ) => {

    const validationSchema = yup.object({
        
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
       
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

    const formUser = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            handleClose()
        formUser.resetForm();

        }
    });

    return {
        formUser,
    }
}
