import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ButtonLoader from "../../components/common/ButtonLoader";
import {
  getAllMarriagesApi,
  updateMarriageAccessApi,
  deleteMarriageApi,
} from "../../api/marriagesApi";

interface Marriage {
  _id: string;
  marriageName: string;
  marriageDate: string;
  location: string;
  adminMobileNumber: string;
  upiId: string;
  subscriptionExpiresAt: string;
  status: string;
  permissions: string;
}

const Marriages = () => {
  const [marriages, setMarriages] = useState<Marriage[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchMarriages = async () => {
    try {
      const { data } = await getAllMarriagesApi();
      setMarriages(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarriages();
  }, []);

  const handleUpdate = async (
    id: string,
    updates: Partial<Marriage>
  ) => {
    try {
      setActionLoading(id);
      await updateMarriageAccessApi(id, updates);
      await fetchMarriages();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this marriage?")) return;

    try {
      setActionLoading(id);
      await deleteMarriageApi(id);
      setMarriages((prev) => prev.filter((m) => m._id !== id));
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = marriages.filter((m) =>
    m.adminMobileNumber.includes(search)
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Marriage Management
        </h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Mobile Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((marriage) => (
            <div
              key={marriage._id}
              className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  {marriage.marriageName}
                </h3>
                <button
                  onClick={() => handleDelete(marriage._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p><strong>Mobile:</strong> {marriage.adminMobileNumber}</p>
                <p><strong>Location:</strong> {marriage.location}</p>
                <p><strong>UPI:</strong> {marriage.upiId}</p>
                <p>
                  <strong>Expires:</strong>{" "}
                  {new Date(
                    marriage.subscriptionExpiresAt
                  ).toLocaleDateString("en-GB")}
                </p>
              </div>

              {/* Permissions Dropdown */}
              <div className="mb-3">
                <label className="text-xs text-gray-500">Permissions</label>
                <select
                  value={marriage.permissions}
                  onChange={(e) =>
                    handleUpdate(marriage._id, {
                      permissions: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="expired">Expired</option>

                </select>
              </div>

              {/* Status Dropdown */}
              <div className="mb-3">
                <label className="text-xs text-gray-500">Status</label>
                <select
                  value={marriage.status}
                  onChange={(e) =>
                    handleUpdate(marriage._id, {
                      status: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Expiry Date Update */}
              <div className="mb-4">
                <label className="text-xs text-gray-500">
                  Update Expiry Date
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    handleUpdate(marriage._id, {
                      subscriptionExpiresAt: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                />
              </div>

              {actionLoading === marriage._id && (
                <div className="mt-auto">
                  <ButtonLoader />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marriages;