import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronRight } from "react-icons/fi";
import {
  MdDashboard,
  MdGroups,
  MdFavorite,
  MdPersonAddAlt1,
} from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: ("user" | "admin")[];
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isApproved = user?.permissions === "approved";

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/dashboard",
      roles: ["user"],
    },
    {
      label: "Add Visitors",
      icon: MdPersonAddAlt1,
      path: "/dashboard/visitors/add",
      roles: ["user"],
    },
    {
      label: "Visitors",
      icon: MdGroups,
      path: "/dashboard/visitors",
      roles: ["user"],
    },
    {
      label: "Print",
      icon: FaPrint,
      path: "/dashboard/print",
      roles: ["user"],
    },
    {
      label: "Marriages",
      icon: MdFavorite,
      path: "/admin/marriages",
      roles: ["admin"],
    },
    {
      label: "Profile",
      icon: FiUser,
      path: user?.role === "admin" ? "/admin/profile" : "/dashboard/profile",
      roles: ["user", "admin"],
    },
  ];

  const visibleItems = navItems.filter(
    (item) =>
      user && isApproved && item.roles.includes(user.role as "user" | "admin"),
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-gradient-to-r from-rose-500 via-pink-500 z-10 to-amber-400 text-white px-6 h-[68px] flex justify-between items-center shadow-lg top-0 left-0 sticky">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <MdFavorite size={20} className="text-white" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[18px] font-serif font-bold tracking-wide">
              Chadivimpula
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white/80">
              Vedika
            </span>
          </div>
        </div>

        {/* HAMBURGER ONLY */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-white/20 transition"
        >
          <FiMenu size={22} />
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b bg-gradient-to-r from-rose-100 to-amber-100">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.marriageName || "Marriage Panel"}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {user?.marriageDate}
              </p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {visibleItems.map(({ label, icon: Icon, path }) => (
            <button
              key={label}
              onClick={() => handleNavigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive(path)
                  ? "bg-rose-100 text-rose-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left">{label}</span>
              <FiChevronRight size={14} />
            </button>
          ))}
        </nav>

        {/* Logout */}
        {user && (
          <div className="px-4 pb-6 border-t pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 text-sm font-medium"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
