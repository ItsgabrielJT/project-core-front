
import React, { createContext, useContext, useEffect, useState } from 'react'
import { accountService } from '@services/account/accountService';
import notificationService from '@services/notificationService';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const singUp = async (user) => {
        await accountService.singupUser(user)
            .then((res) => {
                if (res.data.status) {
                    setIsAuthenticated(res.data.status)
                } 
            })
            .catch( (err) => {
                notificationService.warning(err.message)
                setIsAuthenticated(false)

            })
    }

    const singIn = async (user) => {
        await accountService.loginUser(user)
            .then((res) => {
                if (res.data.status) {
                    setUser(res.data)
                    setIsAuthenticated(res.data.status)
                } 
            })
            .catch( (err) => {
                notificationService.warning(err.message)
                setIsAuthenticated(false)

            })
    }

    return (
        <AuthContext.Provider
            value={{
                singUp,
                singIn,
                user,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
