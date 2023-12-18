import axios from "axios"
import { URL_BASE } from "../../config"

export const projectService = {

    getAllProjects: async function () {
        try {
            const res = await axios.get(URL_BASE + "api/proyectos")
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    },

    getProjectById: async function(id) {
        try {
            const res = await axios.get(URL_BASE + "api/proyecto/" + id)
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    }

}