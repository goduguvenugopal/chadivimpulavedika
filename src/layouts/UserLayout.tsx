import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 select-none">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
