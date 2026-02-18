import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StatusPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const isPending = user.permissions === "pending";
  const isRejected = user.permissions === "rejected";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        {/* Status Icon */}
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 
          ${isPending ? "bg-yellow-100" : "bg-red-100"}`}
        >
          <span
            className={`text-3xl font-bold 
            ${isPending ? "text-yellow-600" : "text-red-600"}`}
          >
            {isPending ? "⏳" : "✖"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {isPending ? "Approval Pending" : "Request Rejected"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {isPending
            ? "Your marriage registration is currently under review. Please wait until an administrator approves your request."
            : "Your marriage registration has been rejected by the administrator. Please contact support or re-register if needed."}
        </p>

        {/* Marriage ID (optional display) */}
        <div className="bg-gray-50 border rounded-lg p-3 mb-6">
          <p className="text-sm text-gray-500">Marriage ID</p>
          <p className="font-medium text-gray-700">{user.marriageId}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={logout}
            className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
