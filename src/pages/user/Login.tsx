import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/common/Loader";
import ButtonLoader from "../../components/common/ButtonLoader";
import { getRedirectPath } from "../../utils/getRedirectPath";
import { toast } from "react-toastify";

const Login = () => {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate(getRedirectPath(user), { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mobileRegex = /^[1-9]\d{9}$/;

    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(mobile);
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Please try agian failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      
        <Loader />
      
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
                 bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat"
    >
 
      <div className="relative max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit mobile number"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 transition text-white rounded-lg flex items-center justify-center h-[42px]"
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-rose-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
