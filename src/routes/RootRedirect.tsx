import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPath } from "../utils/getRedirectPath";
import Loader from "../components/common/Loader";

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return <Navigate to={getRedirectPath(user)} replace />;
};

export default RootRedirect;
