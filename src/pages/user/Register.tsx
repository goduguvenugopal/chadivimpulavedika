import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { registerApi } from "../../api/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    marriageName: "",
    marriageDate: "",
    location: "",
    adminMobileNumber: "",
    upiId: "",
    upiPayeeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerApi(form);

      toast.success("Registration submitted successfully 💐");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40 transition-all duration-300 hover:shadow-rose-200">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-2">
          Create Marriage Account 💍
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Register your marriage to start managing gifts
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <InputField
            label="Marriage Name"
            name="marriageName"
            value={form.marriageName}
            onChange={handleChange}
          />

          <InputField
            label="Marriage Date"
            name="marriageDate"
            type="date"
            value={form.marriageDate}
            onChange={handleChange}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <InputField
            label="Mobile Number"
            name="adminMobileNumber"
            value={form.adminMobileNumber}
            onChange={handleChange}
          />

          <InputField
            label="UPI ID"
            name="upiId"
            value={form.upiId}
            onChange={handleChange}
          />

          <InputField
            label="UPI Payee Name"
            name="upiPayeeName"
            value={form.upiPayeeName}
            onChange={handleChange}
          />

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              {loading ? <Loader /> : "Submit Registration"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-rose-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField = ({ label, name, value, onChange, type = "text" }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none transition-all"
      />
    </div>
  );
};
