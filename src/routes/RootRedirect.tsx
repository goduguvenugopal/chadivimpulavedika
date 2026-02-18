import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPath } from "../utils/getRedirectPath";

const RootRedirect = () => {
  const { user, loading } = useAuth();

 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}


  return <Navigate to={getRedirectPath(user)} replace />;
};

export default RootRedirect;
