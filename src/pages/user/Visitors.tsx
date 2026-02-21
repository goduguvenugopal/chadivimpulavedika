import { useEffect, useState } from "react";
import { getVisitorsApi } from "../../api/visitorApi";
import Loader from "../../components/common/Loader";

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
  const [limit] = useState(6);

  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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

  useEffect(() => {
    fetchVisitors();
  }, [page, debouncedSearch]);

  return (
    <>
      <div className="relative h-full">
        {/* 🔍 Sticky Search Header */}
        <div className="sticky top-0 z-20 bg-white p-6 shadow-sm border-b">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by name or address..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="w-full md:w-1/3 px-4 py-2 border rounded-lg 
                   focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {loading && (
              <div className="ml-4">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Visitors Content */}
        <div className="p-6">
          {/* Visitors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
            {!loading && visitors.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No visitors found
              </p>
            )}

            {visitors.map((visitor) => (
              <div
                key={visitor._id}
                className="bg-white shadow-md rounded-xl p-5 border 
                     hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {visitor.visitorName}
                </h3>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Amount:</span> ₹{" "}
                    {visitor.amount.toLocaleString()}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">
                      Payment Mode:
                    </span>{" "}
                    {visitor.paymentMode}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Address:</span>{" "}
                    {visitor.address}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">
                      Gift Given:
                    </span>{" "}
                    {visitor.giftGiven ? "Yes" : "No"}
                  </p>

                  {visitor.notes && (
                    <p>
                      <span className="font-medium text-gray-700">Notes:</span>{" "}
                      {visitor.notes}
                    </p>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
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
                className={`px-4 py-2 rounded-md border ${
                  hasPrevPage
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={!hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded-md border ${
                  hasNextPage
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Visitors;
