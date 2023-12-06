import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./account/RegisterPage";
import LoginPage from "./account/LoginPage";
import '../assets/styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1> Landing </h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
