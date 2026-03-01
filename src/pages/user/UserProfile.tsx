import {
  FiEdit,
  FiMapPin,
  FiCalendar,
  FiPhone,
  FiCreditCard,
  FiUser,
  FiClock,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { updateMyMarriageApi } from "../../api/marriagesApi";
import { toast } from "react-toastify";
import MarriageForm from "../../components/forms/MarriageForm";

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const [form, setForm] = useState({
    marriageName: "",
    marriageDate: "",
    location: "",
    adminMobileNumber: "",
    password: "",
    upiId: "",
    upiPayeeName: "",
  });

  const handleEditClick = () => {
    setForm({
      marriageName: user.marriageName,
      marriageDate: user.marriageDate.split("T")[0],
      location: user.location,
      adminMobileNumber: user.adminMobileNumber,
      password: "",
      upiId: user.upiId,
      upiPayeeName: user.upiPayeeName,
    });

    setShowModal(true);
  };

  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "adminMobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!upiRegex.test(form.upiId)) {
      toast.error("Enter valid UPI ID");
      return;
    }

    try {
      setLoading(true);
      await updateMyMarriageApi(form);
      toast.success("Updated successfully 💐");
      setShowModal(false);
      window.location.reload(); // simplest refresh
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Marriage Profile
            </h1>
            <p className="text-sm text-gray-500">
              Manage your marriage event details
            </p>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            <FiEdit size={16} />
            Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Marriage Name + Badges */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {user.marriageName}
            </h2>

            <div className="flex gap-3 mt-3 md:mt-0">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                {user.permissions}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marriage Date */}
            <div className="flex items-start gap-3">
              <FiCalendar className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Marriage Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(user.marriageDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <FiMapPin className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{user.location}</p>
              </div>
            </div>

            {/* Admin Mobile */}
            <div className="flex items-start gap-3">
              <FiPhone className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Registered Mobile</p>
                <p className="font-medium text-gray-800">
                  {user.adminMobileNumber}
                </p>
              </div>
            </div>

            {/* UPI ID */}
            <div className="flex items-start gap-3">
              <FiCreditCard className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">UPI ID</p>
                <p className="font-medium text-gray-800 break-all">
                  {user.upiId}
                </p>
              </div>
            </div>

            {/* UPI Payee Name */}
            <div className="flex items-start gap-3">
              <FiUser className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">UPI Payee Name</p>
                <p className="font-medium text-gray-800">{user.upiPayeeName}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-start gap-3">
              <FiCalendar className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium text-gray-800">
                  {new Date(user.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiClock className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Subscription Ends On</p>

                <p className="font-medium text-gray-800">
                  {user.subscriptionExpiresAt
                    ? new Date(user.subscriptionExpiresAt).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        },
                      )
                    : "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div
            className="bg-white w-full max-w-3xl rounded-2xl shadow-xl relative
                  max-h-[95vh] overflow-y-auto
                  p-5 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center sm:text-left">
              Update Marriage Details
            </h2>

            <MarriageForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={loading}
              buttonText="Update Details"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isUpdate={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
