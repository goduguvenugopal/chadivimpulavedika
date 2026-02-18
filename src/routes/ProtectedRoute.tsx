import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPath } from "../utils/getRedirectPath";

interface Props {
  allowedRoles?: string[];
  requireApproved?: boolean;
}

const ProtectedRoute = ({
  allowedRoles,
  requireApproved = true,
}: Props) => {
  const { user, loading } = useAuth();

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}


  if (!user) return <Navigate to="/login" replace />;

  if (requireApproved && user.permissions !== "approved") {
    return <Navigate to="/status" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRedirectPath(user)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
