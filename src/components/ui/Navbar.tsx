import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronRight } from "react-icons/fi";
import { MdDashboard, MdGroups, MdFavorite } from "react-icons/md";
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

  const isLoggedIn = !!user;
  const isApproved = user?.permissions === "approved";

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/dashboard",
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
      isLoggedIn &&
      isApproved &&
      user &&
      item.roles.includes(user.role as "user" | "admin"),
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
      <nav className="bg-secondary text-black px-6 h-[68px] flex justify-between items-center shadow-md border-b border-white/10">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <MdFavorite size={18} className="text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[17px] font-bold text-primary tracking-tight">
              Chadivimpula
            </span>
            <span className="text-[11px] tracking-[0.12em] uppercase text-white/60 font-medium">
              Vedika
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/10 rounded-lg px-3 py-2"
        >
          <FiMenu size={18} />
          <span className="hidden sm:inline">Menu</span>
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b bg-gray-50">
          <span className="font-semibold text-secondary">
            {user?.role === "admin" ? "Admin Panel" : "User Panel"}
          </span>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={18} />
          </button>
        </div>

        {/* Role Badge */}
        {isLoggedIn && (
          <div className="px-5 pt-4">
            <span
              className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${
                user?.role === "admin"
                  ? "bg-violet-100 text-violet-600"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {user?.role}
            </span>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-1">
          {isLoggedIn && isApproved ? (
            visibleItems.map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => handleNavigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive(path)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{label}</span>
                <FiChevronRight size={13} />
              </button>
            ))
          ) : !isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigate("/login")}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("/register")}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                Register
              </button>
            </>
          ) : null}
        </nav>

        {/* Logout */}
        {isLoggedIn && (
          <div className="px-3 pb-5 pt-2 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 text-sm font-medium"
            >
              <FiLogOut size={15} />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
