import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../../api/authApi";
import { toast } from "react-toastify";
import MarriageForm from "../../components/forms/MarriageForm";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    marriageName: "",
    marriageDate: "",
    location: "",
    adminMobileNumber: "",
    password: "",
    upiId: "",
    upiPayeeName: "",
  });

  const mobileRegex = /^[6-9]\d{9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const upiRegex =
    /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "adminMobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mobileRegex.test(form.adminMobileNumber)) {
      toast.error("Enter valid 10-digit Indian mobile number");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    if (!upiRegex.test(form.upiId)) {
      toast.error("Enter valid UPI ID (example@bank)");
      return;
    }

    try {
      setLoading(true);
      await registerApi(form);
      toast.success("Registration submitted successfully 💐");
      navigate("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Registration failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-2">
          Create Marriage Account 💍
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Register your marriage to start managing gifts
        </p>

        <MarriageForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          buttonText="Submit Registration"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

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