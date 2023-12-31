import { useEffect, useState } from "react"
import notificationService from "@services/notificationService"
import { colaboratorService } from "@services/colaborators/colaboratorService";

export const useProjects = () => {
 
    const [ projects, setProjects ] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
            colaboratorService.projectsColaborate()
            .then((res) => {
                if (res.data.status) {
                    let data = []
                    res.data.proyectos_colaboracion.map((item) => {
                        data.push({
                            id: item.id,
                            title_project: item.title_project,
                            fecha: item.updatedAt,
                            description: item.description,
                            link_image: item.link_image,
                            propietario: item.propietario.user
                        })
                    })
                    setProjects(data)
                    console.log(data)
                }
            })
            .catch((err) => {
                notificationService.error(err.message);
            })
            .finally(() => [
                setLoading(false)
            ])
    }, [])

    return {
        projects,
        loading
    }
}
