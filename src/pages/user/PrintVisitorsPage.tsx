import { useEffect, useState } from "react";
import { getPrintVisitorsApi } from "../../api/visitorApi";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthProvider";
import { formatINR } from "../../utils/format";

interface Visitor {
  _id: string;
  visitorName: string;
  amount: number;
  paymentMode: string;
  address: string;
  giftGiven: boolean;
  notes?: string;
  createdAt: string;
}

const PrintVisitorsPage = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const { data } = await getPrintVisitorsApi();

      if (data.success) {
        setVisitors(data.data);
        setTotalAmount(data.totalAmount);
        setTotalVisitors(data.totalVisitors);
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-white min-h-screen print:p-0">
      {/* Header */}
      {/* Marriage Name Centered */}
      <div className="flex justify-center mb-4 mt-6">
        <div className="text-2xl font-bold uppercase border-b-2 border-gray-400 pb-2">
          {user?.marriageName}
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold">Visitors Report</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Print
        </button>
      </div>
      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Total Visitors: {totalVisitors}
        </h2>
        <h2 className="text-lg font-semibold">
          Total Amount: {formatINR(totalAmount)}
        </h2>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">S.No</th>
              <th className="border p-2">Visitor Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Payment Mode</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Gift Given</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={visitor._id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{visitor.visitorName}</td>
                <td className="border p-2 text-right">
                  {formatINR(visitor.amount)}
                </td>
                <td className="border p-2 text-center">
                  {visitor.paymentMode}
                </td>
                <td className="border p-2">{visitor.address}</td>
                <td className="border p-2 text-center">
                  {visitor.giftGiven ? "Yes" : "No"}
                </td>
                <td className="border p-2">{visitor.notes || "-"}</td>
                <td className="border p-2 text-center">
                  {new Date(visitor.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Print Footer */}
      <div className="hidden print:block mt-10 text-sm text-center">
        Generated on {new Date().toLocaleDateString("en-GB")}
      </div>
    </div>
  );
};

export default PrintVisitorsPage;
