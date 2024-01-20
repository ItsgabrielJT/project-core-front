import React, { createContext, useContext, useEffect, useState } from "react";
import { accountService } from "@services/account/accountService";
import notificationService from "@services/notificationService";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);


  const singIn = async (user) => {
    await accountService
      .loginUser(user)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("id", JSON.stringify(res.data.id));
          localStorage.setItem("expired", JSON.stringify(new Date()));
          setUser(res.data);
          setIsAuthenticated(res.data.status);
        }
      })
      .catch((err) => {
        notificationService.warning(err.message);
        setLoading(false);
      });
    setLoading(false);

  };

  const isExpired = (storedDate) => {
    const storedTime = new Date(storedDate).getTime();
    const currentTime = new Date().getTime();
    const hoursDifference = (currentTime - storedTime) / (1000 * 60 * 60);
  
    return hoursDifference >= 24;
  };

  const checkLogin = () => {
    var objetoRecuperado = JSON.parse(localStorage.getItem("user"));
    var timeOut = JSON.parse(localStorage.getItem("expired"));
    if (!objetoRecuperado) {
      setIsAuthenticated(false);
    } else if (!timeOut || isExpired(timeOut)) {
      logOut();
    } else {
      setIsAuthenticated(true);
      setUser(objetoRecuperado);
    }
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    localStorage.removeItem("expired");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        singIn,
        logOut,
        user,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
