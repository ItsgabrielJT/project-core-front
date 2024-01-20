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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },
};
