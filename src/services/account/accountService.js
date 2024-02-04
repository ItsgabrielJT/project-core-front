import axios from "axios";
import { URL_BASE } from "../../config";

export const accountService = {
  loginUser: async function (user) {
    try {
      const res = await axios.post(URL_BASE + "api/login", user);
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  singupUser: async function (user) {
    try {
      const res = await axios.post(URL_BASE + "api/registrar", user);
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  getPerfilById: async function (id) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/perfil/" + id, {
        headers: { Authorization: "Bearer " + token },
      });

      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  updateUser: async function (id, user) {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.put(URL_BASE + "api/usuario/" + id, user, {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  deleteUser: async function (id) {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.delete(
        URL_BASE + "api/eliminar-usuario/" +
        id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  getStatistics: async function () {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.get(URL_BASE + "api/estadisticas", {
        headers: { Authorization: "Bearer " + token },
      });
      return res;
    } catch (error) {
      throw error.response.data.msg;
    }
  },

  updatePassword: async function (json) {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.put(
        URL_BASE + "api/actualizar-contrasenia",
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

  sendEmailPassword: async function (json) {
    try {
      const res = await axios.post(
        URL_BASE + "api/recuperar-contrasenia",
        json
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  recoveryPassword: async function (token, json) {
    try {
      const res = await axios.post(
        URL_BASE + "api/nueva-contrasenia/" + token,
        json
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },
};
