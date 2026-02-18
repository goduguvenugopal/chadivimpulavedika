import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMeApi, loginApi, logoutApi } from "../api/authApi";
import { toast } from "react-toastify";

interface AuthUser {
  role: string;
  permissions: string;
  marriageId: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (mobile: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await getMeApi();
      setUser(res.data);
    } catch (error: any) {
      setUser(null);

      if (error?.response?.status !== 401) {
        toast.error("Failed to fetch user session");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (mobile: string) => {
    try {
      await loginApi({ adminMobileNumber: mobile });
      await fetchMe();

      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used inside provider");
  return context;
};
