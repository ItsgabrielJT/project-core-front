import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterPage from "./account/RegisterPage";
import LoginPage from "./account/LoginPage";
import HomePage from "./home/HomePage";
import '@styles/App.css'
import { AuthProvider } from "../context/AuthContext";
import UserPage from "./securities/UserPage";
import NotificationsPage from "./notifications/NotificationsPage";
import EditProject from "./projects/EditProject";
import ListProjects from "./projects/ListProjects";
import DetailProject from "./projects/DetailProject";
import { ProtectedRoute } from "../_routes";
import ErrorPage from "./errors/ErrorPage";
import RecoveryPassword from "./account/RecoveryPassword";
import ListFolloProjects from "./projects/ListFollowProjects";
import Projects from "./admin/Projects";
import ProjectDetail from "./admin/ProjectDetail";
import UserDetail from "./admin/UserDetail";
import Users from "./admin/Users";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recuperar-contraseña/:token" element={<RecoveryPassword/>} />


          <Route
            element={<ProtectedRoute/>}
          >
            <Route path="home" element={<HomePage/>} />
            <Route path="error" element={<ErrorPage/>} />
            <Route path="user" element={<UserPage/>} />
            <Route path="user/:id" element={<UserPage/>} />
            <Route path="projects" element={<ListProjects/>} />
            <Route path="projects" element={<ListProjects/>} />
            <Route path="projects/follow" element={<ListFolloProjects/>} />
            <Route path="notifications" element={<NotificationsPage/>} />
            <Route path="create/project" element={<EditProject/>} />
            <Route path="projects/:id/edit" element={<EditProject/>} />
            <Route path="projects/:id" element={<DetailProject/>} />
          </Route>

          <Route
            element={<ProtectedRoute/>}
            path="admin"
          >
            <Route path="projects" element={<Projects/>} />
            <Route path="users" element={<Users/>} />
            <Route path="projects/:id" element={<ProjectDetail/>} />
            <Route path="user" element={<UserDetail/>} />
            <Route path="user/:id" element={<UserDetail/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
