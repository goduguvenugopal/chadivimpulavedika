import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPath } from "../utils/getRedirectPath";

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to={getRedirectPath(user)} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
