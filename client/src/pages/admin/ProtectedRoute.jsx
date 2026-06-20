import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <Loader label="verifying session..." />;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
}
