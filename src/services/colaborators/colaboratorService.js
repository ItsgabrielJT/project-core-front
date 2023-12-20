import axios from "axios";
import { URL_BASE } from "../../config";

export const colaboratorService = {
  requestFollow: async function (json) {
    try {
      const res = await axios.post(URL_BASE + "api/colaborar-proyecto", json);
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
    try {
      const res = await axios.delete(URL_BASE + "api/aceptar-colaboracion/" + id);
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  refuseColaborator: async function (id) {
    try {
      const res = await axios.delete(URL_BASE + "api/rechazar-colaboracion/" + id);
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },
};
