import axios from "axios"
import { URL_BASE } from "../../config"

export const accountService = {


    loginUser: async function (user) {
        try {
            const res = await axios.post(URL_BASE + "api/login", user)
            return res
        } catch (error) {
            throw new Error("Credenciales incorrectas, intente de nuevo")
        }
    },

    singupUser: async function (user) {
        try {
            const res = await axios.post(URL_BASE + "api/registrar", user)
            return res
        } catch (error) {
            throw new Error("El email ya existe")
        }
    },

    getPerfilById: async function (id) {
        try {
            const res = await axios.post(URL_BASE + "api/perfil/", id)
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    }

}