
import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext( AuthContext );
    if( !context ) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated] = useState(false)

    const singUp = async (user) => {
        setUser({
            token: "asdasddadsdadsdasdasdadasdasd890as8das9das"
        })
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider
            value={{
                singUp,
                user,
                isAuthenticated
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
