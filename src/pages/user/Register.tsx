import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../../api/authApi";
import { toast } from "react-toastify";
import MarriageForm from "../../components/forms/MarriageForm";

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

  const mobileRegex = /^[1-9]\d{9}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "adminMobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mobileRegex.test(form.adminMobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits");
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
