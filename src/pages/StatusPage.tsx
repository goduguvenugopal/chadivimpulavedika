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

    if (!loading && user?.permissions === "approved") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <Loader />;
  if (!user) return null;

  const expiryDate = user.subscriptionExpiresAt
    ? new Date(user.subscriptionExpiresAt)
    : null;

  const now = new Date();

  const isExpired =
    expiryDate && now > expiryDate;

  const daysLeft =
    expiryDate && !isExpired
      ? Math.ceil(
          (expiryDate.getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const upiLink = `upi://pay?pa=${upiId}&pn=Marriage Subscription&am=${amount}&cu=INR`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center">

        {/* STATUS ICON */}
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-yellow-100">
          <span className="text-3xl font-bold text-yellow-600">
            {isExpired ? "⚠" : "⏳"}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-3">
          {isExpired ? "Subscription Expired" : "Subscription Details"}
        </h2>

        {/* MESSAGE */}
        {!isExpired ? (
          <p className="text-gray-600 mb-6">
            Your subscription is active for{" "}
            <strong>{daysLeft} days</strong>.
            After that it will expire.
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            Your subscription has expired.
            To continue using the system, purchase again.
            Subscription Amount: ₹{amount}
          </p>
        )}

        {/* PAY NOW BUTTON */}
        {isExpired && (
          <a
            href={upiLink}
            className="block w-full bg-green-600 text-white py-3 rounded-xl mb-6 hover:bg-green-700 transition"
          >
            Pay ₹{amount} Now
          </a>
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