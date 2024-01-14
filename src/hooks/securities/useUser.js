import React, { useState } from "react";
import { useEffect } from "react";
import { accountService } from "@services/account/accountService";
import notificationService from "@services/notificationService"
import { useNavigate } from "react-router-dom";

export const useUser = (success, id = null ) => {

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(id != null) {
      accountService.getPerfilById(id)
      .then((res) => {
        setProfile(res.data.usuario)
      })
      .catch((err) => {
        navigate('/error')
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
