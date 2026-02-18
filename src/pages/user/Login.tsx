import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/common/Loader";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(mobile);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 rounded-lg"
          >
            {loading ? <Loader /> : "Login"}
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
