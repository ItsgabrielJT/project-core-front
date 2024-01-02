import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { accountService } from "@services/account/accountService";
import { useState } from "react";


const FORM_VALUES = {
    password: "",
    universidad: "",
    carrera: "",
    numero_celular: "",
    link_imagen_perfil: "",
}

export const useEdit = (handleClose, onSuccess, image) => {



    const validationSchema = yup.object({

        universidad: yup
            .string('Enter your institute')
            .required('Institute is required'),

        carrera: yup
            .string('Enter your carrer')
            .required('Carrer is required'),
    });

    const formUser = useFormik({
        initialValues: FORM_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            var id = JSON.parse(localStorage.getItem("id"));
            let json = {
                ...values,
                link_imagen_perfil: image
            };
            delete json.password

            accountService.updateUser(id, json)
                .then((res) => {
                    if (res.data.status) {
                        handleClose()
                        formUser.resetForm();
                        notificationService.success("Perfil actualizado")
                        onSuccess(true);
                    }
                })
                .catch((err) => {
                    notificationService.error(err.message)
                })
        }
    });


    return {
        formUser,
    }
}
