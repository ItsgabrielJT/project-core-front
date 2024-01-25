import React, { useEffect, useState } from "react";
import { colaboratorService } from "@services/colaborators/colaboratorService";
import notificationService from "@services/notificationService";

export const usePermissions = (project, colaborator, isColaborator) => {
  const [permission, setPermissions] = useState({
    edit: false,
    delete: false,
  });

  useEffect(() => {
    if (isColaborator) {
        colaboratorService
        .getPermissions(project, colaborator)
        .then((res) => {
          if (res.data.status) {
              let { permission } = res.data.permiso
              setPermissions({
                  edit: permission.update_project,
                  delete: permission.delete_project
              });
          }   
        })
        .catch((err) => {
          notificationService.error(err.message);
        })
    }
    
  }, [isColaborator]);

  return {
    permission,
  };
};
