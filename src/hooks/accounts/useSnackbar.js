import { useEffect, useState } from "react";

export const useSnackbar = (formRegister, validate, onValidate, onNextStep) => {
    
    const [state, setState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: 'Existen campos requeridos'
      });
      const { vertical, horizontal, openSnack, message } = state;

    useEffect(() => {
        if (validate) {
          if (formRegister.values.nombres.trim() == "" || formRegister.errors.nombres) {
            setState({ ...state, openSnack: true, message: formRegister.errors.nombres ? formRegister.errors.nombres : "El campo nombre es requerido" });
          } else if (formRegister.values.email.trim() == "" || formRegister.errors.email) {
            setState({ ...state, openSnack: true, message: formRegister.errors.email ? formRegister.errors.email : "El campo email es requerido" });
          } else if (formRegister.values.contrasenia.trim() == "" || formRegister.errors.contrasenia) {
            setState({ ...state, openSnack: true, message: formRegister.errors.contrasenia ? formRegister.errors.contrasenia : "El campo contraseña es requerido" });
          } else {
            onNextStep(true);
          }
          onValidate(false);
        }
      }, [validate])

      useEffect(() => {
        if (formRegister.isSubmitting) {
          if (formRegister.errors.ocupacion) {
            setState({ ...state, openSnack: true, message: formRegister.errors.ocupacion ? formRegister.errors.ocupacion : "No has selecionado ningun perfil" });
          } else if (formRegister.values.universidad.trim() == "" || formRegister.errors.universidad) {
            setState({ ...state, openSnack: true, message: formRegister.errors.universidad ? formRegister.errors.universidad : "No has colocado tu universidad" });
          } else if (formRegister.values.carrera.trim() == "" || formRegister.errors.carrera) {
            setState({ ...state, openSnack: true, message: formRegister.errors.carrera ? formRegister.errors.carrera : "No has colocado tu carrera" });
          } else if (formRegister.values.numero_celular.trim() == "" || formRegister.errors.numero_celular) {
            setState({ ...state, openSnack: true, message: formRegister.errors.numero_celular ? formRegister.errors.numero_celular : "No has colocado tu numero celular" });
          } else {
            onNextStep(true);
          }
          onValidate(false);
        }
      }, [formRegister.isSubmitting])

      const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
      };

      return {
        vertical,
        horizontal,
        openSnack,
        message,
        handleCloseSnack
      }

}
