import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";


const FORM_VALUES = {
    password: "",
    universidad: "",
    carrera: "",
    numero_celular: "",
    image_url: "",
}

export const useEdit = ( handleClose ) => {

    const validationSchema = yup.object({
        
        universidad: yup
            .string('Enter your institute')
            .required('Institute is required'),
            
        carrera: yup
            .string('Enter your carrer')
            .required('Carrer is required'),
        numero_celular: yup
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
