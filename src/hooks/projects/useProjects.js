import { useEffect, useState } from "react"
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"


export const useProjects = () => {

    const [dataHome, setDataHome] = useState();
      const [loading, setLoading] = useState(true)


    useEffect(() => {
        projectService.getAllProjects()
            .then((res) => {
                if (res.data.status) {
                    let data = []
                    res.data.proyectos.map((item) => {
                        data.push({
                            idProject: item.id,
                            title_project: item.title_project,
                            description: item.description,
                            link_image: item.link_image,
                            userId: item.users[0].id,
                            full_name: item.users[0].full_name,
                            link_image: item.users[0].link_image,
                            occupation: item.users[0].occupation
                        })
                    })
                    setDataHome(data)
                } else {
                    notificationService.warning("Intentlo mas tarde")
                }
            })
            .catch((err) => {
                notifificationService.error(err.messsage);
            })
            .finally(() => [
                setLoading(false)
            ])
    }, [])

    return {
        dataHome,
        loading
    }

}
