import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import env from "../config/env";

const StatusPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const supportEmail = env.SUPPORT_EMAIL;
  const supportPhone = env.SUPPORT_PHONE;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) return null;

  const isPending = user.permissions === "pending";
  const isApproved = user.permissions === "approved";
  {
    isApproved && navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 px-4 bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 text-center border border-white/40">
        {/* Status Icon */}
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md
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
            ? "Your marriage registration is currently under review. Our admin team will verify and approve it shortly."
            : "Your marriage registration was rejected. Please contact support for clarification or register again."}
        </p>

        {/* Contact Section */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6 text-left">
          <h4 className="font-semibold text-rose-600 mb-2 text-center">
            Contact Support
          </h4>

          <div className="space-y-1 text-sm text-gray-700">
            <p>
              📧 Email:{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-rose-600 hover:underline"
              >
                {supportEmail}
              </a>
            </p>

            <p>
              📞 Phone:{" "}
              <a
                href={`tel:${supportPhone}`}
                className="text-rose-600 hover:underline"
              >
                {supportPhone}
              </a>
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full bg-gray-800 text-white py-2.5 rounded-xl hover:bg-gray-900 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StatusPage;
