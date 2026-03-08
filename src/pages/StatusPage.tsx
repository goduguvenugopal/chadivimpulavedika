import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import env from "../config/env";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const StatusPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const supportEmail = env.SUPPORT_EMAIL;
  const supportPhone = env.SUPPORT_PHONE;

  const upiId = env.SUBSCRIPTION_UPI_ID;
  const amount = env.SUBSCRIPTION_AMOUNT || 500;

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 py-4 select-none">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8">
        {/* STATUS CONFIG */}
        {(() => {
          let icon = "⏳";
          let title = "";
          let titleColor = "text-yellow-600";
          let iconBg = "bg-yellow-100";
          let description = "";

          if (isRejected) {
            icon = "✖";
            title = "Registration Rejected";
            titleColor = "text-red-600";
            iconBg = "bg-red-100";
            description =
              "Your marriage registration has been rejected by the administrator. Please contact support for clarification.";
          }

          if (isPending) {
            title = "Subscription Pending Activation";
            description = `Your account is awaiting subscription activation. 
            Complete the payment of ₹${amount} to activate your subscription immediately.`;
          }

          if (isExpired) {
            icon = "⚠";
            title = "Subscription Expired";
            titleColor = "text-red-600";
            iconBg = "bg-red-100";
            description = `Your subscription period has ended. Renew your subscription to regain full access to the system.`;
          }

          return (
            <>
              {/* ICON */}
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${iconBg}`}
              >
                <span className="text-3xl">{icon}</span>
              </div>

              {/* TITLE */}
              <h2
                className={`text-2xl font-semibold text-center mb-3 ${titleColor}`}
              >
                {title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-center mb-6 whitespace-pre-line">
                {description}
              </p>

              {/* SUBSCRIPTION DETAILS (Only for Pending & Expired) */}
              {(isPending || isExpired) && (
                <div className="bg-gray-50 border rounded-2xl p-5 mb-6 space-y-3 text-sm text-gray-700">
                  <h4 className="font-semibold text-gray-800 text-center text-base">
                    Subscription Details
                  </h4>

                  <p>
                    • Subscription Validity:
                    <span className="font-medium"> 3 Days</span>
                  </p>

                  <p>
                    • Subscription Amount:
                    <span className="font-medium"> ₹{amount}</span>
                  </p>

                  <p>• Full Dashboard Access during active subscription</p>
                  <p>• Add / Edit / Delete Marriage Visitors</p>
                  <p>• Generate Reports & Download PDF</p>
                  <p>• UPI QR Payment Support</p>

                  <p>
                    • Data Retention Policy:
                    <span className="font-medium">
                      {" "}
                      Marriage data will be securely stored for 30 Days (1
                      Month) after subscription expiry.
                    </span>
                  </p>

                  <p className="text-red-500 text-xs mt-2">
                    After 30 days from expiry, all associated marriage data will
                    be permanently removed from the system.
                  </p>
                </div>
              )}

              {/* PAYMENT BUTTON */}
              {(isPending || isExpired) && (
                <a
                  href={upiLink}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-xl mb-6 hover:bg-green-700 transition font-medium"
                >
                  {isExpired ? `Renew for ₹${amount}` : `Pay ₹${amount} Now`}
                </a>
              )}
            </>
          );
        })()}

        {/* SUPPORT SECTION */}
        <div className="bg-rose-50 border rounded-xl p-4 mb-6 text-sm">
          <h4 className="font-semibold text-rose-600 mb-2 text-center">
            Support & Assistance
          </h4>

          <p className="text-gray-700">
            For payment confirmation or account approval, contact:
          </p>

          <p className="mt-2 flex items-center gap-2">
            <FaPhone className="text-blue-600" />
            <a href={`tel:${supportPhone}`} className="hover:underline">
              {supportPhone}
            </a>
          </p>

          <p className="mt-2 flex items-center gap-2">
            <FaEnvelope className="text-red-500" />
            <a href={`mailto:${supportEmail}`} className="hover:underline">
              {supportEmail}
            </a>
          </p>
          
          <p className="mt-2 flex items-center gap-2">
            <FaWhatsapp className="text-green-500" />
            <a
              href={`https://wa.me/${supportPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>

        {/* LOGOUT */}
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
