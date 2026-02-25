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

  const upiId = env.SUBSCRIPTION_UPI_ID;
  const amount = env.SUBSCRIPTION_AMOUNT || 1000;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }

    // Only approved users go to dashboard
    if (!loading && user?.permissions === "approved") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <Loader />;
  if (!user) return null;

  const isPending = user.permissions === "pending";
  const isRejected = user.permissions === "rejected";
  const isExpired = user.permissions === "expired";

  const upiLink = `upi://pay?pa=${upiId}&pn=Marriage Subscription&am=${amount}&cu=INR`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center">

        {/* REJECTED UI */}
        {isRejected && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-red-100">
              <span className="text-3xl text-red-600">✖</span>
            </div>

            <h2 className="text-2xl font-semibold text-red-600 mb-3">
              Registration Rejected
            </h2>

            <p className="text-gray-600 mb-6">
              Your marriage registration was rejected.
              Please contact support for clarification.
            </p>
          </>
        )}

        {/* PENDING UI (WITH PAY BUTTON) */}
        {isPending && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-yellow-100">
              <span className="text-3xl text-yellow-600">⏳</span>
            </div>

            <h2 className="text-2xl font-semibold text-yellow-600 mb-3">
              Subscription Pending
            </h2>

            <p className="text-gray-600 mb-6">
              Your subscription request is under review.
              To activate your account faster, complete payment below.
              Subscription Amount: ₹{amount}
            </p>

            <a
              href={upiLink}
              className="block w-full bg-green-600 text-white py-3 rounded-xl mb-6 hover:bg-green-700 transition"
            >
              Pay ₹{amount} Now
            </a>
          </>
        )}

        {/* EXPIRED UI */}
        {isExpired && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-red-100">
              <span className="text-3xl text-red-600">⚠</span>
            </div>

            <h2 className="text-2xl font-semibold text-red-600 mb-3">
              Subscription Expired
            </h2>

            <p className="text-gray-600 mb-6">
              Your subscription has expired.
              Renew now to continue using the system.
              Subscription Amount: ₹{amount}
            </p>

            <a
              href={upiLink}
              className="block w-full bg-green-600 text-white py-3 rounded-xl mb-6 hover:bg-green-700 transition"
            >
              Renew for ₹{amount}
            </a>
          </>
        )}

        {/* CONTACT SUPPORT */}
        <div className="bg-rose-50 border rounded-xl p-4 mb-6 text-left">
          <h4 className="font-semibold text-rose-600 mb-2 text-center">
            Contact Support
          </h4>

          <p className="text-sm">
            📧{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="text-rose-600 hover:underline"
            >
              {supportEmail}
            </a>
          </p>

          <p className="text-sm">
            📞{" "}
            <a
              href={`tel:${supportPhone}`}
              className="text-rose-600 hover:underline"
            >
              {supportPhone}
            </a>
          </p>
        </div>

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