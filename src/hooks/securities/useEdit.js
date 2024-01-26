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

    const [state, setState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: 'Existen campos requeridos'
    });
    const { vertical, horizontal, openSnack, message } = state;
    const [validate, setValidate] = useState(false);


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

            if (validate) {
                accountService.updateUser(id, json)
                    .then((res) => {
                        if (res.data.status) {
                            handleClose()
                            notificationService.success("Perfil actualizado")
                            onSuccess(true);
                        }
                    })
                    .catch((err) => {
                        notificationService.error(err)
                    })
            }
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


    useEffect(() => {
        if (formUser.isSubmitting) {
            if (formUser.values.universidad.trim() == "" || formUser.errors.universidad) {
                setState({ ...state, openSnack: true, message: formUser.errors.universidad ? formUser.errors.universidad : "Aun no has introducido tu universidad" });
            } else if (formUser.values.carrera.trim() == "" || formUser.errors.carrera) {
                setState({ ...state, openSnack: true, message: formUser.errors.carrera ? formUser.errors.carrera : "Aun no has introducido tu carrera" });
            } else if (formUser.values.numero_celular.trim() == "" || formUser.errors.numero_celular) {
                setState({ ...state, openSnack: true, message: formUser.errors.numero_celular ? formUser.errors.numero_celular : "Aun no has introducido tu numero celular" });
            } else if (!formUser.values.numero_celular.includes("593")) {
                setState({ ...state, openSnack: true, message: "El formato de numeero tiene que ser 593XXXXXXXX" });
            } else {
                setValidate(true);
            }
        }
    }, [formUser.isSubmitting])

    const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
    };

    return {
        formUser,
        vertical,
        horizontal,
        openSnack,
        message,
        handleCloseSnack
    }
}
