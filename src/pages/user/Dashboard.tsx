import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getDashboardStatsApi } from "../../api/dashboardApi";
import Loader from "../../components/common/Loader";

interface Stats {
  totalAmount: number;
  totalCashAmount: number;
  totalUpiAmount: number;
  totalVisitors: number;
  totalGifts: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data: any = await getDashboardStatsApi();
        setStats(data.data);  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

        <button
          onClick={() => navigate("/visitors/add")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl shadow-md transition text-nowrap"
        >
          + Add Visitor
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Amount"
          value={`₹ ${stats.totalAmount}`}
        />

        <StatCard
          title="Cash Amount"
          value={`₹ ${(stats.totalCashAmount ?? 0).toLocaleString()}`}
        />

        <StatCard
          title="UPI Amount"
          value={`₹ ${(stats.totalUpiAmount ?? 0).toLocaleString()}`}
        />

        <StatCard title="Total Visitors" value={stats.totalVisitors ?? 0} />

        <StatCard title="Gifts Given" value={stats.totalGifts ?? 0} />
      </div>
    </div>
  );
};

export default Dashboard;

interface CardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
};
