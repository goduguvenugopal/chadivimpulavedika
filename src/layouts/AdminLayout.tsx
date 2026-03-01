import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 select-none">
      {/* Common Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
