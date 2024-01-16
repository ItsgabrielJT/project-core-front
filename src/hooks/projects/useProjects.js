import { useEffect, useState } from "react"
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"
import { useNavigate } from "react-router-dom";


export const useProjects = () => {

    const [dataHome, setDataHome] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        projectService.getAllProjects()
            .then((res) => {
                if (res.data.status) {
                    let data = []
                    res.data.proyectos.map((item) => {
                        data.push({
                            idProject: item.id, 
                            title_project: item.title_project,
                            fecha: item.updatedAt,
                            description: item.description,
                            link_image_project: item.link_image,
                            userId: item.users[0].id,
                            full_name: item.users[0].full_name,
                            link_image_user: item.users[0].link_image,
                            occupation: item.users[0].occupation,
                            users: item.users

                        })
                    })
                    setDataHome(data)
                } else {
                    notificationService.warning("Intentlo mas tarde")
                }
            })
            .catch((err) => {
                navigate('/error')
                notificationService.error(err.message);
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
