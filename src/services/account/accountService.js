import axios from "axios";
import { URL_BASE } from "../../config";

export const accountService = {
  loginUser: async function (user) {
    try {
      const res = await axios.post(URL_BASE + "api/login", user);
      return res;
    } catch (error) {
      throw new Error("Credenciales incorrectas, intente de nuevo");
    }
  },

  singupUser: async function (user) {
    try {
      const res = await axios.post(URL_BASE + "api/registrar", user);
      return res;
    } catch (error) {
      throw new Error("El email ya existe");
    }
  },

  getPerfilById: async function (id) {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL_BASE + "api/perfil/" + id,
      {
        headers: { Authorization: "Bearer " + token },
      }
      );

      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },

  updateUser: async function (id, user) {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.put(URL_BASE + "api/usuario/" + id, user,
      {
        headers: { Authorization: "Bearer " + token },
      }
      );
      return res;
    } catch (error) {
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
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
      throw new Error("Ha ocurrido un error, intentelo mas tarde");
    }
  },
};
