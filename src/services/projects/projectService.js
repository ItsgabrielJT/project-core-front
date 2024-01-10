import axios from "axios";
import { URL_BASE } from "../../config";

export const projectService = {
  getAllProjects: async function () {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/proyectos",
      {
        headers: { Authorization: "Bearer " + token },
      }
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  getProjectById: async function (id) {
    
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/proyecto/" + id,
      {
        headers: { Authorization: "Bearer " + token },
      }
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  getProjectByUser: async function () {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.get(URL_BASE + "api/proyectos/usuario", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  createProject: async function (json) {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.post(URL_BASE + "api/crear-proyecto", json, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  deleteProject: async function (id) {
    try {
      const res = await axios.delete(URL_BASE + "api/eliminar-proyecto/" + id);
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  updateProject: async function (id, json) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        URL_BASE + "api/actualizar-proyecto/" + id,
        json,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },
};
