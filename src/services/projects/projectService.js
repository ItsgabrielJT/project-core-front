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
    },

    createProject: async function(json) {
        try {
            const res = await axios.post(URL_BASE + "api/crear-proyecto", json)
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    },

    deleteProject: async function(id) {
        try {
            const res = await axios.delete(URL_BASE + "api/eliminar-proyecto/" + id)
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    },

    updateProject: async function(id, json) {
        try {
            const res = await axios.put(URL_BASE + "api/actualizar-proyecto/" + id, json)
            return res
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde")
        }
    },

}