interface User {
  role: string;
  permissions: string;
}

export const getRedirectPath = (user: User | null): string => {
  if (!user) return "/login";

  const { role, permissions } = user;

  if (permissions === "approved") {
    if (role === "admin") return "/admin/marriages";
    if (role === "user") return "/dashboard";
  }

  if (["pending", "rejected"].includes(permissions)) {
    return "/status";
  }

  return "/login";
};
