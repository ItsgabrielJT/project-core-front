import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterPage from "./account/RegisterPage";
import LoginPage from "./account/LoginPage";
import HomePage from "./home/HomePage";
import '@styles/App.css'
import { AuthProvider } from "../context/AuthContext";
import SideBar from "../layouts/SideBar";
import UserPage from "./securities/UserPage";
import NotificationsPage from "./notifications/NotificationsPage";
import EditProject from "./projects/EditProject";
import ListProjects from "./projects/ListProjects";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={<SideBar/>}
          >
            <Route path="home" element={<HomePage/>} />
            <Route path="user" element={<UserPage/>} />
            <Route path="projects" element={<ListProjects/>} />
            <Route path="notifications" element={<NotificationsPage/>} />
            <Route path="create/project" element={<EditProject/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
