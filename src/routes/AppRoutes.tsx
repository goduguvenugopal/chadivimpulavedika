import { createBrowserRouter } from "react-router-dom";

import RootRedirect from "./RootRedirect";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import StatusPage from "../pages/StatusPage";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Marriages from "../pages/admin/Marriages";
import AdminProfile from "../pages/admin/AdminProfile";
import Dashboard from "../pages/user/Dashboard";
import UserProfile from "../pages/user/UserProfile";
import Visitors from "../pages/user/Visitors";

export const router = createBrowserRouter([
  // ROOT
  {
    path: "/",
    element: <RootRedirect />,
  },

  // PUBLIC ONLY (guest access only)
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
