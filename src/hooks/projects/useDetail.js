import { useEffect, useState } from "react";
import { projectService } from "@services/projects/projectService";
import notificationService from "@services/notificationService";
import { useNavigate } from "react-router-dom";

export const useDetail = (id = null, user, success) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isColaborator, setIsColaborator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && success) {
      projectService
        .getProjectById(id)
        .then((res) => {
          if (res.data.status) {
            let data = {
              title_project: res.data.proyecto.title_project,
              fecha: res.data.proyecto.updatedAt,
              state: res.data.proyecto.state,
              color:
                res.data.proyecto.state == 1
                  ? "#63CFDB"
                  : res.data.proyecto.state == 2
                  ? "#DC8B4C"
                  : res.data.proyecto.state == 3
                  ? "#DC3B54"
                  : "#95DB68",
              description: res.data.proyecto.description,
              link_image_project: res.data.proyecto.link_image,
              scope: res.data.proyecto.scope,
              general_objetive: res.data.proyecto.general_objetive,
              specific_object: res.data.proyecto.specific_object,
              bibliographic_references:
                res.data.proyecto.bibliographic_references,
              userId: res.data.proyecto.users[0].user.id,
              full_name: res.data.proyecto.users[0].user.full_name,
              link_image_user: res.data.proyecto.users[0].user.link_image,
              occupation: res.data.proyecto.users[0].user.occupation,
              career: res.data.proyecto.users[0].user.career,
              university_name: res.data.proyecto.users[0].user.university_name,
              colaborators: res.data.proyecto.colaborators,
            };
            let colaborator = data.colaborators.find(
              (obj) => obj.user.id === user.id
            );
            colaborator ? setIsColaborator(true) : setIsColaborator(false);
            setProject(data);
          } else {
            notificationService.warning("Intentlo mas tarde");
          }
        })
        .catch((err) => {
          navigate("/error");
          notificationService.error(err.message);
        })
        .finally(() => [setLoading(false)]);
    }
  }, [id, success]);

  return {
    project,
    isColaborator,
    loading,
  };
};
