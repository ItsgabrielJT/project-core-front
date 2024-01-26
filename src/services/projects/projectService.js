import axios from "axios";
import { URL_BASE } from "../../config";

export const projectService = {
  getAllProjects: async function () {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/proyectos", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  getProjectById: async function (id) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/proyecto/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
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
      throw error.response.data.msg;
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
      throw error.response.data.msg;
    }
  },

  deleteProject: async function (id) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.delete(URL_BASE + "api/eliminar-proyecto/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
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
      throw error.response.data.msg;
    }
  },
};
