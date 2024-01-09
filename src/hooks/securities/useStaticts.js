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
            let iniciado, enProceso, finalizado, enRevision
            let mes = ["Enero", "Febrero", "Marzo"]

            res.data.proyectos.map((item) => {
                if (item.estado == 1) {
                    iniciado = item.proyectos
                } else if (item.estado == 2) {
                    enProceso = item.proyectos

                } else if (item.estado == 3) {
                    finalizado = item.proyectos

                } else {
                    enRevision = item.proyectos
                }
                
            })

            data.push({
                iniciado, enProceso, finalizado, enRevision, mes : "Enero"
            })
            data.push({
                iniciado: 0, enProceso: 0, finalizado: 0, enRevision: 0, mes : "Febrero"
            })
            data.push({
                iniciado: 0, enProceso: 0, finalizado: 0, enRevision: 0, mes : "Marzo"

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
