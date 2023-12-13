import React, { useState } from "react";
import { useEffect } from "react";
import { accountService } from "@services/account/accountService";
import notificationService from "@services/notificationService"

export const useUser = () => {

    const [user, setUser] = useState()

  useEffect(() => {
    var id = JSON.parse(localStorage.getItem("id"));
    console.log(id);
    accountService.getPerfilById(id)
        .then( (res) => {
            console.log(res.data)
        })
        .catch((err) => {
            notificationService.error(err.message)
        })

  }, []);
};
