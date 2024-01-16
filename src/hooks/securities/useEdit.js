import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { accountService } from "@services/account/accountService";
import { useEffect, useState } from "react";


const FORM_VALUES = {
    universidad: "",
    carrera: "",
    numero_celular: "",
    link_imagen_perfil: "",
}

export const useEdit = (handleClose, onSuccess, image, onImage, user, open) => {



    const validationSchema = yup.object({

        universidad: yup
            .string('Enter your institute')
            .required('La universidad es requerida'),

        carrera: yup
            .string('Enter your carrer')
            .required('La carrera es requerida'),

        numero_celular: yup
         .string('Enter your phone number')
         .required('El numero de celular es requerido'),
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
                        notificationService.success("Perfil actualizado")
                        onSuccess(true);
                    }
                })
                .catch((err) => {
                    notificationService.error(err.message)
                })
        }
    });

    useEffect(() => {
        if (user != null) {
            formUser.setValues({
                universidad: user.university_name,
                carrera: user.career,
                numero_celular: user.cellphone_number,
                link_imagen_perfil: user.link_image
            })
            onImage(user.link_image)
        }
    }, [open])


    return {
        formUser,
    }
}
