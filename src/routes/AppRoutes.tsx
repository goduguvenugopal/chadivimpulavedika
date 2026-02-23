import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import RootRedirect from "./RootRedirect";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// Layouts (keep normal unless heavy)
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// 🔥 Lazy Loaded Pages
const Login = lazy(() => import("../pages/user/Login"));
const Register = lazy(() => import("../pages/user/Register"));
const StatusPage = lazy(() => import("../pages/StatusPage"));

const Dashboard = lazy(() => import("../pages/user/Dashboard"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const Visitors = lazy(() => import("../pages/user/Visitors"));
const AddVisitor = lazy(() => import("../pages/user/AddVisitor"));
const PrintVisitorsPage = lazy(() => import("../pages/user/PrintVisitorsPage"));

const Marriages = lazy(() => import("../pages/admin/Marriages"));
const AdminProfile = lazy(() => import("../pages/admin/AdminProfile"));

export const router = createBrowserRouter([
  // ROOT
  {
    path: "/",
    element: <RootRedirect />,
  },

  // PUBLIC ONLY
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // STATUS
  {
    element: <ProtectedRoute requireApproved={false} />,
    children: [
      {
        path: "/status",
        element: <StatusPage />,
      },
    ],
  },

  // USER
  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/dashboard",
        element: <UserLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <UserProfile /> },
          { path: "visitors", element: <Visitors /> },
          { path: "visitors/add", element: <AddVisitor /> },
          { path: "print", element: <PrintVisitorsPage/> },
        ],
      },
    ],
  },

  // ADMIN
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "marriages", element: <Marriages /> },
          { path: "profile", element: <AdminProfile /> },
        ],
      },
    ],
  },
]);