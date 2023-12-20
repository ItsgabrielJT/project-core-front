import { useEffect, useState } from "react"
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"

export const useDetail = (id = null) => {

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (id) {
            projectService.getProjectById(id)
                .then((res) => {
                    if (res.data.status) {
                        let data = {
                            title_project: res.data.proyecto.title_project,
                            fecha: res.data.proyecto.updatedAt,
                            state: res.data.proyecto.state,
                            description: res.data.proyecto.description,
                            link_image: res.data.proyecto.link_image,
                            scope: res.data.proyecto.scope,
                            general_objetive: res.data.proyecto.general_objetive,
                            specific_object: res.data.proyecto.specific_object,
                            bibliographic_references: res.data.proyecto.bibliographic_references,
                            userId: res.data.proyecto.users[0].user.id,
                            full_name: res.data.proyecto.users[0].user.full_name,
                            link_image: res.data.proyecto.users[0].user.link_image,
                            occupation: res.data.proyecto.users[0].user.occupation,
                            university_name: res.data.proyecto.users[0].user.university_name
                        }
                        setProject(data)
                    } else {
                        notificationService.warning("Intentlo mas tarde")
                    }
                })
                .catch((err) => {
                    notificationService.error(err.message);
                })
                .finally(() => [
                    setLoading(false)
                ])
        }
    }, [id])

    return {
        project,
        loading
    }

}
