import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterPage from "./account/RegisterPage";
import LoginPage from "./account/LoginPage";
import HomePage from "./home/HomePage";
import '@styles/App.css'
import { AuthProvider } from "../context/AuthContext";
import SideBar from "../layouts/SideBar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/auth"
            element={<SideBar/>}
          >
            <Route path="home" element={<HomePage/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
