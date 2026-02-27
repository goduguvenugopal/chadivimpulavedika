import {
  FiEdit,
  FiMapPin,
  FiCalendar,
  FiPhone,
  FiCreditCard,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminProfile = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Marriage Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your marriage event details
          </p>
        </div>

        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition">
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
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
