import { useFormik } from "formik"
import * as yup from 'yup';
import notificationService from "@services/notificationService"
import { accountService } from "@services/account/accountService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FORM_VALUES = {
  contrasenia: "",
  confirmar_contrasenia: ""
}


export const useResetPassword = (token) => {

  const [state, setState] = useState({
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: 'Existen campos requeridos'
  });
  const { vertical, horizontal, openSnack, message } = state;
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate()



  const validationSchema = yup.object({

    contrasenia: yup
      .string('Enter your carrer')
      .required('La contraseña nueva es requerida'),

    confirmar_contrasenia: yup
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
        accountService.recoveryPassword(token, json)
          .then((res) => {
            if (res.data.status) {
              notificationService.success("Se ha modificado la contraseña, con exito")
              navigate("/")
              formPassword.resetForm();
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
      if (formPassword.values.contrasenia.trim() == "" || formPassword.errors.contrasenia) {
        setState({ ...state, openSnack: true, message: formPassword.errors.contrasenia ? formPassword.errors.contrasenia : "Aun no has colocado la contraseña nueva" });
      } else if (formPassword.values.confirmar_contrasenia.trim() == "" || formPassword.errors.confirmar_contrasenia) {
        setState({ ...state, openSnack: true, message: formPassword.errors.confirmar_contrasenia ? formPassword.errors.confirmar_contrasenia : "Aun no has confirmado la contraseña" });
      } else if (formPassword.values.contrasenia != formPassword.values.confirmar_contrasenia) {
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
