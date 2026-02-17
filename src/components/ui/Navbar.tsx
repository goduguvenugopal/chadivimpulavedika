import { useState } from "react";
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronRight } from "react-icons/fi";
import { MdDashboard, MdGroups, MdFavorite } from "react-icons/md";
import { FaPrint } from "react-icons/fa";

type UserRole = "guest" | "user" | "admin";

// Change this to preview different roles
const ROLE: UserRole = "user";

interface NavItem {
  label: string;
  Icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", Icon: MdDashboard, roles: ["user"] },
  { label: "Visitors",  Icon: MdGroups,    roles: ["user"] },
  { label: "Print",     Icon: FaPrint,     roles: ["user"] },
  { label: "Marriages", Icon: MdFavorite,  roles: ["admin"] },
  { label: "Profile",   Icon: FiUser,      roles: ["user", "admin"] },
];

const guestItems = ["Login", "Register"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = ROLE !== "guest";
  const visible = navItems.filter((item) => item.roles.includes(ROLE));

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-secondary text-black px-6 h-[68px] flex justify-between items-center shadow-md border-b border-white/10">

        {/* LEFT — Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors duration-200">
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

        {/* RIGHT — Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/5"
        >
          <FiMenu size={18} />
          <span className="hidden sm:inline tracking-wide">Menu</span>
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/15 flex items-center justify-center">
              <MdFavorite size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-secondary leading-none">Chadivimpula</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Vedika</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 transition-all duration-150"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Role pill */}
        {isLoggedIn && (
          <div className="px-5 pt-4 pb-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
              ROLE === "admin"
                ? "bg-violet-50 text-violet-600 border-violet-200"
                : "bg-primary/10 text-primary border-primary/20"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {ROLE === "admin" ? "Administrator" : "Member"}
            </span>
          </div>
        )}

        {/* Section label */}
        <div className="px-5 pt-4 pb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
            Navigation
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
          {isLoggedIn
            ? visible.map(({ label, Icon }) => (
                <button
                  key={label}
                  onClick={() => setIsOpen(false)}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-secondary hover:bg-gray-100/80 transition-all duration-150 text-sm font-medium"
                >
                  <span className="w-7 h-7 rounded-md bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-150 shrink-0">
                    <Icon size={15} className="text-gray-500 group-hover:text-primary transition-colors duration-150" />
                  </span>
                  <span className="flex-1 text-left">{label}</span>
                  <FiChevronRight size={13} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </button>
              ))
            : guestItems.map((label) => (
                <button
                  key={label}
                  onClick={() => setIsOpen(false)}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-secondary hover:bg-gray-100/80 transition-all duration-150 text-sm font-medium"
                >
                  <span className="w-7 h-7 rounded-md bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-150 shrink-0">
                    <FiUser size={14} className="text-gray-500 group-hover:text-primary transition-colors duration-150" />
                  </span>
                  <span className="flex-1 text-left">{label}</span>
                  <FiChevronRight size={13} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </button>
              ))}
        </nav>

        {/* Logout */}
        {isLoggedIn && (
          <div className="px-3 pb-5 pt-2 border-t border-gray-100">
            <button
              onClick={() => setIsOpen(false)}
              className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50/70 transition-all duration-150 text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-md bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-150 shrink-0">
                <FiLogOut size={14} className="text-red-400 group-hover:text-red-500 transition-colors duration-150" />
              </span>
              <span className="flex-1 text-left">Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;