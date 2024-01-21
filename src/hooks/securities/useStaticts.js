import React, { useEffect, useState } from 'react'
import notificationService from "@services/notificationService"
import { accountService } from "@services/account/accountService";

export const useStaticts = (success, id = null) => {
  
    const [staticts, setStaticts] = useState(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if(id != null) {
        console.log("entro auiq")
        accountService.getStatistics()
        .then((res) => {
            let data = []

            res.data.proyectos.map((item) => {
                data.push({
                  iniciado: item["1"],
                  enProceso: item["2"],
                  finalizado: item["3"],
                  enRevision: item["4"],
                  mes: item.MES

                })
                
            })

           

          setStaticts(data)
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
      staticts,
      loading
    }

}
