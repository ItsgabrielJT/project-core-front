import React, { useEffect, useState } from 'react'
import { colaboratorService } from '@services/colaborators/colaboratorService'
import notificationService from "@services/notificationService"

export const useUsers = () => {
  
    const [ users, setUsers ] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        colaboratorService.getUsers()
        .then((res) => {
            if (res.data.status) {
                let data = []
                res.data.users.map((item) => {
                    data.push(item)
                })
                setUsers(data)
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
    users,
    loading
}
}
