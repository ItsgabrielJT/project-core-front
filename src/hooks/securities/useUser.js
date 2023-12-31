import React, { useState } from "react";
import { useEffect } from "react";
import { accountService } from "@services/account/accountService";
import notificationService from "@services/notificationService"

export const useUser = (success, id = null ) => {

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(id != null) {
      accountService.getPerfilById(id)
      .then((res) => {
        setProfile(res.data.usuario)
      })
      .catch((err) => {
        notificationService.error(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
    } 
    

  }, [success, id]);

  return {
    profile,
    loading
  }
};
