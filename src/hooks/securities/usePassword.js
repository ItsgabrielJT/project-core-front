import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { accountService } from "@services/account/accountService";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const FORM_VALUES = {
  contrasenia_anterior: "",
  contrasenia_nueva: "",
  confirmar_contrasenia_nueva: ""
}


export const usePassword = (handleClose, onSuccess) => {

  const [state, setState] = useState({
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: 'Existen campos requeridos'
  });
  const { vertical, horizontal, openSnack, message } = state;
  const [validate, setValidate] = useState(false);
  const { logOut } = useAuth()


  const validationSchema = yup.object({

    contrasenia_anterior: yup
      .string('Enter your institute')
      .required('La contraseña anterior es requerida'),

    contrasenia_nueva: yup
      .string('Enter your carrer')
      .required('La contraseña nueva es requerida'),

    confirmar_contrasenia_nueva: yup
      .string('Enter your phone number')
      .required('La confirmacion de contraseña es requerido'),
  });

  const formPassword = useFormik({
    initialValues: FORM_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      let json = {
        ...values,
      };

      if (validate) {
        console.log(json)
        accountService.updatePassword(json)
          .then((res) => {
            if (res.data.status) {
              logOut();
              notificationService.success("Se ha modificado la contraseña, con exito")
            }
          })
          .catch((err) => {
            notificationService.error(err.message)
          })
      }

      // 
    }
  });

  useEffect(() => {
    if (formPassword.isSubmitting) {
      if (formPassword.values.contrasenia_anterior.trim() == "" || formPassword.errors.contrasenia_anterior) {
        setState({ ...state, openSnack: true, message: formPassword.errors.contrasenia_anterior ? formPassword.errors.contrasenia_anterior : "Aun no has introducido tu anterior contraseña" });
      } else if (formPassword.values.contrasenia_nueva.trim() == "" || formPassword.errors.contrasenia_nueva) {
        setState({ ...state, openSnack: true, message: formPassword.errors.contrasenia_nueva ? formPassword.errors.contrasenia_nueva : "Aun no has colocado la contraseña nueva" });
      } else if (formPassword.values.confirmar_contrasenia_nueva.trim() == "" || formPassword.errors.confirmar_contrasenia_nueva) {
        setState({ ...state, openSnack: true, message: formPassword.errors.confirmar_contrasenia_nueva ? formPassword.errors.confirmar_contrasenia_nueva : "Aun no has confirmado la contraseña" });
      } else if (formPassword.values.contrasenia_nueva != formPassword.values.confirmar_contrasenia_nueva) {
        setState({ ...state, openSnack: true, message: "Las contraseñas no coinciden" });
      } else {
        setValidate(true);
      }
    }
  }, [formPassword.isSubmitting])

  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };

  return {
    formPassword,
    vertical,
    horizontal,
    openSnack,
    message,
    handleCloseSnack
  }
}
