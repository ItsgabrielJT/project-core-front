import React, { useState } from "react";
import { useEffect } from "react";
import { accountService } from "@services/account/accountService";
import notificationService from "@services/notificationService"

export const useUser = (success) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var id = JSON.parse(localStorage.getItem("id"));
    accountService.getPerfilById(id)
      .then((res) => {
        console.log(res.data)
        setUser(res.data.usuario)
      })
      .catch((err) => {
        notificationService.error(err.message)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [success]);

  return {
    user,
    loading
  }
};
