import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageMessages from "./pages/admin/ManageMessages";
import ManageContent from "./pages/admin/ManageContent";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#131628",
            color: "#EDEFF7",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="messages" element={<ManageMessages />} />
          <Route path="content" element={<ManageContent />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
