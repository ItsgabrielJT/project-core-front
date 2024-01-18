import axios from "axios";
import { URL_BASE } from "../config";

export const searchService = {

    searchAll: async function (json) {
        try {
            const { token } = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(URL_BASE + "api/buscar", json, {
                headers: { Authorization: "Bearer " + token },
            });
            return res;
        } catch (error) {
            throw new Error("Ha ocurrido un error, intentelo mas tarde");
        }
    },

};
