import axios from "axios";
import { URL_BASE } from "../../config";

export const colaboratorService = {
  requestFollow: async function (json) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(URL_BASE + "api/colaborar-proyecto", json, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  notificationsByUser: async function () {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(URL_BASE + "api/notificaciones/usuarios", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  aceptColaborator: async function (id) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.delete(
        URL_BASE + "api/aceptar-colaboracion/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  refuseColaborator: async function (id) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.delete(
        URL_BASE + "api/rechazar-colaboracion/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  aceptInvitation: async function (id) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.delete(
        URL_BASE + "api/aceptar-invitacion/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  refuseInivitation: async function (id) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.delete(
        URL_BASE + "api/rechazar-invitacion/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  projectsColaborate: async function () {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(URL_BASE + "api/proyectos/colaborador", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  inviteColaborate: async function (json) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        URL_BASE + "api/invitar-colaborador-proyecto",
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

  getUsers: async function () {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(URL_BASE + "api/usuarios", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  getPermissions: async function (project, colaborator) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(URL_BASE + "api/ver-permiso/" + colaborator + "/" + project, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  updatePermissions: async function (project, colaborator, json) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.put(URL_BASE + "api/cambiar-permiso/" + colaborator + "/" + project, json, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  deleteColaborator: async function (colaborator, project) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.delete(URL_BASE + "api/eliminar-colaborador/" + colaborator + "/" + project, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },
};
