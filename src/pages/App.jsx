import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./account/RegisterPage";
import LoginPage from "./account/LoginPage";
import HomePage from "./home/HomePage";
import '@styles/App.css'
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1> Landing </h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
