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
                        data.push({
                            idNotification: item.id,
                            content: item.content,
                            fecha: item.updatedAt,
                            projectId: item.projectId,
                            collaborator_userId: item.collaborator_userId,
                            full_name: item.collaborator.full_name,
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
