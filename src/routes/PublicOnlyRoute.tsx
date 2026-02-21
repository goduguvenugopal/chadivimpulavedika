import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPath } from "../utils/getRedirectPath";
import Loader from "../components/common/Loader";

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={getRedirectPath(user)} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
