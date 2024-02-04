import { useEffect, useState } from "react"
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService"
import { useNavigate } from "react-router-dom";


export const useUserProjects = (success, onSuccess) => {
    
    const [projects, setProjects] = useState();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
            projectService.getProjectByUser()
            .then((res) => {
                if (res.data.status) {
                    let data = []
                    res.data.proyectoFormateado.map((item) => {
                        data.push({
                            idProject: item.id,
                            title_project: item.title_project,
                            estado: item.state,
                            color: item.state == 1 ? '#63CFDB' : item.state == 2 ? '#DC8B4C' : item.state == 3 ? '#DC3B54' : '#95DB68',
                            userId: item.users[0].id,
                            full_name: item.users[0].full_name,
                            link_image: item.users[0].link_image,
                            occupation: item.users[0].occupation
                        })
                    })
                    console.log(data)
                    setProjects(data)
                    onSuccess(false)
                }
            })
            .catch((err) => {
                navigate('/error')

                notificationService.error(err);
            })
            .finally(() => [
                setLoading(false)
            ])
    }, [success])

    return {
        projects,
        loading
    }
}
