import { useEffect, useState } from "react";
import { getVisitorsApi, updateVisitorApi } from "../../api/visitorApi";
import Loader from "../../components/common/Loader";
import {
  FiSearch,
  FiX,
  FiEdit,
  FiTrash2,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { deleteVisitorApi } from "../../api/visitorApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/modals/ConfirmModal";
import VisitorForm from "../../components/forms/VisitorForm";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { formatINR } from "../../utils/format";

interface Visitor {
  _id: string;
  visitorName: string;
  amount: number;
  paymentMode: string;
  address: string;
  giftGiven: boolean;
  notes: string;
  createdAt: string;
}

const Visitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [editVisitor, setEditVisitor] = useState<Visitor | null>(null);

  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const { data } = await getVisitorsApi(page, limit, debouncedSearch);

      setVisitors(data.data);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVisitor = async (formData: any) => {
    if (!editVisitor) return;

    const { data } = await updateVisitorApi(editVisitor._id, formData);

    setVisitors((prev) =>
      prev.map((v) => (v._id === editVisitor._id ? data.data : v)),
    );

    setEditVisitor(null); // close modal
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length >= 3) {
        setPage(1);
        setDebouncedSearch(search.trim());
      } else if (search.trim().length === 0) {
        setDebouncedSearch("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await deleteVisitorApi(deleteId);

      setVisitors((prev) => prev.filter((v) => v._id !== deleteId));
      setDeleteId(null);
      toast.success("Visitor Deleted Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [page, debouncedSearch]);

  return (
    <>
      <div className="relative h-full">
        {/* 🔍 Sticky Search */}
        <div className="sticky top-0 z-20 bg-white p-6 shadow-sm border-b">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg 
                   focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                }}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Visitors Content */}
            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
                {!loading && visitors.length === 0 && (
                  <p className="text-gray-500 col-span-full text-center">
                    No visitors found
                  </p>
                )}

                {visitors.map((visitor) => (
                  <div
                    key={visitor._id}
                    className="bg-white rounded-2xl p-5 border shadow-sm 
                     hover:shadow-xl transition-all duration-300 relative"
                  >
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setEditVisitor(visitor)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit size={18} />
                      </button>

                      <button
                        onClick={() => setDeleteId(visitor._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                      {visitor.visitorName}
                    </h3>

                    {/* Badges */}
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {visitor.paymentMode}
                      </span>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          visitor.giftGiven
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {visitor.giftGiven ? "Gift Given" : "No Gift"}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">
                          Amount:
                        </span>{" "}
                        {formatINR(visitor.amount)}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiMapPin size={14} />
                        {visitor.address}
                      </p>

                      {visitor.notes && (
                        <p>
                          <span className="font-medium text-gray-700">
                            Notes:
                          </span>{" "}
                          {visitor.notes}
                        </p>
                      )}

                      <p className="flex items-center gap-2 text-xs text-gray-600 mt-3">
                        <FiClock size={14} />
                        {new Date(visitor.createdAt).toLocaleString("en-IN", {
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
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    disabled={!hasPrevPage}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={!hasNextPage}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 🧾 Custom Delete Modal */}
        {deleteId && (
          <ConfirmModal
            isOpen={!!deleteId}
            title="Delete Visitor"
            message="Are you sure you want to delete this visitor? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            loading={deleting}
            danger
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDelete}
          />
        )}

        {editVisitor && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              className="
        bg-white rounded-2xl shadow-2xl relative
        w-full
        max-w-md
        sm:max-w-lg
        md:max-w-2xl
        lg:max-w-3xl
        xl:max-w-4xl
        max-h-[90vh]
        overflow-y-auto
      "
            >
              {/* Close Button */}
              <button
                onClick={() => setEditVisitor(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>

              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-6">Update Visitor</h2>

                <VisitorForm
                  initialData={editVisitor}
                  isEdit
                  onSubmit={handleUpdateVisitor}
                  authUser={{
                    upiId: user.upiId,
                    upiPayeeName: user.upiPayeeName,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Visitors;
