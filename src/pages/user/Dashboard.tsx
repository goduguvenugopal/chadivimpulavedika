import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getDashboardStatsApi } from "../../api/dashboardApi";
import Loader from "../../components/common/Loader";
import { formatINR } from "../../utils/format";

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
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data: any = await getDashboardStatsApi();
      setStats(data.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <Loader />;
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>

          {/* Refresh Button */}
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            title="Refresh data"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-500 text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform duration-500 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <button
          onClick={() => navigate("/dashboard/visitors/add")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl shadow-md transition text-nowrap"
        >
          + Add Visitor
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Amount" value={formatINR(stats.totalAmount)} />
        <StatCard
          title="Cash Amount"
          value={formatINR(stats.totalCashAmount)}
        />
        <StatCard title="UPI Amount" value={formatINR(stats.totalUpiAmount)} />
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
