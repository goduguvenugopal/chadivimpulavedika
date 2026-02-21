import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Common Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
