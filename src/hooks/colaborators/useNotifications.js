import { useEffect, useState } from "react"
import notificationService from "@services/notificationService"
import { colaboratorService } from "@services/colaborators/colaboratorService";

export const useNotifications = (success, onSuccess) => {
    
    const [ notifications, setNotifications ] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
            colaboratorService.notificationsByUser()
            .then((res) => {
                if (res.data.status) {
                    let data = []
                    res.data.notificaciones.map((item) => {
                        const content = item.content
                        data.push({
                            idNotification: item.id,
                            content: content,
                            fecha: item.updatedAt,
                            projectId: item.projectId,
                            collaborator_userId: item.collaborator_userId,
                            full_name: item.owner.full_name,
                            type: content.includes("pedido") ? "pedido" : "solicitado"
                        })
                    })
                    setNotifications(data)
                    console.log(data)
                    onSuccess(false)
                }
            })
            .catch((err) => {
                notificationService.error(err.message);
            })
            .finally(() => [
                setLoading(false)
            ])
    }, [success])

    return {
        notifications,
        loading
    }
}
